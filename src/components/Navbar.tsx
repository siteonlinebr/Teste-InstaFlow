import React from 'react';
import { Sparkles, Trash2, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  onClearAll: () => void;
  onScrollToConverter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  onClearAll,
  onScrollToConverter,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zona 1: Marca em linha única */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display font-extrabold tracking-tight">PixelShift</span>
        </a>

        {/* Zona 2: 4 Links de navegação sem quebra */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#formatos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Formatos Suportados
          </a>
          <a
            href="#privacidade"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Privado</span>
          </a>
          <a
            href="#beneficios"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Compressão & Velocidade
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Dúvidas Frequentes
          </a>
        </nav>

        {/* Zona 3: Ação Primária */}
        <div className="flex items-center gap-3 shrink-0">
          {totalItems > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all active:scale-95 whitespace-nowrap shrink-0"
              title="Remover todas as imagens da fila"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Limpar Fila ({totalItems})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onScrollToConverter}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              Converter Agora
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
