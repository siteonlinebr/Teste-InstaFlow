import React, { useState, useRef } from 'react';
import {
  GlobalConversionConfig,
  ImageFileItem,
  FORMAT_OPTIONS,
  SupportedOutputFormat,
} from './types/converter.ts';
import {
  processInputFile,
  convertSingleImage,
  createZipArchive,
  triggerFileDownload,
  formatFileSize,
} from './services/imageConverter.ts';
import { Navbar } from './components/Navbar.tsx';
import { DropZone } from './components/DropZone.tsx';
import { BatchControlsBar } from './components/BatchControlsBar.tsx';
import { ImageItemCard } from './components/ImageItemCard.tsx';
import { ComparisonModal } from './components/ComparisonModal.tsx';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal.tsx';
import { OverallStatus } from './components/OverallStatus.tsx';
import { FeedbackBanner } from './components/FeedbackBanner.tsx';
import { FeaturesGrid } from './components/FeaturesGrid.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Check,
} from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [isConvertingAll, setIsConvertingAll] = useState(false);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [comparisonItem, setComparisonItem] = useState<ImageFileItem | null>(null);
  const [privacyModalTab, setPrivacyModalTab] = useState<'privacy' | 'terms' | null>(null);
  const [showFeedbackBanner, setShowFeedbackBanner] = useState(false);

  const [globalConfig, setGlobalConfig] = useState<GlobalConversionConfig>({
    targetFormat: 'webp',
    quality: 0.85,
    scalePercentage: 100,
    backgroundColor: '#FFFFFF',
  });

  const converterSectionRef = useRef<HTMLDivElement>(null);

  // Adiciona arquivos à fila
  const handleFilesSelected = async (files: File[]) => {
    const newItems: ImageFileItem[] = [];
    for (const file of files) {
      const item = await processInputFile(file);
      // Herda as configurações globais atuais
      item.targetFormat = globalConfig.targetFormat;
      item.quality = globalConfig.quality;
      item.scalePercentage = globalConfig.scalePercentage;
      item.backgroundColor = globalConfig.backgroundColor;
      newItems.push(item);
    }

    setItems((prev) => [...prev, ...newItems]);

    // Rola suavemente até os arquivos
    setTimeout(() => {
      converterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Atualiza um item específico
  const handleUpdateItem = (id: string, updates: Partial<ImageFileItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Converte um único item
  const handleConvertSingle = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    handleUpdateItem(id, { status: 'converting', error: undefined });

    try {
      const result = await convertSingleImage(item);
      handleUpdateItem(id, result);
    } catch (err: any) {
      handleUpdateItem(id, {
        status: 'error',
        error: err?.message || 'Falha ao converter imagem',
      });
    }
  };

  // Converte todas as imagens da fila
  const handleConvertAll = async () => {
    if (items.length === 0 || isConvertingAll) return;

    setIsConvertingAll(true);

    for (const item of items) {
      handleUpdateItem(item.id, { status: 'converting', error: undefined });
      try {
        const result = await convertSingleImage(item);
        handleUpdateItem(item.id, result);
      } catch (err: any) {
        handleUpdateItem(item.id, {
          status: 'error',
          error: err?.message || 'Falha na conversão',
        });
      }
    }

    setIsConvertingAll(false);
  };

  // Atualiza a configuração global e sincroniza nos itens que ainda não foram convertidos
  const handleConfigChange = (newConfig: Partial<GlobalConversionConfig>) => {
    const updated = { ...globalConfig, ...newConfig };
    setGlobalConfig(updated);

    setItems((prev) =>
      prev.map((item) => {
        if (item.status === 'idle') {
          return {
            ...item,
            ...(newConfig.targetFormat ? { targetFormat: newConfig.targetFormat } : {}),
            ...(newConfig.quality !== undefined ? { quality: newConfig.quality } : {}),
            ...(newConfig.scalePercentage !== undefined ? { scalePercentage: newConfig.scalePercentage } : {}),
            ...(newConfig.backgroundColor ? { backgroundColor: newConfig.backgroundColor } : {}),
          };
        }
        return item;
      })
    );
  };

  // Remove um item da fila
  const handleRemoveItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
    if (item?.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Limpa toda a fila
  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setItems([]);
  };

  // Baixa todas as imagens convertidas em um único ZIP
  const handleDownloadAllZip = async () => {
    const convertedItems = items.filter((i) => i.status === 'done' && i.convertedBlob);
    if (convertedItems.length === 0) return;

    try {
      const zipBlob = await createZipArchive(convertedItems);
      triggerFileDownload(zipBlob, `pixelshift_imagens_${Date.now()}.zip`);
      setShowFeedbackBanner(true);
    } catch (err: any) {
      console.error('Erro ao gerar arquivo ZIP:', err);
    }
  };

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Barra de Navegação Conforme Top Bar Contract */}
      <Navbar
        totalItems={items.length}
        onClearAll={handleClearAll}
        onScrollToConverter={() =>
          converterSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <main className="flex-1">
        {/* Seção Hero: Apresentação com Alta Clareza e Sem Slop */}
        <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-white/5">
          {/* Efeito sutil de iluminação de fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Tag de Destaque Unboxed sem pílula estática */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Processamento 100% no seu navegador · Suas fotos nunca saem do seu dispositivo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display text-balance">
              Converta e comprima imagens em lote{' '}
              <span className="animate-horizontal-shimmer font-extrabold inline-block">
                com velocidade máxima
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
              Transforme PNG, JPG, WEBP, GIF, BMP e SVG com fidelidade milimétrica. Reduza até 80% do peso para web sem perda visual perceptível.
            </p>

            {/* Atalhos Rápidos de Conversão em 1 Clique */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 mr-1">Atalhos rápidos:</span>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'webp', quality: 0.85 })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'webp'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Qualquer → WEBP (Economia Máxima)
              </button>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'jpeg', quality: 0.9 })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'jpeg'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                PNG → JPG (Compatibilidade)
              </button>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'png' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'png'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                JPG → PNG (Fidelidade Sem Perdas)
              </button>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'pdf', quality: 0.9 })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'pdf'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Foto → PDF (Documento)
              </button>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'ico' })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'ico'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                PNG → ICO (Criar Favicon)
              </button>
              <button
                type="button"
                onClick={() => handleConfigChange({ targetFormat: 'avif', quality: 0.85 })}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  globalConfig.targetFormat === 'avif'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Qualquer → AVIF (Ultra Leve)
              </button>
            </div>
          </div>
        </section>

        {/* Área Central de Conversão */}
        <section ref={converterSectionRef} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Caixa de Arraste / DropZone */}
          <DropZone
            onFilesSelected={handleFilesSelected}
            isLoadingSample={isLoadingSample}
            setIsLoadingSample={setIsLoadingSample}
          />

          {/* Quando houver imagens carregadas: Barra de Controle Global + Lista de Itens */}
          {items.length > 0 && (
            <div className="mt-8 space-y-6">
              {/* Barra de Configurações em Lote */}
              <BatchControlsBar
                config={globalConfig}
                onChangeConfig={handleConfigChange}
                onConvertAll={handleConvertAll}
                onDownloadAllZip={handleDownloadAllZip}
                isConverting={isConvertingAll}
                totalCount={items.length}
                completedCount={completedCount}
              />

              {/* Banner de Avaliação Pós-Download (GA4 + E-mail) */}
              <FeedbackBanner
                isVisible={showFeedbackBanner}
                targetFormat={globalConfig.targetFormat}
                itemsCount={items.length}
                onClose={() => setShowFeedbackBanner(false)}
              />

              {/* Componente de Status Geral Consolidado */}
              <OverallStatus
                items={items}
                isConverting={isConvertingAll}
                onDownloadAllZip={handleDownloadAllZip}
              />

              {/* Lista de Imagens na Fila */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-400" />
                    <span>Fila de Imagens ({items.length})</span>
                  </h3>

                  <span className="text-xs text-slate-400 font-mono tabular-nums">
                    Tamanho original total:{' '}
                    {formatFileSize(items.reduce((acc, i) => acc + i.originalSize, 0))}
                  </span>
                </div>

                {items.map((item) => (
                  <ImageItemCard
                    key={item.id}
                    item={item}
                    onUpdateItem={handleUpdateItem}
                    onConvertSingle={handleConvertSingle}
                    onRemove={handleRemoveItem}
                    onOpenComparison={setComparisonItem}
                    onDownload={() => setShowFeedbackBanner(true)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tabela Comparativa de Formatos (#formatos) */}
        <section id="formatos" className="w-full py-12 border-t border-white/5 bg-[#090D16]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Guia de Formatos de Imagem
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Entenda qual formato escolher para cada finalidade e economize armazenamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(Object.keys(FORMAT_OPTIONS) as SupportedOutputFormat[]).map((fmt) => {
                const opt = FORMAT_OPTIONS[fmt];
                return (
                  <div
                    key={fmt}
                    className="rounded-xl border border-white/10 bg-[#111625] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-white font-display">
                          {opt.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {opt.extension}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Transparência:</span>
                        <span className={opt.supportsTransparency ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                          {opt.supportsTransparency ? 'Suportada' : 'Não'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ajuste de Qualidade:</span>
                        <span className={opt.supportsQuality ? 'text-indigo-400 font-semibold' : 'text-slate-500'}>
                          {opt.supportsQuality ? '10% a 100%' : 'Sem perda'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pilares de Benefícios */}
        <FeaturesGrid />

        {/* Seção de Perguntas Frequentes */}
        <FaqSection />
      </main>

      {/* Modal Interativo de Comparação Antes/Depois */}
      <ComparisonModal
        item={comparisonItem}
        onClose={() => setComparisonItem(null)}
      />

      {/* Rodapé com Links para Privacidade e Termos */}
      <Footer onOpenPrivacy={(tab) => setPrivacyModalTab(tab)} />

      {/* Modal Interativo de Política de Privacidade & Termos de Uso (FHG) */}
      <PrivacyPolicyModal
        isOpen={Boolean(privacyModalTab)}
        initialTab={privacyModalTab || 'privacy'}
        onClose={() => setPrivacyModalTab(null)}
      />
    </div>
  );
}
