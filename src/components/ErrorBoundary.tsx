import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro interceptado pelo ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#111625] p-6 sm:p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 mb-5">
              <AlertCircle className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-bold font-display text-white">
              Algo inesperado aconteceu
            </h2>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              O aplicativo encontrou uma divergência no navegador. Suas imagens não foram perdidas.
            </p>

            {this.state.error && (
              <div className="mt-4 rounded-lg bg-black/40 p-3 text-left font-mono text-xs text-red-300 overflow-x-auto max-h-28">
                {this.state.error.message}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white transition-all active:scale-95 shadow-md"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Recarregar Página</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.href = '/';
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <Home className="h-4 w-4" />
                <span>Início</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
