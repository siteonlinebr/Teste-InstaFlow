import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, ImagePlus, Shield, Clipboard, Sparkles, FileCheck2 } from 'lucide-react';
import { generateSampleFile } from '../services/imageConverter.ts';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isLoadingSample: boolean;
  setIsLoadingSample: (loading: boolean) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFilesSelected,
  isLoadingSample,
  setIsLoadingSample,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Escuta evento de Colar (Ctrl+V / Cmd+V) na página inteira
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            pastedFiles.push(file);
          }
        }
      }

      if (pastedFiles.length > 0) {
        onFilesSelected(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp|svg|avif)$/i.test(file.name)
      );
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = ''; // Permite selecionar o mesmo arquivo novamente
    }
  };

  const handleLoadSample = async (type: 'photo' | 'transparency' | 'badge') => {
    try {
      setIsLoadingSample(true);
      const sample = await generateSampleFile(type);
      onFilesSelected([sample]);
    } finally {
      setIsLoadingSample(false);
    }
  };

  return (
    <div className="w-full">
      {/* Caixa de Arraste Principal */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ${
          isDragging
            ? 'border-indigo-400 bg-indigo-950/30 scale-[1.01]'
            : 'border-white/15 bg-[#111625]/60 hover:border-indigo-500/50 hover:bg-[#141B2D]/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,.avif"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="mt-5 text-lg sm:text-xl font-bold text-white font-display">
          Arraste e solte suas imagens aqui
        </h3>

        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          ou clique para selecionar do computador / celular. Você também pode colar com{' '}
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-mono text-slate-200">
            Ctrl+V
          </kbd>
        </p>

        {/* Linha de Formatos e Garantia de Privacidade */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="h-4 w-4 shrink-0" />
            <span className="font-medium">100% no seu navegador (sem upload para servidores)</span>
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>PNG, JPG, WEBP, GIF, BMP, SVG</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>Conversão em lote ilimitada</span>
        </div>
      </div>

      {/* Amostras Rápidas com 1 Clique */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0D121F] p-3 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>Quer testar agora sem procurar arquivos?</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isLoadingSample}
            onClick={() => handleLoadSample('transparency')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <ImagePlus className="h-3.5 w-3.5 text-pink-400" />
            <span>Testar PNG Transparente</span>
          </button>

          <button
            type="button"
            disabled={isLoadingSample}
            onClick={() => handleLoadSample('photo')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <FileCheck2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Testar Foto JPG HD</span>
          </button>

          <button
            type="button"
            disabled={isLoadingSample}
            onClick={() => handleLoadSample('badge')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Clipboard className="h-3.5 w-3.5 text-cyan-400" />
            <span>Testar Ilustração Vetorial</span>
          </button>
        </div>
      </div>
    </div>
  );
};
