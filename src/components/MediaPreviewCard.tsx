import React, { useState } from 'react';
import { InstagramPostData } from '../types/instagram.ts';
import { Download, Music, Image as ImageIcon, Copy, Check, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { CarouselViewer } from './CarouselViewer.tsx';
import { triggerDirectDownload } from '../services/api.ts';

interface MediaPreviewCardProps {
  post: InstagramPostData;
  onDownloaded: (format: 'mp4' | 'mp3' | 'jpg') => void;
}

export const MediaPreviewCard: React.FC<MediaPreviewCardProps> = ({
  post,
  onDownloaded,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedCaption, setExpandedCaption] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const primaryVideo = post.mediaList.find((m) => m.type === 'video') || post.mediaList[0];
  const isCarousel = post.type === 'carousel' || post.mediaList.length > 1;

  const showToast = (message: string) => {
    setDownloadSuccessToast(message);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  const handleDownloadVideo = () => {
    if (!primaryVideo) return;
    const filename = `instaflow_${post.shortcode}.mp4`;
    triggerDirectDownload(primaryVideo.url, filename, 'video');
    onDownloaded('mp4');
    showToast('Download do vídeo MP4 iniciado!');
  };

  const handleDownloadAudio = () => {
    const audioSource = post.audioUrl || primaryVideo?.url;
    if (!audioSource) return;
    const filename = `instaflow_${post.shortcode}_audio.mp3`;
    triggerDirectDownload(audioSource, filename, 'audio');
    onDownloaded('mp3');
    showToast('Download do áudio MP3 iniciado!');
  };

  const handleDownloadThumbnail = () => {
    const thumbUrl = primaryVideo?.thumbnailUrl || post.mediaList[0]?.thumbnailUrl;
    if (!thumbUrl) return;
    const filename = `instaflow_${post.shortcode}_cover.jpg`;
    triggerDirectDownload(thumbUrl, filename, 'image');
    onDownloaded('jpg');
    showToast('Download da imagem de capa iniciado!');
  };

  const handleCopyDirectLink = async () => {
    try {
      await navigator.clipboard.writeText(primaryVideo?.url || post.originalUrl);
      setCopiedLink(true);
      showToast('Link direto copiado para a área de transferência!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E1018] p-5 sm:p-7 shadow-2xl transition-all animate-fadeIn">
      {/* Toast de Download Sucesso */}
      {downloadSuccessToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-[#0A1A12]/95 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Cabeçalho do Autor */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={post.author.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${post.author.username}`}
            alt={post.author.username}
            referrerPolicy="no-referrer"
            className="h-11 w-11 rounded-full border border-white/10 object-cover bg-slate-800"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm sm:text-base truncate">
                @{post.author.username}
              </span>
              {post.author.isVerified && (
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white text-[10px]"
                  title="Conta Verificada"
                >
                  ✓
                </div>
              )}
            </div>
            {/* Metadados desempacotados sem pílulas (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
              {post.author.fullName && <span>{post.author.fullName}</span>}
              {post.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <a
          href={post.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap shrink-0"
        >
          <span>Abrir no Insta</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Área Central: Player de Vídeo ou Carrossel */}
      <div className="mt-5">
        {isCarousel ? (
          <CarouselViewer
            mediaList={post.mediaList}
            shortcode={post.shortcode}
            onItemDownloaded={() => onDownloaded('mp4')}
          />
        ) : (
          <div className="relative aspect-[9/16] sm:aspect-video max-h-[520px] w-full overflow-hidden rounded-xl bg-black flex items-center justify-center">
            {primaryVideo?.type === 'video' ? (
              <video
                key={primaryVideo.url}
                src={primaryVideo.url}
                poster={primaryVideo.thumbnailUrl}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={primaryVideo?.url || primaryVideo?.thumbnailUrl}
                alt="Mídia"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        )}
      </div>

      {/* Legenda e Métricas */}
      <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p className={`${expandedCaption ? '' : 'line-clamp-2'} text-slate-200`}>
          {post.caption}
        </p>
        {post.caption && post.caption.length > 120 && (
          <button
            type="button"
            onClick={() => setExpandedCaption(!expandedCaption)}
            className="mt-1 text-xs font-semibold text-[#F77737] hover:underline"
          >
            {expandedCaption ? 'Ver menos' : 'Ver mais'}
          </button>
        )}

        {/* Métricas sem pílulas decorativas */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 font-mono tabular-nums">
          {typeof post.likeCount === 'number' && (
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span>{post.likeCount.toLocaleString('pt-BR')} curtidas</span>
            </div>
          )}
          {typeof post.commentCount === 'number' && (
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-blue-400" />
              <span>{post.commentCount.toLocaleString('pt-BR')} comentários</span>
            </div>
          )}
          {primaryVideo?.quality && (
            <div className="flex items-center gap-1 text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-[#F77737]" />
              <span>{primaryVideo.quality}</span>
              {primaryVideo.formattedSize && <span>· {primaryVideo.formattedSize}</span>}
            </div>
          )}
        </div>

        {/* Informação do Áudio Musical */}
        {post.audioTitle && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#141624] px-3 py-2 text-xs text-slate-300">
            <Music className="h-3.5 w-3.5 text-[#FD1D1D] shrink-0" />
            <span className="truncate">
              <span className="font-semibold text-white">{post.audioTitle}</span>
              {post.audioArtist && ` — ${post.audioArtist}`}
            </span>
          </div>
        )}
      </div>

      {/* Painel de Downloads em 1 Clique */}
      <div className="mt-6 pt-5 border-t border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Botão Primário: Baixar Vídeo MP4 */}
          <button
            type="button"
            onClick={handleDownloadVideo}
            className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FD1D1D]/30 transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span>Baixar Vídeo (MP4 HD)</span>
          </button>

          {/* Botão Secundário: Baixar Áudio MP3 */}
          <button
            type="button"
            onClick={handleDownloadAudio}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#141624] px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 transition-all hover:bg-[#1C2033] hover:border-white/20 active:scale-[0.98]"
          >
            <Music className="h-4 w-4 text-[#FD1D1D]" />
            <span>Áudio (MP3)</span>
          </button>

          {/* Botão Terciário: Baixar Capa / Foto */}
          <button
            type="button"
            onClick={handleDownloadThumbnail}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#141624] px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 transition-all hover:bg-[#1C2033] hover:border-white/20 active:scale-[0.98]"
          >
            <ImageIcon className="h-4 w-4 text-emerald-400" />
            <span>Capa (JPG)</span>
          </button>
        </div>

        {/* Linha de Ações Auxiliares */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-1">
          <button
            type="button"
            onClick={handleCopyDirectLink}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copiar link direto da mídia</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-slate-500">
            Stream direto sem anúncios
          </span>
        </div>
      </div>
    </div>
  );
};
