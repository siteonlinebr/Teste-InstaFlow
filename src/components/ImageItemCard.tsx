import React from 'react';
import {
  ImageFileItem,
  FORMAT_OPTIONS,
  SupportedOutputFormat,
} from '../types/converter.ts';
import {
  formatFileSize,
  calculateSavings,
  triggerFileDownload,
} from '../services/imageConverter.ts';
import {
  Download,
  Trash2,
  CheckCircle2,
  ArrowRight,
  SplitSquareVertical,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

interface ImageItemCardProps {
  item: ImageFileItem;
  onUpdateItem: (id: string, updates: Partial<ImageFileItem>) => void;
  onConvertSingle: (id: string) => void;
  onRemove: (id: string) => void;
  onOpenComparison: (item: ImageFileItem) => void;
}

export const ImageItemCard: React.FC<ImageItemCardProps> = ({
  item,
  onUpdateItem,
  onConvertSingle,
  onRemove,
  onOpenComparison,
}) => {
  const isDone = item.status === 'done' && item.convertedBlob;
  const isConverting = item.status === 'converting';

  const savings =
    isDone && item.convertedSize
      ? calculateSavings(item.originalSize, item.convertedSize)
      : null;

  const handleDownloadSingle = () => {
    if (!item.convertedBlob) return;
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
    const ext = FORMAT_OPTIONS[item.targetFormat].extension;
    triggerFileDownload(item.convertedBlob, `${baseName}_pixelshift${ext}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#111625] p-4 transition-all hover:border-white/20 hover:bg-[#141B2D]">
      {/* Lado Esquerdo: Miniatura e Metadados do Arquivo */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40 flex items-center justify-center">
          <img
            src={item.previewUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.5 text-[9px] font-mono uppercase text-slate-300">
            {item.originalFormat}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white" title={item.name}>
            {item.name}
          </p>

          {/* Metadados Originais limpos e desacoplados */}
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono tabular-nums">
            <span>{formatFileSize(item.originalSize)}</span>
            <span aria-hidden="true">·</span>
            <span>
              {item.originalWidth} × {item.originalHeight}px
            </span>
          </div>

          {/* Resultado pós-conversão */}
          {isDone && item.convertedSize && (
            <div className="mt-1.5 flex items-center gap-2 text-xs">
              <span className="font-bold text-emerald-400 font-mono tabular-nums">
                {formatFileSize(item.convertedSize)}
              </span>
              {savings && savings.isReduced && (
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 font-mono">
                  -{savings.percentage}% menor ({savings.formattedDiff} economizados)
                </span>
              )}
            </div>
          )}

          {item.status === 'error' && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{item.error || 'Falha na conversão'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lado Direito: Seletor de Formato, Status e Ações */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
        {/* Seletor Individual de Formato */}
        <div className="flex items-center gap-1.5">
          <select
            value={item.targetFormat}
            disabled={isConverting}
            onChange={(e) =>
              onUpdateItem(item.id, {
                targetFormat: e.target.value as SupportedOutputFormat,
                status: 'idle',
              })
            }
            className="rounded-lg border border-white/10 bg-[#090D16] px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:border-white/20 focus:border-indigo-500 focus:outline-none"
          >
            {(Object.keys(FORMAT_OPTIONS) as SupportedOutputFormat[]).map((fmt) => (
              <option key={fmt} value={fmt}>
                para {FORMAT_OPTIONS[fmt].label}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de Comparação Antes/Depois (Se convertido) */}
        {isDone && (
          <button
            type="button"
            onClick={() => onOpenComparison(item)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            title="Comparar qualidade antes e depois lado a lado"
          >
            <SplitSquareVertical className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden md:inline">Comparar</span>
          </button>
        )}

        {/* Botão de Ação: Converter ou Baixar */}
        {isDone ? (
          <button
            type="button"
            onClick={handleDownloadSingle}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Baixar</span>
          </button>
        ) : (
          <button
            type="button"
            disabled={isConverting}
            onClick={() => onConvertSingle(item.id)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {isConverting ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <ArrowRight className="h-3.5 w-3.5" />
                <span>Converter</span>
              </>
            )}
          </button>
        )}

        {/* Botão de Excluir da Fila */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          title="Remover da lista"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
