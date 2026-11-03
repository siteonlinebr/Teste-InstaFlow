import React, { useState } from 'react';
import {
  Sparkles,
  Trash2,
  ShieldCheck,
  ChevronDown,
  Layers,
  Minimize2,
  Maximize2,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  onClearAll: () => void;
  onScrollToConverter: () => void;
  onSelectRoute?: (path: string) => void;
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  onClearAll,
  onScrollToConverter,
  onSelectRoute,
  currentPath = '/',
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const tools = [
    { path: '/converter-png-para-jpg', label: 'Converter PNG para JPG', badge: 'Popular' },
    { path: '/converter-jpg-para-png', label: 'Converter JPG para PNG', badge: 'Sem perdas' },
    { path: '/converter-para-webp', label: 'Converter para WEBP', badge: 'Google SEO' },
    { path: '/converter-foto-para-pdf', label: 'Converter Foto para PDF', badge: 'Documento' },
    { path: '/criar-favicon-ico', label: 'Criar Favicon ICO', badge: '32-bits' },
    { path: '/converter-para-avif', label: 'Converter para AVIF', badge: 'Nova Geração' },
    { path: '/comprimir-imagem', label: 'Comprimir Imagem (KB)', badge: 'Otimizar' },
    { path: '/redimensionar-imagem', label: 'Redimensionar em Pixels', badge: 'Instagram/YT' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsToolsOpen(false);
    if (onSelectRoute) {
      onSelectRoute(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Marca Oficial PixelShift */}
        <a
          href="/"
          onClick={(e) => handleNavClick('/', e)}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-tight leading-tight">PixelShift</span>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider">by Future Horizon Group</span>
          </div>
        </a>

        {/* Links de navegação e Menu de Ferramentas Dedicadas */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {/* Dropdown de Ferramentas Específicas */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:text-white hover:bg-indigo-500/20 transition-all font-semibold"
            >
              <Layers className="h-4 w-4" />
              <span>Ferramentas de Conversão</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isToolsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-white/10 bg-[#0F1422] p-2 shadow-2xl backdrop-blur-xl animate-fadeIn z-50"
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  Páginas Especializadas
                </div>
                {tools.map((t) => (
                  <a
                    key={t.path}
                    href={t.path}
                    onClick={(e) => handleNavClick(t.path, e)}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                      currentPath === t.path
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                      {t.badge}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#formatos"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Formatos
          </a>
          <a
            href="#privacidade"
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Privado</span>
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Dúvidas Frequentes
          </a>
        </nav>

        {/* Ação Primária ou Limpar Fila */}
        <div className="flex items-center gap-3 shrink-0">
          {totalItems > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all active:scale-95 whitespace-nowrap shrink-0"
              title="Remover todas as imagens da fila"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Limpar ({totalItems})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onScrollToConverter}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              Usar Ferramenta
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
