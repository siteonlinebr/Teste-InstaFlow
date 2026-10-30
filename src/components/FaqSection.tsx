import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'O que é um conversor de imagem e como ele funciona?',
      answer:
        'Um conversor de imagem é uma ferramenta digital que transforma o formato codificado de um arquivo gráfico em outro (por exemplo, de PNG para JPG, WEBP, AVIF ou PDF). Ele decodifica os pixels originais e os reorganiza de acordo com os algoritmos do formato de destino, permitindo diminuir drasticamente o peso do arquivo para acelerar sites, garantir compatibilidade com impressoras ou gerar ícones e documentos portáveis.',
      category: 'Conceito & Utilidade',
    },
    {
      question: 'Como converter PNG para JPG sem perder qualidade?',
      answer:
        'Para converter PNG para JPG, basta arrastar seu arquivo PNG para a caixa de upload do PixelShift, selecionar o formato de destino "JPG / JPEG" e clicar em "Converter Todas". Como imagens PNG podem conter áreas transparentes e o formato JPG não suporta transparência, você pode escolher se deseja preencher o fundo com branco ou preto, garantindo um resultado nítido e sem bordas pretas indesejadas.',
      category: 'Tutoriais Práticos',
    },
    {
      question: 'Como converter fotos ou documentos para PDF pelo celular ou computador?',
      answer:
        'Carregue uma ou mais fotos (PNG, JPG, WEBP ou qualquer imagem) no PixelShift e selecione o formato "PDF (Doc)". O sistema compila a imagem em um documento PDF padrão 1.4 de alta resolução, pronto para anexar em formulários do governo, bancos, e-mails ou enviar para impressão, sem necessidade de programas pesados ou cadastros.',
      category: 'Tutoriais Práticos',
    },
    {
      question: 'Como transformar uma imagem em ícone ICO (Favicon)?',
      answer:
        'Selecione uma imagem quadrada ou logotipo da sua marca e escolha o formato "ICO (Ícone)". O PixelShift gera um arquivo binário .ico autêntico de 32-bits com preservação de transparência alfa, ideal para usar como favicon de sites na aba do navegador ou atalhos em sistemas Windows.',
      category: 'Tutoriais Práticos',
    },
    {
      question: 'Qual é o formato mais leve para sites: WEBP ou AVIF?',
      answer:
        'Tanto WEBP quanto AVIF são os formatos modernos mais eficientes da internet. O WEBP (criado pelo Google) reduz cerca de 75% a 80% do peso em relação ao JPG e PNG mantendo transparência. Já o AVIF é o formato de última geração que comprime até 30% a mais que o próprio WEBP com altíssima fidelidade de cor e nitidez, sendo a melhor escolha para quem busca nota 100 no Google PageSpeed.',
      category: 'Comparativo de Formatos',
    },
    {
      question: 'As minhas imagens são enviadas para algum servidor?',
      answer:
        'Não! 100% da conversão acontece no seu próprio navegador através das APIs nativas de Canvas do HTML5 e Web Workers. As fotos permanecem estritamente na memória temporária do seu aparelho (computador ou celular) e nunca trafegam pela internet, garantindo privacidade e sigilo absoluto.',
      category: 'Segurança & Privacidade',
    },
    {
      question: 'Existe limite na quantidade de imagens ou tamanho de arquivo?',
      answer:
        'Não há limite imposto pelo PixelShift! Você pode converter dezenas de imagens em lote de uma só vez. Como o processamento utiliza a memória RAM do seu próprio aparelho, arquivos pesados de 20MB, 50MB ou mais são convertidos com total fluidez e você pode baixar tudo junto em um arquivo .ZIP.',
      category: 'Usabilidade',
    },
    {
      question: 'Preciso cadastrar cartão de crédito ou criar conta?',
      answer:
        'Absolutamente nada. O PixelShift é uma solução 100% gratuita desenvolvida pelo Future Horizon Group (FHG). Não exigimos login, não temos planos pagos, sem limites escondidos e sem necessidade de chave de API. Você abre no navegador e usa livremente.',
      category: 'Geral',
    },
  ];

  return (
    <section id="faq" className="w-full py-16 border-t border-white/5 bg-[#0B0F19]/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Central de Conhecimento & SEO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Perguntas Frequentes &amp; Guia de Formatos
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            Tudo o que você precisa saber sobre o que é um conversor de imagem, como converter entre PNG, JPG, PDF, WEBP e AVIF com segurança e velocidade.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#111625] transition-all hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-white hover:text-indigo-300 transition-colors gap-4"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-indigo-400 font-semibold shrink-0">
                      #{index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3.5">
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
