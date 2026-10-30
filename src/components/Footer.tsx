import React from 'react';
import { Sparkles, ShieldCheck, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090D16] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo, declaração de missão e filiação ao grupo */}
          <div className="flex flex-col items-center lg:items-start gap-2.5 text-center lg:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white font-display">PixelShift</span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded-full">
                Future Horizon Group (FHG)
              </span>
            </div>
            <p className="max-w-md text-slate-400 text-xs leading-relaxed">
              Conversor e otimizador universal de imagens. Processamento 100% no navegador sem limites, sem filas e com privacidade absoluta.
            </p>
          </div>

          {/* Card do Ecossistema Future Horizon Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow-sm">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                  Desenvolvimento & Ecossistema
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">
                    Future Horizon Group (FHG)
                  </span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" title="Ecossistema Ativo" />
                </div>
              </div>
            </div>

            {/* Selo de Garantia de Privacidade */}
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-2.5 text-emerald-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-xs font-semibold">
                Processamento Local · 100% Privado
              </span>
            </div>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Atribuição do Grupo */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <p>
            © {new Date().getFullYear()} PixelShift · Uma solução desenvolvida por{' '}
            <span className="text-slate-300 font-semibold hover:text-white transition-colors cursor-default">
              Future Horizon Group (FHG)
            </span>
            .
          </p>
          <div className="flex items-center gap-1.5 justify-center text-xs">
            <span>Parte do ecossistema de soluções digitais</span>
            <span className="text-slate-600">·</span>
            <span>Feito com</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
