import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, X, Lock, CheckCircle2, Mail, ExternalLink, Globe } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Fecha com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F1422] shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal com Abas */}
        <div className="flex flex-col border-b border-white/10 bg-[#111625] px-6 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display">
                  Transparência & Conformidade Legal
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Future Horizon Group (FHG) · PixelShift
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              title="Fechar (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Abas Alternáveis */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'privacy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Política de Privacidade</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'terms'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Termos de Uso</span>
            </button>
          </div>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 leading-relaxed scrollbar-thin">
          {activeTab === 'privacy' ? (
            /* Conteúdo da Política de Privacidade (Padronizado com Curiosidades Incríveis) */
            <div className="space-y-5">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="font-semibold text-xs">Privacidade Prioritária e Absoluta</p>
                  <p className="text-[11px] text-emerald-300/80 mt-0.5">
                    A sua privacidade é um princípio inegociável em todas as ferramentas do ecossistema Future Horizon Group.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">1. Zero Venda de Dados</h4>
                  <p className="mt-1 text-slate-400">
                    Nunca comercializamos, alugamos ou compartilhamos seus dados pessoais ou imagens com terceiros sob nenhuma hipótese.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">2. Processamento 100% Local no Navegador</h4>
                  <p className="mt-1 text-slate-400">
                    Diferente de conversores convencionais que realizam upload dos seus arquivos para servidores desconhecidos, o <strong>PixelShift</strong> processa cada imagem diretamente na memória RAM do seu próprio navegador (Client-Side HTML5 Canvas / Web Workers). Suas fotos nunca saem do seu computador ou celular.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">3. Google Analytics (G-HZNZ6824F7)</h4>
                  <p className="mt-1 text-slate-400">
                    Utilizamos o Google Analytics de forma agregada, anônima e desidentificada exclusivamente para monitorar o volume de tráfego, identificar erros técnicos e compreender a usabilidade da aplicação para guiar futuras melhorias.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">4. Cookies Técnicos & Armazenamento</h4>
                  <p className="mt-1 text-slate-400">
                    Armazenamos apenas dados estritamente necessários via <em>localStorage</em> no seu navegador para reter suas configurações preferidas (como formato de saída padrão e nível de compressão). Não utilizamos cookies de rastreamento intrusivo entre sites.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">5. Conformidade Integral com LGPD e GDPR</h4>
                  <p className="mt-1 text-slate-400">
                    Respeitamos integralmente os direitos dos titulares de dados conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e normas internacionais como o GDPR europeu.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">6. Ecossistema Future Horizon Group (FHG)</h4>
                  <p className="mt-1 text-slate-400">
                    Esta ferramenta faz parte do portfólio de soluções digitais criadas e mantidas pelo grupo <strong>Future Horizon Group (FHG)</strong>, que compartilha a mesma política rígida de segurança da informação em todos os seus projetos.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Conteúdo dos Termos de Uso */
            <div className="space-y-5">
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 text-indigo-300 flex items-start gap-2.5">
                <FileText className="h-4 w-4 shrink-0 mt-0.5 text-indigo-400" />
                <div>
                  <p className="font-semibold text-xs">Uso Livre e Gratuito</p>
                  <p className="text-[11px] text-indigo-300/80 mt-0.5">
                    O PixelShift é fornecido gratuitamente para finalidades pessoais, acadêmicas e comerciais.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">1. Aceitação dos Termos</h4>
                  <p className="mt-1 text-slate-400">
                    Ao utilizar a ferramenta em <em>conversordeimagem.site</em>, você concorda com estes termos de uso e com as práticas descritas em nossa Política de Privacidade.
                  </p>
                </div>

                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">2. Propriedade Intelectual das Imagens</h4>
                  <p className="mt-1 text-slate-400">
                    Você retém todos os direitos autorais e de propriedade intelectual sobre quaisquer arquivos que converter. O PixelShift e o Future Horizon Group não reivindicam qualquer direito sobre suas imagens.
                  </p>
                </div>

                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">3. Responsabilidade do Usuário</h4>
                  <p className="mt-1 text-slate-400">
                    O usuário é o único responsável pelo conteúdo das imagens processadas e declara ter os devidos direitos legais sobre o material que converte através da ferramenta.
                  </p>
                </div>

                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">4. Isenção de Garantias</h4>
                  <p className="mt-1 text-slate-400">
                    O serviço é fornecido "no estado em que se encontra" (as-is), sem garantias expressas ou implícitas de disponibilidade contínua ininterrupta, embora nos empenhemos para manter o serviço sempre estável e veloz.
                  </p>
                </div>

                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h4 className="font-bold text-white text-xs">5. Atualizações dos Termos</h4>
                  <p className="mt-1 text-slate-400">
                    Estes termos poderão ser atualizados periodicamente para acompanhar melhorias no ecossistema FHG ou exigências legais.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Seção de Contato e Dúvidas Padronizada */}
          <div className="mt-6 rounded-xl border border-white/5 bg-[#090D16] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Dúvidas ou solicitações de privacidade?</span>
            </div>
            <a
              href="mailto:contatocuriosidadesincriveis6@gmail.com"
              className="font-mono text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors"
            >
              contatocuriosidadesincriveis6@gmail.com
            </a>
          </div>
        </div>

        {/* Rodapé do Modal com Botão de Entendido */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#0A0E18]">
          <span className="text-[11px] text-slate-500 font-mono">
            Última atualização: Outubro de 2026
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
