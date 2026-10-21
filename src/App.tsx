/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { UrlInputBar } from './components/UrlInputBar.tsx';
import { MediaPreviewCard } from './components/MediaPreviewCard.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { extractInstagramMedia, fetchPresets, PresetSummary } from './services/api.ts';
import { getHistory, saveHistoryItem, removeHistoryItem, clearHistory } from './services/history.ts';
import { InstagramPostData, DownloadHistoryItem } from './types/instagram.ts';
import { Sparkles, Shield, Zap, Info } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<InstagramPostData | null>(null);
  const [presets, setPresets] = useState<PresetSummary[]>([]);
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);

  const heroInputRef = useRef<HTMLDivElement>(null);

  // Carrega histórico e presets na inicialização
  useEffect(() => {
    setHistory(getHistory());
    fetchPresets().then((data) => {
      if (data && data.length > 0) {
        setPresets(data);
      }
    });
  }, []);

  // Processa extração de link
  const handleExtract = async (targetUrl?: string) => {
    const link = (targetUrl || url).trim();
    if (!link) {
      setError('Por favor, insira ou cole um link do Instagram.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInfoNotice(null);

    const result = await extractInstagramMedia(link);
    setIsLoading(false);

    if (result.success && result.data) {
      setPostData(result.data);
      if (result.fallbackReason) {
        setInfoNotice(result.fallbackReason);
      }
      // Rola suavemente até o preview
      setTimeout(() => {
        window.scrollTo({
          top: 360,
          behavior: 'smooth',
        });
      }, 100);
    } else {
      setError(result.error || 'Não foi possível extrair este vídeo. Verifique se o perfil é público.');
    }
  };

  // Seleciona um preset de teste
  const handleSelectPreset = (presetKey: string) => {
    const found = presets.find((p) => p.key === presetKey);
    if (found) {
      setUrl(found.url);
      handleExtract(found.url);
    } else {
      setUrl(presetKey);
      handleExtract(presetKey);
    }
  };

  // Quando o usuário realiza um download
  const handleDownloaded = (format: 'mp4' | 'mp3' | 'jpg') => {
    if (!postData) return;
    const updated = saveHistoryItem(postData, format);
    setHistory(updated);
  };

  // Manipulação de histórico
  const handleRemoveHistoryItem = (id: string) => {
    const updated = removeHistoryItem(id);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleFocusHeroInput = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-slate-100 flex flex-col font-sans">
      {/* Barra de Navegação */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onFocusInput={handleFocusHeroInput}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* Seção Hero com Foco em Praticidade */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
          {/* Halos de iluminação de fundo no estilo Instagram */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-5xl">
            <div className="absolute top-[-100px] left-1/4 h-72 w-72 rounded-full bg-[#833AB4]/20 blur-[120px]" />
            <div className="absolute top-[-80px] right-1/4 h-72 w-72 rounded-full bg-[#FD1D1D]/20 blur-[130px]" />
            <div className="absolute top-[80px] left-1/3 h-64 w-64 rounded-full bg-[#F77737]/15 blur-[110px]" />
          </div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center" ref={heroInputRef}>
            {/* Tag Kicker sutil sem pílula estática */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-[#833AB4] to-[#FD1D1D]" />
              <span>Baixador Oficial de Alta Velocidade</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F77737]">HD 1080p & MP3</span>
            </div>

            {/* Título Principal de Alto Impacto */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Baixe Vídeos do Instagram{' '}
              <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
                em 1 Clique
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Cole o link de qualquer Reel, vídeo de publicação, Story ou carrossel. Sem anúncios intrusivos, sem redirecionamentos e direto no seu dispositivo.
            </p>

            {/* Barra de Entrada com Clipboard */}
            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
              <UrlInputBar
                url={url}
                setUrl={setUrl}
                onSubmit={handleExtract}
                isLoading={isLoading}
                error={error}
                presets={presets}
                onSelectPreset={handleSelectPreset}
              />
            </div>

            {/* Micro Vantagens sem poluição */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-[#F77737]" />
                <span>Download Instantâneo sem Espera</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Gratuito & Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#FD1D1D]" />
                <span>Qualidade Original HD Preservada</span>
              </div>
            </div>
          </div>
        </section>

        {/* Notificação informativa caso aplicável */}
        {infoNotice && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-start gap-3 rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 text-xs text-blue-200">
              <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{infoNotice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Área do Card de Pré-visualização e Download */}
        {postData && (
          <section className="pb-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <MediaPreviewCard
                post={postData}
                onDownloaded={handleDownloaded}
              />
            </div>
          </section>
        )}

        {/* Guia de Uso e Formatos */}
        <HowItWorks />

        {/* Seção FAQ */}
        <FaqSection />
      </main>

      {/* Gaveta de Histórico Lateral */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectPost={(post) => {
          setPostData(post);
          setUrl(post.originalUrl);
          window.scrollTo({ top: 360, behavior: 'smooth' });
        }}
        onRemoveItem={handleRemoveHistoryItem}
        onClearHistory={handleClearHistory}
      />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
