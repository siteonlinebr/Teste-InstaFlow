import React from 'react';
import { Copy, Sparkles, Download, Film, Layers, Clock, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="como-usar" className="w-full py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F77737] font-mono">
            Simplicidade Máxima
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Como baixar qualquer vídeo em 3 passos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Sem anúncios invasivos, sem cadastros demorados e sem passos desnecessários.
          </p>
        </div>

        {/* 3 Passos */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Passo 1 */}
          <div className="relative rounded-2xl border border-white/5 bg-[#0E1018] p-6 transition-all hover:border-white/15 hover:bg-[#121420]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#833AB4] to-[#FD1D1D] text-white shadow-lg shadow-[#833AB4]/20 mb-5">
              <Copy className="h-5 w-5" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
              01. Copiar Link
            </span>
            <h3 className="mt-1 text-lg font-bold text-white">
              Copie o link no Instagram
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              No aplicativo móvel ou navegador do Instagram, toque no botão de compartilhar (ícone de aviãozinho) e escolha <strong className="text-slate-200">Copiar Link</strong>.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="relative rounded-2xl border border-white/5 bg-[#0E1018] p-6 transition-all hover:border-white/15 hover:bg-[#121420]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FD1D1D] to-[#F77737] text-white shadow-lg shadow-[#FD1D1D]/20 mb-5">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
              02. Colar no App
            </span>
            <h3 className="mt-1 text-lg font-bold text-white">
              Cole e detecte em 1 clique
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Abra o InstaFlow e clique no botão <strong className="text-slate-200">Colar</strong>. A ferramenta identifica automaticamente o tipo de mídia e gera a prévia instantânea.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="relative rounded-2xl border border-white/5 bg-[#0E1018] p-6 transition-all hover:border-white/15 hover:bg-[#121420]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#F77737] to-[#FCB045] text-[#0A0B10] shadow-lg shadow-[#F77737]/20 mb-5">
              <Download className="h-5 w-5 font-bold" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
              03. Salvar
            </span>
            <h3 className="mt-1 text-lg font-bold text-white">
              Baixe direto no seu aparelho
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Clique em <strong className="text-slate-200">Baixar Vídeo (MP4 HD)</strong> ou extraia apenas o áudio em MP3. O arquivo é transferido sem redirecionamentos chatos.
            </p>
          </div>
        </div>

        {/* Formatos Suportados */}
        <div id="formatos" className="mt-20 pt-12 border-t border-white/5">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Totalmente compatível com todas as mídias
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              O InstaFlow processa qualquer publicação pública do ecossistema do Instagram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/5 bg-[#0E1018] p-5">
              <Film className="h-6 w-6 text-[#FD1D1D] mb-3" />
              <h4 className="font-bold text-white text-base">Instagram Reels</h4>
              <p className="mt-1 text-xs text-slate-400">
                Baixe vídeos verticais em 1080p com áudio original completo e sem marcas d'água externas.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0E1018] p-5">
              <Layers className="h-6 w-6 text-[#833AB4] mb-3" />
              <h4 className="font-bold text-white text-base">Carrosséis</h4>
              <p className="mt-1 text-xs text-slate-400">
                Visualize todos os slides de um álbum e baixe mídias individuais ou o lote completo.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0E1018] p-5">
              <Clock className="h-6 w-6 text-[#F77737] mb-3" />
              <h4 className="font-bold text-white text-base">Stories & Destaques</h4>
              <p className="mt-1 text-xs text-slate-400">
                Salve Stories e publicações temporárias antes que expirem em 24 horas.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0E1018] p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-base">Privacidade Garantida</h4>
              <p className="mt-1 text-xs text-slate-400">
                Não solicitamos login com sua senha nem armazenamos seus vídeos em servidores remotos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
