import React from 'react';
import { ImageFileItem } from '../types/converter.ts';
import { formatFileSize, calculateSavings } from '../services/imageConverter.ts';
import {
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Download,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface OverallStatusProps {
  items: ImageFileItem[];
  isConverting: boolean;
  onDownloadAllZip: () => void;
}

export const OverallStatus: React.FC<OverallStatusProps> = ({
  items,
  isConverting,
  onDownloadAllZip,
}) => {
  if (items.length === 0) return null;

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'done').length;
  const convertingCount = items.filter((i) => i.status === 'converting').length;
  const errorCount = items.filter((i) => i.status === 'error').length;

  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Calcula totais de bytes
  const totalOriginalBytes = items.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalConvertedBytes = items.reduce(
    (acc, curr) => acc + (curr.convertedSize || curr.originalSize),
    0
  );

  const completedConvertedBytes = items
    .filter((i) => i.status === 'done' && i.convertedSize)
    .reduce((acc, curr) => acc + (curr.convertedSize || 0), 0);

  const completedOriginalBytes = items
    .filter((i) => i.status === 'done' && i.convertedSize)
    .reduce((acc, curr) => acc + curr.originalSize, 0);

  const savings =
    completedCount > 0 && completedOriginalBytes > completedConvertedBytes
      ? calculateSavings(completedOriginalBytes, completedConvertedBytes)
      : null;

  const isAllDone = completedCount === totalCount && totalCount > 0;

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#111625] p-4 sm:p-5 shadow-xl transition-all">
      <div className="flex flex-col gap-3.5">
        {/* Cabeçalho do Status com Metadados e Porcentagem */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                isAllDone
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : isConverting
                  ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 animate-pulse'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
            >
              {isAllDone ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : isConverting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Layers className="h-4 w-4" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-display">
                  Status Geral do Lote
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-[11px] font-mono text-slate-300">
                  {completedCount} de {totalCount} concluída{totalCount > 1 ? 's' : ''}
                </span>
              </div>

              <p className="text-[11px] text-slate-400">
                {isAllDone
                  ? 'Todas as imagens foram convertidas e estão prontas para download!'
                  : isConverting
                  ? `Processando ${convertingCount || 1} arquivo(s) simultaneamente no seu navegador...`
                  : 'Fila pronta para conversão com privacidade total no dispositivo'}
              </p>
            </div>
          </div>

          {/* Porcentagem Consolidada e Ação Rápida */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-lg font-extrabold text-white">
                {progressPercentage}%
              </span>
            </div>

            {isAllDone && (
              <button
                type="button"
                onClick={onDownloadAllZip}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Todas (.ZIP)</span>
              </button>
            )}
          </div>
        </div>

        {/* Barra de Progresso Consolidada com Brilho Dinâmico */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#080B12] border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isAllDone
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30'
                : 'bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 shadow-md shadow-cyan-500/20'
            }`}
            style={{ width: `${Math.max(isConverting ? 8 : 0, progressPercentage)}%` }}
          />
        </div>

        {/* Rodapé de Estatísticas Consolidada do Lote */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono tabular-nums">
          <div className="flex items-center gap-2">
            <span>Tamanho Original:</span>
            <span className="text-slate-200 font-bold">{formatFileSize(totalOriginalBytes)}</span>
          </div>

          {completedCount > 0 && (
            <div className="flex items-center gap-2">
              <span>Processado:</span>
              <span className="text-emerald-400 font-bold">
                {formatFileSize(completedConvertedBytes)}
              </span>
            </div>
          )}

          {savings && savings.isReduced && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                Economia: {savings.formattedDiff} (-{savings.percentage}%)
              </span>
            </div>
          )}

          {errorCount > 0 && (
            <span className="text-red-400 font-semibold">
              {errorCount} com falha
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
