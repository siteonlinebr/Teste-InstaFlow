export type SupportedOutputFormat = 'png' | 'jpeg' | 'webp' | 'bmp' | 'gif';

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  previewUrl: string;

  // Configurações de conversão
  targetFormat: SupportedOutputFormat;
  quality: number; // 0.1 a 1.0 (para jpeg e webp)
  scalePercentage: number; // 25, 50, 75, 100
  backgroundColor: string; // Para preenchimento de fundo em transparências (PNG -> JPG)

  // Status e Resultados
  status: 'idle' | 'converting' | 'done' | 'error';
  progress: number;
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number;
  convertedWidth?: number;
  convertedHeight?: number;
  error?: string;
}

export interface GlobalConversionConfig {
  targetFormat: SupportedOutputFormat;
  quality: number;
  scalePercentage: number;
  backgroundColor: string;
}

export interface FormatOption {
  format: SupportedOutputFormat;
  label: string;
  extension: string;
  mimeType: string;
  description: string;
  badge: string;
  supportsQuality: boolean;
  supportsTransparency: boolean;
}

export const FORMAT_OPTIONS: Record<SupportedOutputFormat, FormatOption> = {
  webp: {
    format: 'webp',
    label: 'WEBP',
    extension: '.webp',
    mimeType: 'image/webp',
    description: 'Formato moderno do Google. Reduz até 80% do peso mantendo transparência.',
    badge: 'Recomendado para Web',
    supportsQuality: true,
    supportsTransparency: true,
  },
  jpeg: {
    format: 'jpeg',
    label: 'JPG / JPEG',
    extension: '.jpg',
    mimeType: 'image/jpeg',
    description: 'Padrão universal compatível com qualquer dispositivo e impressão.',
    badge: 'Compatibilidade Total',
    supportsQuality: true,
    supportsTransparency: false,
  },
  png: {
    format: 'png',
    label: 'PNG',
    extension: '.png',
    mimeType: 'image/png',
    description: 'Qualidade sem perdas com suporte total a fundo transparente.',
    badge: 'Alta Fidelidade',
    supportsQuality: false,
    supportsTransparency: true,
  },
  gif: {
    format: 'gif',
    label: 'GIF',
    extension: '.gif',
    mimeType: 'image/gif',
    description: 'Ideal para gráficos simples e ícones com paleta indexada.',
    badge: 'Clássico Web',
    supportsQuality: false,
    supportsTransparency: true,
  },
  bmp: {
    format: 'bmp',
    label: 'BMP',
    extension: '.bmp',
    mimeType: 'image/bmp',
    description: 'Bitmap sem compressão para sistemas legados e edição bruta.',
    badge: 'Sem Compressão',
    supportsQuality: false,
    supportsTransparency: false,
  },
};
