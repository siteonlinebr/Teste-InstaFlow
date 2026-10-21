import React from 'react';
import { Download, History, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
  onFocusInput: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  historyCount,
  onFocusInput,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#07080C]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5 shadow-md shadow-[#FD1D1D]/20 transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0A0B10]">
              <Sparkles className="h-4 w-4 text-[#F77737]" />
            </div>
          </div>
          <span className="font-semibold text-white">
            Insta<span className="bg-gradient-to-r from-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">Flow</span>
          </span>
        </a>

        {/* Zone 2: Clean 4 Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#como-usar"
            className="transition-colors hover:text-white whitespace-nowrap shrink-0"
          >
            Como Usar
          </a>
          <a
            href="#formatos"
            className="transition-colors hover:text-white whitespace-nowrap shrink-0"
          >
            Formatos Suportados
          </a>
          <button
            onClick={onOpenHistory}
            className="transition-colors hover:text-white whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            Histórico
            {historyCount > 0 && (
              <span className="font-mono text-xs text-[#F77737] font-semibold tabular-nums">
                ({historyCount})
              </span>
            )}
          </button>
          <a
            href="#faq"
            className="transition-colors hover:text-white whitespace-nowrap shrink-0"
          >
            Dúvidas Frequentes
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-[#12141F] px-3.5 py-2 text-xs font-medium text-slate-200 transition-all hover:border-white/20 hover:bg-[#181B29] active:scale-95"
            title="Abrir histórico de downloads"
          >
            <History className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Histórico</span>
            {historyCount > 0 && (
              <span className="rounded-full bg-[#FD1D1D] px-1.5 py-0.2 text-[10px] font-bold text-white tabular-nums">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onFocusInput}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#FD1D1D]/25 transition-all hover:opacity-95 hover:shadow-[#FD1D1D]/40 active:scale-95 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Baixar Agora</span>
          </button>
        </div>
      </div>
    </header>
  );
};
