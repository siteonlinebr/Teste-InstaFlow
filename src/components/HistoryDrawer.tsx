import React from 'react';
import { DownloadHistoryItem, InstagramPostData } from '../types/instagram.ts';
import { X, Trash2, Download, Play, Clock, ArrowRight } from 'lucide-react';
import { triggerDirectDownload } from '../services/api.ts';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DownloadHistoryItem[];
  onSelectPost: (post: InstagramPostData) => void;
  onRemoveItem: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectPost,
  onRemoveItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Agora mesmo';
    if (diff < 3600) return `Há ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Há ${Math.floor(diff / 3600)} horas`;
    return new Date(ts).toLocaleDateString('pt-BR');
  };

  const handleDownloadAgain = (item: DownloadHistoryItem) => {
    const post = item.postData;
    const primary = post.mediaList.find((m) => m.type === 'video') || post.mediaList[0];
    if (!primary) return;

    if (item.downloadFormat === 'mp3') {
      const audioUrl = post.audioUrl || primary.url;
      triggerDirectDownload(audioUrl, `instaflow_${post.shortcode}_audio.mp3`, 'audio');
    } else {
      triggerDirectDownload(primary.url, `instaflow_${post.shortcode}.mp4`, 'video');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop clicável */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Painel Lateral */}
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0E1018] p-6 shadow-2xl z-10 animate-slideLeft">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-[#F77737]" />
            <h2 className="text-lg font-bold text-white">Downloads Recentes</h2>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              ({history.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 mb-3">
                <Clock className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-slate-300">Nenhum download ainda</p>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Seus vídeos, Reels e carrosséis baixados aparecerão aqui para download rápido.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const post = item.postData;
              const thumb = post.mediaList[0]?.thumbnailUrl || '';

              return (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-3.5 rounded-xl border border-white/5 bg-[#141624] p-3 transition-all hover:border-white/15 hover:bg-[#1A1D2E]"
                >
                  {/* Miniatura com botão de play */}
                  <div
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-black"
                  >
                    <img
                      src={thumb}
                      alt={post.shortcode}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <Play className="h-4 w-4 fill-white text-white opacity-80" />
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs truncate">
                        @{post.author.username}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#F77737]">
                        .{item.downloadFormat}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                      {post.caption || 'Sem legenda'}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 font-mono tabular-nums">
                      <span>{formatTime(item.timestamp)}</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleDownloadAgain(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-300 hover:bg-[#FD1D1D] hover:text-white transition-colors"
                      title="Baixar novamente"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      title="Remover do histórico"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé com Ação Limpar */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Limpar tudo</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-semibold text-white hover:text-[#F77737] transition-colors"
            >
              <span>Fechar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
