import React, { useState } from 'react';
import { MediaItem } from '../types/instagram.ts';
import { ChevronLeft, ChevronRight, Download, Play, Image as ImageIcon } from 'lucide-react';
import { triggerDirectDownload } from '../services/api.ts';

interface CarouselViewerProps {
  mediaList: MediaItem[];
  shortcode: string;
  onItemDownloaded?: (item: MediaItem) => void;
}

export const CarouselViewer: React.FC<CarouselViewerProps> = ({
  mediaList,
  shortcode,
  onItemDownloaded,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!mediaList || mediaList.length === 0) return null;

  const currentItem = mediaList[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0));
  };

  const handleDownloadCurrent = () => {
    const ext = currentItem.type === 'video' ? 'mp4' : 'jpg';
    const filename = `instaflow_${shortcode}_item${currentIndex + 1}.${ext}`;
    triggerDirectDownload(currentItem.url, filename, currentItem.type);
    onItemDownloaded?.(currentItem);
  };

  const handleDownloadAll = () => {
    mediaList.forEach((item, index) => {
      setTimeout(() => {
        const ext = item.type === 'video' ? 'mp4' : 'jpg';
        const filename = `instaflow_${shortcode}_item${index + 1}.${ext}`;
        triggerDirectDownload(item.url, filename, item.type);
        onItemDownloaded?.(item);
      }, index * 400); // Espaçamento para evitar cancelamento de downloads pelo navegador
    });
  };

  return (
    <div className="w-full">
      {/* Contêiner de Visualização Principal */}
      <div className="relative aspect-[4/5] sm:aspect-square max-h-[460px] w-full overflow-hidden rounded-xl bg-black flex items-center justify-center">
        {currentItem.type === 'video' ? (
          <video
            key={currentItem.url}
            src={currentItem.url}
            poster={currentItem.thumbnailUrl}
            controls
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            src={currentItem.url}
            alt={`Slide ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain"
          />
        )}

        {/* Indicador de Slide */}
        <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md font-mono tabular-nums">
          {currentIndex + 1} / {mediaList.length}
        </div>

        {/* Tag do Tipo de Mídia */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
          {currentItem.type === 'video' ? (
            <>
              <Play className="h-3 w-3 fill-white" />
              <span>Vídeo</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-3 w-3 text-slate-300" />
              <span>Foto</span>
            </>
          )}
        </div>

        {/* Botões de Navegação Anterior / Próximo */}
        {mediaList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/90 active:scale-90"
              title="Item anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/90 active:scale-90"
              title="Próximo item"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas dos Itens do Carrossel */}
      {mediaList.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {mediaList.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                currentIndex === idx
                  ? 'border-[#FD1D1D] scale-105 shadow-md shadow-[#FD1D1D]/30'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={`Miniatura ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[9px] font-mono text-white tabular-nums">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Ações Específicas do Carrossel */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
        <button
          type="button"
          onClick={handleDownloadCurrent}
          className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#FD1D1D]/20 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>
            Baixar Item {currentIndex + 1} ({currentItem.type === 'video' ? 'Vídeo MP4' : 'Foto JPG'})
          </span>
        </button>

        {mediaList.length > 1 && (
          <button
            type="button"
            onClick={handleDownloadAll}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#151825] px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 transition-all hover:bg-[#1E2235] hover:border-white/20 active:scale-[0.98] whitespace-nowrap"
          >
            <Download className="h-4 w-4 text-[#F77737]" />
            <span>Baixar Todos ({mediaList.length} itens)</span>
          </button>
        )}
      </div>
    </div>
  );
};
