import JSZip from 'jszip';
import { FORMAT_OPTIONS, ImageFileItem, SupportedOutputFormat } from '../types/converter.ts';

/**
 * Formata bytes em representação humana legível (ex: 1.4 MB, 420 KB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Calcula a porcentagem de redução de tamanho
 */
export function calculateSavings(originalSize: number, newSize: number): {
  percentage: number;
  isReduced: boolean;
  formattedDiff: string;
} {
  const diff = originalSize - newSize;
  const percentage = Math.round(Math.abs(diff / originalSize) * 100);
  const isReduced = diff > 0;
  return {
    percentage,
    isReduced,
    formattedDiff: formatFileSize(Math.abs(diff)),
  };
}

/**
 * Cria um objeto ImageFileItem a partir de um File do navegador
 */
export async function processInputFile(file: File): Promise<ImageFileItem> {
  const previewUrl = URL.createObjectURL(file);
  const dimensions = await getImageDimensions(previewUrl);

  const extension = file.name.split('.').pop()?.toLowerCase() || 'png';
  let defaultTargetFormat: SupportedOutputFormat = 'webp';
  if (extension === 'webp') defaultTargetFormat = 'jpeg';
  else if (extension === 'jpg' || extension === 'jpeg') defaultTargetFormat = 'png';

  return {
    id: `${file.name}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    file,
    name: file.name,
    originalSize: file.size,
    originalWidth: dimensions.width,
    originalHeight: dimensions.height,
    originalFormat: extension.toUpperCase(),
    previewUrl,
    targetFormat: defaultTargetFormat,
    quality: 0.85,
    scalePercentage: 100,
    backgroundColor: '#FFFFFF',
    status: 'idle',
    progress: 0,
  };
}

/**
 * Obtém dimensões nativas de uma imagem
 */
function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
    };
    img.src = url;
  });
}

/**
 * Executa a conversão client-side de um item usando Canvas 2D
 */
export async function convertSingleImage(item: ImageFileItem): Promise<Partial<ImageFileItem>> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const scale = item.scalePercentage / 100;
        const targetWidth = Math.max(1, Math.round(img.naturalWidth * scale));
        const targetHeight = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Não foi possível inicializar o contexto Canvas no navegador.');
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const formatSpec = FORMAT_OPTIONS[item.targetFormat];

        // Se o formato de destino não suportar transparência (JPG/BMP),
        // preenchemos com a cor de fundo escolhida (padrão branco)
        if (!formatSpec.supportsTransparency) {
          ctx.fillStyle = item.backgroundColor || '#FFFFFF';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const mimeType = formatSpec.mimeType;
        const qualityParam = formatSpec.supportsQuality ? item.quality : undefined;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Falha ao exportar os dados da imagem convertida.'));
              return;
            }

            const convertedUrl = URL.createObjectURL(blob);
            resolve({
              status: 'done',
              progress: 100,
              convertedBlob: blob,
              convertedUrl,
              convertedSize: blob.size,
              convertedWidth: targetWidth,
              convertedHeight: targetHeight,
            });
          },
          mimeType,
          qualityParam
        );
      } catch (err: any) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error(`Erro ao ler a imagem "${item.name}". O arquivo pode estar corrompido.`));
    };

    img.src = item.previewUrl;
  });
}

/**
 * Gera um arquivo ZIP contendo todas as imagens convertidas com sucesso
 */
export async function createZipArchive(items: ImageFileItem[]): Promise<Blob> {
  const zip = new JSZip();

  items.forEach((item, index) => {
    if (item.convertedBlob) {
      const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
      const ext = FORMAT_OPTIONS[item.targetFormat].extension;
      const fileName = `${baseName}_pixelshift_${index + 1}${ext}`;
      zip.file(fileName, item.convertedBlob);
    }
  });

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}

/**
 * Dispara o download de um Blob no navegador com nome amigável
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Gera uma imagem de amostra programática para o usuário testar com 1 clique
 */
export async function generateSampleFile(
  type: 'photo' | 'transparency' | 'badge'
): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  if (type === 'transparency') {
    // Desenha logo circular com transparência para testar PNG -> JPG com fundo
    ctx.clearRect(0, 0, 1200, 800);

    const grad = ctx.createLinearGradient(300, 150, 900, 650);
    grad.addColorStop(0, '#6366F1');
    grad.addColorStop(0.5, '#EC4899');
    grad.addColorStop(1, '#F59E0B');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(600, 400, 260, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 72px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PixelShift', 600, 390);

    ctx.font = '500 28px "DM Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('Amostra com Transparência PNG', 600, 440);

    return new Promise((res) => {
      canvas.toBlob((blob) => {
        res(new File([blob!], 'amostra_transparente.png', { type: 'image/png' }));
      }, 'image/png');
    });
  }

  if (type === 'badge') {
    // Gráfico vetorial nítido
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1200, 800);

    // Grid técnico
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = 0; y < 800; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ilustração Técnica de Alta Densidade', 600, 380);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '24px "DM Sans", sans-serif';
    ctx.fillText('Ideal para testar conversão para WEBP com 80% de redução', 600, 430);

    return new Promise((res) => {
      canvas.toBlob((blob) => {
        res(new File([blob!], 'grafico_vetorial.png', { type: 'image/png' }));
      }, 'image/png');
    });
  }

  // Foto de Alta Resolução / Pôr do sol
  const grad = ctx.createLinearGradient(0, 0, 1200, 800);
  grad.addColorStop(0, '#0F2027');
  grad.addColorStop(0.5, '#203A43');
  grad.addColorStop(1, '#2C5364');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 800);

  // Sol poente
  const sunGrad = ctx.createRadialGradient(600, 500, 20, 600, 500, 300);
  sunGrad.addColorStop(0, '#F59E0B');
  sunGrad.addColorStop(0.6, '#EF4444');
  sunGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(600, 500, 300, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 56px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Fotografia de Paisagem HD', 600, 360);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '22px "DM Sans", sans-serif';
  ctx.fillText('Original em 1200x800px para teste de compressão JPEG', 600, 410);

  return new Promise((res) => {
    canvas.toBlob((blob) => {
      res(new File([blob!], 'paisagem_alta_definicao.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.95);
  });
}
