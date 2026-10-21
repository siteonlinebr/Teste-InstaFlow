import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'Como salvar os vídeos do Instagram na galeria do iPhone ou iPad?',
    answer:
      'No Safari do iOS, basta colar o link no InstaFlow e tocar no botão "Baixar Vídeo (MP4 HD)". O Safari exibirá uma confirmação de download. Após a conclusão, abra o arquivo na pasta de Downloads do aplicativo Arquivos (Files), toque no botão de compartilhar no canto inferior e selecione "Salvar Vídeo" para enviá-lo diretamente ao rolo de câmera.',
  },
  {
    question: 'Onde os arquivos ficam salvos em celulares Android?',
    answer:
      'Em smartphones Android (Chrome, Samsung Internet, Edge), os vídeos baixados através do InstaFlow são salvos automaticamente na pasta padrão "Downloads" do seu dispositivo e já aparecem na sua Galeria ou Google Fotos em poucos segundos.',
  },
  {
    question: 'Posso baixar apenas o áudio de uma música ou áudio original?',
    answer:
      'Sim! Sempre que o InstaFlow detecta uma faixa de áudio em um Reel ou publicação de vídeo, o botão "Áudio (MP3)" fica disponível. Ao clicar, você baixa a faixa de áudio pronta para usar como ringtone, alarme ou em suas próprias edições.',
  },
  {
    question: 'É possível baixar publicações de contas ou perfis privados?',
    answer:
      'Por motivos de privacidade e conformidade com as diretrizes do Instagram, o InstaFlow processa publicações de contas e perfis públicos. Para baixar de um perfil privado, a conta precisaria estar aberta ou com compartilhamento público autorizado.',
  },
  {
    question: 'O InstaFlow impõe algum limite diário ou exige cadastro?',
    answer:
      'Não. O InstaFlow é 100% gratuito, sem limite de downloads por dia e não exige nenhum tipo de cadastro, criação de conta ou inserção de dados pessoais. Tudo funciona com foco absoluto em praticidade.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-16 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FD1D1D] font-mono">
            Tire Suas Dúvidas
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Respostas diretas para as dúvidas mais comuns sobre o download de mídias.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-white/5 bg-[#0E1018] transition-all hover:border-white/15"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors"
                >
                  <span className="font-semibold text-white text-sm sm:text-base pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white bg-white/10' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
