import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'As minhas imagens são enviadas para algum servidor?',
      answer:
        'Não! 100% da conversão acontece no seu próprio navegador através das APIs nativas de Canvas do HTML5. As imagens ficam estritamente na memória temporária do seu aparelho e nunca trafegam pela internet.',
    },
    {
      question: 'Qual é a melhor escolha entre PNG, JPG e WEBP?',
      answer:
        'WEBP é o formato moderno mais recomendado para internet: reduz até 80% do peso do arquivo com qualidade idêntica ao JPG e suporte a transparência igual ao PNG. Use JPG se você precisar de compatibilidade com programas antigos de impressão e PNG quando precisar de fidelidade gráfica absoluta sem perdas.',
    },
    {
      question: 'O que acontece com o fundo transparente de um PNG ao converter para JPG?',
      answer:
        'Como o formato JPG não suporta transparência (canal alfa), o PixelShift permite que você escolha a cor de preenchimento (por padrão, um fundo branco limpo ou preto). Assim sua imagem nunca fica com artefatos pretos feios.',
    },
    {
      question: 'Existe limite na quantidade de imagens ou tamanho?',
      answer:
        'Não há limite imposto pelo PixelShift! Você pode converter dezenas de imagens em lote. Como o processamento usa a memória RAM do seu próprio aparelho, arquivos de 20MB, 50MB ou mais são convertidos com total fluidez.',
    },
    {
      question: 'Preciso cadastrar cartão de crédito ou criar conta?',
      answer:
        'Absolutamente nada. O PixelShift é 100% gratuito, sem planos pagos, sem necessidade de login, sem chaves de API e sem período de testes. Você abre e usa livremente.',
    },
  ];

  return (
    <section id="faq" className="w-full py-12 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Tudo o que você precisa saber sobre como funciona a conversão local.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#111625] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
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
