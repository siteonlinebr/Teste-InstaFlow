import React, { useState } from 'react';
import {
  Heart,
  Smile,
  Zap,
  ThumbsUp,
  AlertCircle,
  X,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface FeedbackBannerProps {
  isVisible: boolean;
  targetFormat?: string;
  itemsCount?: number;
  onClose: () => void;
}

type SentimentType = 'excelente' | 'rapido' | 'boa' | 'problema';

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  isVisible,
  targetFormat = 'webp',
  itemsCount = 1,
  onClose,
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isVisible) return null;

  // Dispara o evento de feedback diretamente no Google Analytics 4 (GA4)
  const handleVote = (sentiment: SentimentType) => {
    setSelectedSentiment(sentiment);

    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'user_feedback', {
          event_category: 'Engajamento',
          event_label: sentiment,
          sentiment_value: sentiment,
          format_used: targetFormat,
          items_converted: itemsCount,
          feedback_source: 'post_download_survey',
        });
      }
    } catch (e) {
      console.warn('Erro ao registrar feedback no Analytics:', e);
    }
  };

  // Envia sugestão por e-mail oficial (Future Horizon Group)
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[PixelShift Feedback] Avaliação: ${selectedSentiment?.toUpperCase() || 'Geral'}`
    );
    const body = encodeURIComponent(
      `Olá equipe Future Horizon Group,\n\nAvaliação: ${selectedSentiment || 'Não especificada'}\nFormato utilizado: ${targetFormat}\nQuantidade de imagens: ${itemsCount}\n\nComentário ou Sugestão:\n${commentText}\n\nEnviado através do site conversordeimagem.site`
    );

    window.open(
      `mailto:contatocuriosidadesincriveis6@gmail.com?subject=${subject}&body=${body}`,
      '_blank'
    );
    setIsSent(true);

    // Registra envio de comentário no Analytics
    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'feedback_email_click', {
          sentiment: selectedSentiment,
          has_comment: Boolean(commentText.trim()),
        });
      }
    } catch (_) {}
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-[#12192c] via-[#0f172a] to-[#12192c] p-4 sm:p-5 shadow-2xl animate-fadeIn">
      <div className="flex flex-col gap-3.5">
        {/* Cabeçalho do Banner de Avaliação */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white font-display">
                Como foi sua experiência com o PixelShift?
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] text-slate-400">
                · Seu voto aparece em tempo real no nosso painel
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            title="Fechar (não exibir novamente)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Passo 1: Avaliação de 1 Clique */}
        {!selectedSentiment ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleVote('excelente')}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all active:scale-95 shadow-sm"
            >
              <Smile className="h-4 w-4 text-emerald-400" />
              <span>Excelente! 😍</span>
            </button>

            <button
              type="button"
              onClick={() => handleVote('rapido')}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 px-3.5 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all active:scale-95 shadow-sm"
            >
              <Zap className="h-4 w-4 text-indigo-400" />
              <span>Super Rápido! ⚡</span>
            </button>

            <button
              type="button"
              onClick={() => handleVote('boa')}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all active:scale-95 shadow-sm"
            >
              <ThumbsUp className="h-4 w-4 text-cyan-400" />
              <span>Boa 👍</span>
            </button>

            <button
              type="button"
              onClick={() => handleVote('problema')}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-950/20 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all active:scale-95 shadow-sm"
            >
              <AlertCircle className="h-4 w-4 text-rose-400" />
              <span>Teve problema ❌</span>
            </button>
          </div>
        ) : (
          /* Passo 2: Agradecimento Imediato + Opção de Enviar Mensagem/Sugestão */
          <div className="space-y-3 pt-1 border-t border-white/5 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">
                Voto registrado com sucesso! Muito obrigado pelo apoio ao ecossistema Future Horizon Group.
              </span>
            </div>

            {!isSent ? (
              <form onSubmit={handleSendEmail} className="space-y-2.5">
                <label className="block text-[11px] text-slate-300">
                  Quer deixar uma sugestão de recurso (ex: vídeos, novos formatos) ou feedback para o criador? (Opcional):
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escreva sua sugestão ou mensagem rápida aqui..."
                    className="flex-1 rounded-xl border border-white/10 bg-[#090D16] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95 whitespace-nowrap"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Enviar Mensagem</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  Mensagem aberta no seu aplicativo de e-mail!
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white transition-colors"
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
