import React from 'react';
import { ShieldCheck, Zap, Layers, FileArchive } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      title: 'Privacidade Absoluta e Criptografia Local',
      description:
        'Suas fotos nunca saem do seu computador ou celular. Todo o processamento gráfico é feito na memória RAM do seu navegador via Canvas 2D.',
    },
    {
      icon: Zap,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      title: 'Velocidade Instantânea sem Fila de Servidor',
      description:
        'Sem espera de upload nem filas de processamento. A conversão é executada na velocidade do hardware do seu dispositivo.',
    },
    {
      icon: Layers,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      title: 'Matriz Completa de Formatos Modernos',
      description:
        'Conversão bidirecional entre PNG, JPG, WEBP, GIF, BMP e SVG com controle fino de transparência e resolução.',
    },
    {
      icon: FileArchive,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      title: 'Conversão em Lote e Download em ZIP',
      description:
        'Adicione múltiplos arquivos de uma só vez, aplique configurações padronizadas e baixe todo o lote empacotado em um único arquivo .zip.',
    },
  ];

  return (
    <section id="beneficios" className="w-full py-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Por que converter direto no seu navegador?
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            A tecnologia mais segura e rápida para otimizar imagens para web, redes sociais ou arquivamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-2xl border border-white/10 bg-[#111625] p-6 transition-all hover:border-white/20 hover:bg-[#141B2D]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${feat.bgColor} ${feat.iconColor} mb-5`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
