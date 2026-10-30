import React from 'react';
import {
  FORMAT_OPTIONS,
  GlobalConversionConfig,
  SupportedOutputFormat,
} from '../types/converter.ts';
import { Play, Download, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

interface BatchControlsBarProps {
  config: GlobalConversionConfig;
  onChangeConfig: (newConfig: Partial<GlobalConversionConfig>) => void;
  onConvertAll: () => void;
  onDownloadAllZip: () => void;
  isConverting: boolean;
  totalCount: number;
  completedCount: number;
}

export const BatchControlsBar: React.FC<BatchControlsBarProps> = ({
  config,
  onChangeConfig,
  onConvertAll,
  onDownloadAllZip,
  isConverting,
  totalCount,
  completedCount,
}) => {
  const currentFormatSpec = FORMAT_OPTIONS[config.targetFormat];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#111625] p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col gap-6">
        {/* Linha 1: Seletor de Formato Global e Ações de Disparo */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-bold text-white font-display">
                Converter todas as {totalCount} imagens para:
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentFormatSpec.description}
            </p>
          </div>

          {/* Formatos em Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#090D16] border border-white/5">
            {(Object.keys(FORMAT_OPTIONS) as SupportedOutputFormat[]).map((fmt) => {
              const opt = FORMAT_OPTIONS[fmt];
              const isSelected = config.targetFormat === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChangeConfig({ targetFormat: fmt })}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Linha 2: Controles de Qualidade, Redimensionamento e Cor de Fundo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          {/* Slider de Qualidade (se suportado pelo formato) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Qualidade da Compressão
              </span>
              <span className="font-mono tabular-nums text-indigo-300 font-bold">
                {currentFormatSpec.supportsQuality
                  ? `${Math.round(config.quality * 100)}%`
                  : 'Sem Perdas'}
              </span>
            </div>
            {currentFormatSpec.supportsQuality ? (
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={config.quality}
                onChange={(e) =>
                  onChangeConfig({ quality: parseFloat(e.target.value) })
                }
                className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-slate-800"
              />
            ) : (
              <div className="text-[11px] text-slate-500 italic py-1">
                O formato {currentFormatSpec.label} preserva todos os pixels sem perda.
              </div>
            )}
          </div>

          {/* Seletor de Escala / Resolução */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Dimensão / Escala</span>
              <span className="font-mono tabular-nums text-slate-400">
                {config.scalePercentage}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 75, 50, 25].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => onChangeConfig({ scalePercentage: scale })}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    config.scalePercentage === scale
                      ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-200'
                      : 'border-white/5 bg-[#090D16] text-slate-400 hover:text-white'
                  }`}
                >
                  {scale === 100 ? 'Original' : `${scale}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Fundo para transparência (se JPG/BMP) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Fundo de Transparência
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {!currentFormatSpec.supportsTransparency ? config.backgroundColor : 'Transparente'}
              </span>
            </div>
            {!currentFormatSpec.supportsTransparency ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) =>
                    onChangeConfig({ backgroundColor: e.target.value })
                  }
                  className="h-8 w-12 cursor-pointer rounded border border-white/10 bg-transparent p-0.5"
                  title="Escolha a cor de fundo para preencher partes transparentes"
                />
                <button
                  type="button"
                  onClick={() => onChangeConfig({ backgroundColor: '#FFFFFF' })}
                  className="px-2.5 py-1 text-xs rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                >
                  Branco
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig({ backgroundColor: '#000000' })}
                  className="px-2.5 py-1 text-xs rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                >
                  Preto
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic py-1">
                Preserva canal alfa (fundo transparente mantido).
              </div>
            )}
          </div>
        </div>

        {/* Linha 3: Botões de Ação Final */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
          <div className="text-xs text-slate-400 font-mono tabular-nums">
            {completedCount > 0 ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {completedCount} de {totalCount} convertida{totalCount > 1 ? 's' : ''} com sucesso
              </span>
            ) : (
              <span>Pronto para conversão no dispositivo</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            {/* Botão Primário: Converter Todas */}
            <button
              type="button"
              disabled={isConverting}
              onClick={onConvertAll}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Convertendo...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Converter Todas ({totalCount})</span>
                </>
              )}
            </button>

            {/* Botão Secundário: Baixar ZIP */}
            {completedCount > 0 && (
              <button
                type="button"
                onClick={onDownloadAllZip}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all active:scale-95 whitespace-nowrap"
                title="Empacota todas as imagens convertidas em um arquivo .zip"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Todas (.ZIP)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
