import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090D16] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo e declaração de missão */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white font-display">PixelShift</span>
            </div>
            <p className="max-w-md text-slate-400 text-xs leading-relaxed">
              Conversor e otimizador universal de imagens. Processamento 100% no navegador sem limites, sem filas e com privacidade absoluta.
            </p>
          </div>

          {/* Selo de Garantia de Privacidade */}
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-2.5 text-emerald-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-semibold">
              Arquivos processados localmente — sem tráfego para servidores
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <p>© {new Date().getFullYear()} PixelShift. Gratuito para uso pessoal e comercial.</p>
          <div className="flex items-center gap-1 justify-center">
            <span>Desenvolvido com foco em velocidade e privacidade</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 inline fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
