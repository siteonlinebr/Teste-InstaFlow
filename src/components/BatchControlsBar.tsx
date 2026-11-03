import React from 'react';
import {
  FORMAT_OPTIONS,
  GlobalConversionConfig,
  SupportedOutputFormat,
  ActiveToolMode,
} from '../types/converter.ts';
import {
  Play,
  Download,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Lock,
  Unlock,
} from 'lucide-react';

interface BatchControlsBarProps {
  config: GlobalConversionConfig;
  onChangeConfig: (newConfig: Partial<GlobalConversionConfig>) => void;
  onConvertAll: () => void;
  onDownloadAllZip: () => void;
  isConverting: boolean;
  totalCount: number;
  completedCount: number;
}

export const BatchControlsBar: React.FC<BatchControlsBarProps> = ({
  config,
  onChangeConfig,
  onConvertAll,
  onDownloadAllZip,
  isConverting,
  totalCount,
  completedCount,
}) => {
  const currentFormatSpec = FORMAT_OPTIONS[config.targetFormat];

  // Presets populares de redes sociais para redimensionamento em pixels
  const DIMENSION_PRESETS = [
    { label: 'Instagram 1:1', width: 1080, height: 1080 },
    { label: 'Stories 9:16', width: 1080, height: 1920 },
    { label: 'YouTube 16:9', width: 1280, height: 720 },
    { label: 'Full HD 1080p', width: 1920, height: 1080 },
    { label: 'Favicon 32x32', width: 32, height: 32 },
  ];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#111625] p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col gap-6">
        {/* Abas Superiores de Modo: Conversão vs Compressão vs Redimensionamento */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090D16] border border-white/5">
            <button
              type="button"
              onClick={() => onChangeConfig({ activeMode: 'convert' })}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                config.activeMode === 'convert'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Converter Formato</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onChangeConfig({
                  activeMode: 'compress',
                  quality: 0.7,
                  targetFormat: 'webp',
                })
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                config.activeMode === 'compress'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Comprimir Imagem (KB)</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onChangeConfig({
                  activeMode: 'resize',
                  resizeMode: 'custom',
                  customWidth: config.customWidth || 1080,
                  customHeight: config.customHeight || 1080,
                })
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                config.activeMode === 'resize'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Redimensionar em Pixels</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            {config.activeMode === 'convert' && 'Mude entre WEBP, JPG, PNG, AVIF, ICO e PDF'}
            {config.activeMode === 'compress' && 'Otimize peso em KB sem perdas visíveis'}
            {config.activeMode === 'resize' && 'Defina largura e altura exatas em pixels'}
          </div>
        </div>

        {/* Linha 1: Seletor de Formato Global e Ações de Disparo */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-bold text-white font-display">
                {totalCount > 0
                  ? `Formato de saída para ${totalCount} arquivo${totalCount > 1 ? 's' : ''}:`
                  : 'Formato de saída desejado:'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentFormatSpec.description}
            </p>
          </div>

          {/* Formatos em Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#090D16] border border-white/5">
            {(Object.keys(FORMAT_OPTIONS) as SupportedOutputFormat[]).map((fmt) => {
              const opt = FORMAT_OPTIONS[fmt];
              const isSelected = config.targetFormat === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChangeConfig({ targetFormat: fmt })}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MODO REDIMENSIONAR: Painel de Largura e Altura em Pixels */}
        {config.activeMode === 'resize' && (
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/15 space-y-3.5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">
                  Dimensões Exatas em Pixels (Largura x Altura):
                </span>
              </div>

              {/* Botão de Trava de Proporção */}
              <button
                type="button"
                onClick={() =>
                  onChangeConfig({ maintainAspectRatio: !config.maintainAspectRatio })
                }
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                  config.maintainAspectRatio
                    ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-200'
                    : 'border-white/10 bg-white/5 text-slate-400'
                }`}
                title="Manter proporção evita distorções ou esticamento da foto"
              >
                {config.maintainAspectRatio ? (
                  <>
                    <Lock className="h-3 w-3 text-indigo-400" />
                    <span>Manter Proporção (Aspect Ratio)</span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-3 w-3 text-slate-400" />
                    <span>Proporção Livre</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400">Largura:</label>
                <div className="relative">
                  <input
                    type="number"
                    min="16"
                    max="8000"
                    value={config.customWidth || ''}
                    onChange={(e) =>
                      onChangeConfig({
                        resizeMode: 'custom',
                        customWidth: parseInt(e.target.value) || null,
                      })
                    }
                    placeholder="1080"
                    className="w-24 rounded-lg border border-white/10 bg-[#090D16] px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-slate-500 font-mono">
                    px
                  </span>
                </div>
              </div>

              <span className="text-slate-500 font-bold">×</span>

              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400">Altura:</label>
                <div className="relative">
                  <input
                    type="number"
                    min="16"
                    max="8000"
                    value={config.customHeight || ''}
                    onChange={(e) =>
                      onChangeConfig({
                        resizeMode: 'custom',
                        customHeight: parseInt(e.target.value) || null,
                      })
                    }
                    placeholder="1080"
                    className="w-24 rounded-lg border border-white/10 bg-[#090D16] px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-slate-500 font-mono">
                    px
                  </span>
                </div>
              </div>

              {/* Presets Rápidos */}
              <div className="flex flex-wrap items-center gap-1.5 ml-auto pt-2 sm:pt-0">
                <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                {DIMENSION_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() =>
                      onChangeConfig({
                        resizeMode: 'custom',
                        customWidth: p.width,
                        customHeight: p.height,
                      })
                    }
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Linha 2: Controles de Qualidade, Escala Percentual e Cor de Fundo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          {/* Slider de Qualidade (se suportado pelo formato) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Nível de Compressão & Qualidade
              </span>
              <span className="font-mono tabular-nums text-indigo-300 font-bold">
                {currentFormatSpec.supportsQuality
                  ? `${Math.round(config.quality * 100)}%`
                  : 'Sem Perdas'}
              </span>
            </div>
            {currentFormatSpec.supportsQuality ? (
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={config.quality}
                  onChange={(e) =>
                    onChangeConfig({ quality: parseFloat(e.target.value) })
                  }
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-slate-800"
                />
                {/* Presets Rápidos de Compressão */}
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ quality: 0.5 })}
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Máxima (50%)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ quality: 0.75 })}
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Recomendada (75%)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ quality: 0.9 })}
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Alta Fidelidade (90%)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic py-1">
                O formato {currentFormatSpec.label} preserva todos os pixels sem perda.
              </div>
            )}
          </div>

          {/* Seletor de Escala / Resolução Percentual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Escala Percentual</span>
              <span className="font-mono tabular-nums text-slate-400">
                {config.resizeMode === 'custom' && config.customWidth
                  ? `${config.customWidth}x${config.customHeight}px`
                  : `${config.scalePercentage}%`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 75, 50, 25].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() =>
                    onChangeConfig({
                      resizeMode: 'percentage',
                      scalePercentage: scale,
                    })
                  }
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    config.resizeMode === 'percentage' && config.scalePercentage === scale
                      ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-200'
                      : 'border-white/5 bg-[#090D16] text-slate-400 hover:text-white'
                  }`}
                >
                  {scale === 100 ? 'Original' : `${scale}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Fundo para transparência (se JPG/BMP/PDF) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Fundo de Transparência
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {!currentFormatSpec.supportsTransparency
                  ? config.backgroundColor
                  : 'Transparente'}
              </span>
            </div>
            {!currentFormatSpec.supportsTransparency ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) =>
                    onChangeConfig({ backgroundColor: e.target.value })
                  }
                  className="h-8 w-12 cursor-pointer rounded border border-white/10 bg-transparent p-0.5"
                  title="Escolha a cor de fundo para preencher partes transparentes"
                />
                <button
                  type="button"
                  onClick={() => onChangeConfig({ backgroundColor: '#FFFFFF' })}
                  className="px-2.5 py-1 text-xs rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                >
                  Branco
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig({ backgroundColor: '#000000' })}
                  className="px-2.5 py-1 text-xs rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                >
                  Preto
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic py-1">
                Preserva canal alfa (fundo transparente mantido).
              </div>
            )}
          </div>
        </div>

        {/* Linha 3: Botões de Ação Final */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
          <div className="text-xs text-slate-400 font-mono tabular-nums">
            {completedCount > 0 ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {completedCount} de {totalCount} convertida{totalCount > 1 ? 's' : ''} com sucesso
              </span>
            ) : (
              <span>Pronto para processamento 100% no navegador</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            {/* Botão Primário: Processar Todas */}
            <button
              type="button"
              disabled={isConverting || totalCount === 0}
              onClick={onConvertAll}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : totalCount === 0 ? (
                <>
                  <Layers className="h-4 w-4 text-indigo-300" />
                  <span>Arraste imagens abaixo para processar</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>
                    {config.activeMode === 'compress' && `Comprimir Todas (${totalCount})`}
                    {config.activeMode === 'resize' && `Redimensionar Todas (${totalCount})`}
                    {config.activeMode === 'convert' && `Converter Todas (${totalCount})`}
                  </span>
                </>
              )}
            </button>

            {/* Botão Secundário: Baixar ZIP */}
            {completedCount > 0 && (
              <button
                type="button"
                onClick={onDownloadAllZip}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all active:scale-95 whitespace-nowrap"
                title="Empacota todas as imagens convertidas em um arquivo .zip"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Todas (.ZIP)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
