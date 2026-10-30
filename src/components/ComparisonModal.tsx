import React, { useState } from 'react';
import { ImageFileItem, FORMAT_OPTIONS } from '../types/converter.ts';
import { formatFileSize, calculateSavings, triggerFileDownload } from '../services/imageConverter.ts';
import { X, Download, SplitSquareVertical } from 'lucide-react';

interface ComparisonModalProps {
  item: ImageFileItem | null;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ item, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100

  if (!item || !item.convertedUrl) return null;

  const savings =
    item.convertedSize
      ? calculateSavings(item.originalSize, item.convertedSize)
      : null;

  const handleDownload = () => {
    if (!item.convertedBlob) return;
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
    const ext = FORMAT_OPTIONS[item.targetFormat].extension;
    triggerFileDownload(item.convertedBlob, `${baseName}_pixelshift${ext}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F1422] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <SplitSquareVertical className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white truncate max-w-[180px] sm:max-w-md font-display">
                Comparação de Qualidade: {item.name}
              </h3>
              <p className="text-xs text-slate-400">
                Arraste o divisor central para inspecionar a fidelidade visual
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Área Central: Visualizador Interativo com Divisor Deslizante */}
        <div className="relative flex-1 min-h-[380px] max-h-[560px] bg-black/60 flex items-center justify-center overflow-hidden select-none">
          {/* Imagem Original (Camada de Fundo) */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={item.previewUrl}
              alt="Original"
              className="max-h-full max-w-full object-contain pointer-events-none"
            />
            <div className="absolute top-4 left-4 rounded bg-black/70 px-2 py-1 text-xs font-mono text-slate-300">
              Original: {item.originalFormat} ({formatFileSize(item.originalSize)})
            </div>
          </div>

          {/* Imagem Convertida (Camada Sobreposta Cortada pelo Slider) */}
          <div
            className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={item.convertedUrl}
                alt="Convertida"
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            </div>
            <div className="absolute top-4 right-4 rounded bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 text-xs font-mono text-emerald-300 pointer-events-auto">
              Convertida: {FORMAT_OPTIONS[item.targetFormat].label} ({formatFileSize(item.convertedSize || 0)})
            </div>
          </div>

          {/* Linha Divisória Interativa */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl pointer-events-auto">
              <SplitSquareVertical className="h-4 w-4" />
            </div>
          </div>

          {/* Controle Invisível do Slider de Tela Inteira */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
          />
        </div>

        {/* Rodapé do Modal com Métricas e Botão de Download */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-[#0A0E18]">
          <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
            <div>
              <span className="text-slate-400">Original: </span>
              <span className="text-white font-bold">{formatFileSize(item.originalSize)}</span>
            </div>
            <span className="text-white/20">→</span>
            <div>
              <span className="text-slate-400">Novo: </span>
              <span className="text-emerald-400 font-bold">{formatFileSize(item.convertedSize || 0)}</span>
            </div>
            {savings && savings.isReduced && (
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 font-bold">
                -{savings.percentage}% de economia
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-white/10 hover:bg-white/5 transition-all"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Baixar Arquivo Convertido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
