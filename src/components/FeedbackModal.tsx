import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Smile,
  Zap,
  ThumbsUp,
  AlertCircle,
  X,
  Mail,
  CheckCircle2,
  Clock,
  Heart,
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  targetFormat?: string;
  itemsCount?: number;
  onClose: () => void;
}

type SentimentType = 'excelente' | 'rapido' | 'boa' | 'problema';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  targetFormat = 'webp',
  itemsCount = 1,
  onClose,
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fecha no ESC e bloqueia scroll do body
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, onClose]);

  // Se o voto foi registrado e o usuário não está digitando um comentário, inicia o contador de 2s para fechar
  useEffect(() => {
    if (selectedSentiment && !isTyping && !commentText.trim()) {
      setSecondsRemaining(2);

      const interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = interval;
      return () => clearInterval(interval);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setSecondsRemaining(null);
    }
  }, [selectedSentiment, isTyping, commentText, onClose]);

  if (!isOpen) return null;

  // Dispara evento imediato para o Google Analytics 4 (GA4)
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
          feedback_modal: 'centered_delight_modal',
        });
      }
    } catch (e) {
      console.warn('Erro ao disparar evento no GA4:', e);
    }
  };

  // Envia e-mail opcional para a equipe Future Horizon Group
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
    setIsEmailSent(true);

    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'feedback_email_click', {
          sentiment: selectedSentiment,
          has_comment: true,
        });
      }
    } catch (_) {}

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#0F1422] p-5 sm:p-6 shadow-2xl transition-all"
      >
        {/* Efeito sutil de brilho superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Botão de Fechar no Canto Superior */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          title="Fechar (Esc)"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Cabeçalho do Pop-up */}
        <div className="flex items-start gap-3.5 mb-5 pr-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Como foi a conversão dos seus arquivos?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Seu voto aparece ao vivo no painel de métricas e nos ajuda a manter tudo 100% gratuito.
            </p>
          </div>
        </div>

        {/* 4 Botões Grandes de 1 Clique */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleVote('excelente')}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all active:scale-95 ${
              selectedSentiment === 'excelente'
                ? 'border-emerald-500 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg'
                : 'border-emerald-500/20 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/40'
            }`}
          >
            <Smile className="h-5 w-5 text-emerald-400" />
            <span>Excelente! 😍</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('rapido')}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all active:scale-95 ${
              selectedSentiment === 'rapido'
                ? 'border-indigo-500 bg-indigo-500/25 text-indigo-200 ring-2 ring-indigo-500/40 shadow-lg'
                : 'border-indigo-500/20 bg-indigo-950/20 text-indigo-300 hover:bg-indigo-500/15 hover:border-indigo-500/40'
            }`}
          >
            <Zap className="h-5 w-5 text-indigo-400" />
            <span>Rápido! ⚡</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('boa')}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all active:scale-95 ${
              selectedSentiment === 'boa'
                ? 'border-cyan-500 bg-cyan-500/25 text-cyan-200 ring-2 ring-cyan-500/40 shadow-lg'
                : 'border-cyan-500/20 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-500/40'
            }`}
          >
            <ThumbsUp className="h-5 w-5 text-cyan-400" />
            <span>Boa 👍</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('problema')}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all active:scale-95 ${
              selectedSentiment === 'problema'
                ? 'border-rose-500 bg-rose-500/25 text-rose-200 ring-2 ring-rose-500/40 shadow-lg'
                : 'border-rose-500/20 bg-rose-950/20 text-rose-300 hover:bg-rose-500/15 hover:border-rose-500/40'
            }`}
          >
            <AlertCircle className="h-5 w-5 text-rose-400" />
            <span>Problema ❌</span>
          </button>
        </div>

        {/* Caixa de Sugestão / Comentário Opcional */}
        <form onSubmit={handleSendEmail} className="space-y-3 pt-2 border-t border-white/5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Quer deixar uma sugestão ou feedback para o criador? (Opcional):
            </label>
            <input
              type="text"
              value={commentText}
              onFocus={() => setIsTyping(true)}
              onChange={(e) => {
                setCommentText(e.target.value);
                setIsTyping(Boolean(e.target.value.trim()));
              }}
              placeholder="Ex: Gostaria de conversão de vídeo, SVG, cortar imagens..."
              className="w-full rounded-xl border border-white/10 bg-[#090D16] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Rodapé Dinâmico: Agradecimento com Auto-fechamento OU Envio de E-mail */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {selectedSentiment ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {secondsRemaining !== null && secondsRemaining > 0
                    ? `Voto registrado! Fechando em ${secondsRemaining}s...`
                    : 'Voto registrado com sucesso no painel!'}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500">
                1 clique para votar · Não coletamos dados pessoais
              </span>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {commentText.trim() && (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Enviar por E-mail</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {selectedSentiment ? 'Fechar agora' : 'Pular'}
              </button>
            </div>
          </div>
        </form>

        {isEmailSent && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-indigo-300 font-medium animate-fadeIn">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>Mensagem aberta no seu aplicativo de e-mail! Obrigado pelo carinho.</span>
          </div>
        )}
      </div>
    </div>
  );
};
