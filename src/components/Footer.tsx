import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#05060A] py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Marca */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0A0B10]">
                <Sparkles className="h-3.5 w-3.5 text-[#F77737]" />
              </div>
            </div>
            <span className="font-bold text-white text-base">
              Insta<span className="bg-gradient-to-r from-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">Flow</span>
            </span>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#como-usar" className="hover:text-white transition-colors">
              Como Usar
            </a>
            <a href="#formatos" className="hover:text-white transition-colors">
              Formatos Suportados
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Perguntas Frequentes
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Voltar ao Topo
            </a>
          </div>
        </div>

        {/* Disclaimer e Créditos Legais */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p className="max-w-xl">
            Aviso Legal: O InstaFlow é uma ferramenta independente e não possui vínculo, patrocínio ou afiliação oficial com o Instagram ou a Meta Platforms, Inc.
          </p>

          <p className="flex items-center gap-1 shrink-0 font-medium text-slate-400">
            Focado em rapidez e praticidade
          </p>
        </div>
      </div>
    </footer>
  );
};
