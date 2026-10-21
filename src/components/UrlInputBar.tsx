import React, { useState, useRef, useEffect } from 'react';
import { Clipboard, ArrowRight, Loader2, X, Check, AlertCircle, Sparkles } from 'lucide-react';
import { PresetSummary } from '../services/api.ts';

interface UrlInputBarProps {
  url: string;
  setUrl: (val: string) => void;
  onSubmit: (urlToSubmit?: string) => void;
  isLoading: boolean;
  error: string | null;
  presets: PresetSummary[];
  onSelectPreset: (presetKey: string) => void;
}

export const UrlInputBar: React.FC<UrlInputBarProps> = ({
  url,
  setUrl,
  onSubmit,
  isLoading,
  error,
  presets,
  onSelectPreset,
}) => {
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [clipboardNotice, setClipboardNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Foco no input ao montar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePasteFromClipboard = async () => {
    try {
      setClipboardNotice(null);
      if (!navigator.clipboard?.readText) {
        setClipboardNotice('Seu navegador não permite leitura automática. Cole usando Ctrl+V ou segure o toque.');
        return;
      }

      const text = await navigator.clipboard.readText();
      const trimmed = text.trim();

      if (!trimmed) {
        setClipboardNotice('A área de transferência está vazia.');
        return;
      }

      setUrl(trimmed);
      setPasteSuccess(true);
      setTimeout(() => setPasteSuccess(false), 2000);

      // Se for um link do Instagram, já dispara automaticamente a busca
      if (/instagram\.com\/(?:reel|reels|p|tv|stories)\//i.test(trimmed)) {
        onSubmit(trimmed);
      } else {
        setClipboardNotice('Link colado. Verifique se é um link válido do Instagram.');
      }
    } catch {
      setClipboardNotice('Permissão negada. Cole o link usando Ctrl+V no teclado.');
    }
  };

  const handleClear = () => {
    setUrl('');
    setClipboardNotice(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };

  const isInstagramUrl = /instagram\.com\/(?:reel|reels|p|tv|stories)\//i.test(url.trim());

  return (
    <div className="w-full">
      {/* Container de Entrada Principal */}
      <div className="relative group">
        {/* Glow de fundo inspirado no Instagram */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] opacity-25 blur-lg transition duration-500 group-hover:opacity-40 group-focus-within:opacity-60" />

        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-white/10 bg-[#0E1018] p-2 shadow-2xl transition-all">
          {/* Campo de Texto */}
          <div className="relative flex flex-1 items-center min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setClipboardNotice(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Cole o link do Instagram aqui (Reel, Post, Story, Carrossel)..."
              disabled={isLoading}
              className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            />

            {/* Botão de Limpar */}
            {url && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                title="Limpar campo"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Botão Colar do Clipboard */}
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              disabled={isLoading}
              className={`mr-2 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                pasteSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 active:scale-95'
              }`}
              title="Colar automaticamente da área de transferência"
            >
              {pasteSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Colado!</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-3.5 w-3.5 text-[#F77737]" />
                  <span>Colar</span>
                </>
              )}
            </button>
          </div>

          {/* Botão de Ação Primária: Buscar / Baixar */}
          <button
            type="button"
            onClick={() => onSubmit()}
            disabled={isLoading || !url.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FD1D1D]/30 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <span>Processar Vídeo</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Avisos rápidos ou Validação */}
      {clipboardNotice && (
        <div className="mt-2.5 flex items-center gap-2 text-xs text-amber-300/90 px-2 animate-fadeIn">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{clipboardNotice}</span>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300 animate-fadeIn">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Erro ao obter vídeo: </span>
            {error}
          </div>
        </div>
      )}

      {/* Atalhos Rápidos para Teste Imediato */}
      <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mr-1">
          <Sparkles className="h-3 w-3 text-[#F77737]" />
          Testar com 1 clique:
        </span>
        {presets.length > 0 ? (
          presets.map((preset) => (
            <button
              key={preset.key}
              type="button"
              onClick={() => onSelectPreset(preset.key)}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-[#12141F] px-2.5 py-1 text-xs text-slate-300 transition-all hover:border-white/20 hover:bg-[#181B28] hover:text-white active:scale-95 whitespace-nowrap"
            >
              <span>{preset.key === 'travel_reel' ? '🏔️ Reel Suíça' :
                     preset.key === 'photo_carousel' ? '📸 Carrossel Tóquio' :
                     preset.key === 'culinary_video' ? '🍝 Vídeo Culinária' :
                     '💪 Story Fitness'}</span>
            </button>
          ))
        ) : (
          <span className="text-xs text-slate-500">Exemplos prontos para testar</span>
        )}
      </div>
    </div>
  );
};
