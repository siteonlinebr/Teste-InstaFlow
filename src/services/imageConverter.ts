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

        // Tratamento especializado para ICO (Favicon padrão Windows/Web)
        if (item.targetFormat === 'ico') {
          canvas.toBlob(
            async (pngBlob) => {
              if (!pngBlob) {
                reject(new Error('Falha ao gerar base PNG para o ícone ICO.'));
                return;
              }
              try {
                const icoBlob = await createIcoBlobFromPngBlob(pngBlob, targetWidth, targetHeight);
                const convertedUrl = URL.createObjectURL(icoBlob);
                resolve({
                  status: 'done',
                  progress: 100,
                  convertedBlob: icoBlob,
                  convertedUrl,
                  convertedSize: icoBlob.size,
                  convertedWidth: targetWidth,
                  convertedHeight: targetHeight,
                });
              } catch (e: any) {
                reject(e);
              }
            },
            'image/png'
          );
          return;
        }

        // Tratamento especializado para PDF (Documento Universal)
        if (item.targetFormat === 'pdf') {
          canvas.toBlob(
            async (jpegBlob) => {
              if (!jpegBlob) {
                reject(new Error('Falha ao renderizar imagem para o PDF.'));
                return;
              }
              try {
                const pdfBlob = await createPdfFromJpegBlob(jpegBlob, targetWidth, targetHeight);
                const convertedUrl = URL.createObjectURL(pdfBlob);
                resolve({
                  status: 'done',
                  progress: 100,
                  convertedBlob: pdfBlob,
                  convertedUrl,
                  convertedSize: pdfBlob.size,
                  convertedWidth: targetWidth,
                  convertedHeight: targetHeight,
                });
              } catch (e: any) {
                reject(e);
              }
            },
            'image/jpeg',
            item.quality
          );
          return;
        }

        // Tratamento padrão (WEBP, JPEG, PNG, GIF, BMP, AVIF)
        const mimeType = formatSpec.mimeType;
        const qualityParam = formatSpec.supportsQuality ? item.quality : undefined;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              // Fallback para AVIF se o navegador for legado
              if (item.targetFormat === 'avif') {
                canvas.toBlob(
                  (fallbackBlob) => {
                    if (!fallbackBlob) {
                      reject(new Error('Falha ao exportar os dados da imagem.'));
                      return;
                    }
                    const convertedUrl = URL.createObjectURL(fallbackBlob);
                    resolve({
                      status: 'done',
                      progress: 100,
                      convertedBlob: fallbackBlob,
                      convertedUrl,
                      convertedSize: fallbackBlob.size,
                      convertedWidth: targetWidth,
                      convertedHeight: targetHeight,
                    });
                  },
                  'image/webp',
                  qualityParam
                );
                return;
              }
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

/**
 * Constrói um container binário .ICO padrão Windows/Web com payload PNG de 32-bits
 */
async function createIcoBlobFromPngBlob(
  pngBlob: Blob,
  width: number,
  height: number
): Promise<Blob> {
  const pngBuffer = await pngBlob.arrayBuffer();
  const pngBytes = new Uint8Array(pngBuffer);
  const icoHeaderSize = 6;
  const icoDirEntrySize = 16;
  const totalSize = icoHeaderSize + icoDirEntrySize + pngBytes.length;
  const icoBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(icoBuffer);

  // ICONDIR header
  view.setUint16(0, 0, true); // Reservado (deve ser 0)
  view.setUint16(2, 1, true); // Tipo de recurso: 1 para ícone (.ICO)
  view.setUint16(4, 1, true); // Quantidade de imagens: 1

  // ICONDIRENTRY (1 imagem)
  const iconWidth = width >= 256 ? 0 : width;
  const iconHeight = height >= 256 ? 0 : height;
  view.setUint8(6, iconWidth);
  view.setUint8(7, iconHeight);
  view.setUint8(8, 0); // Paleta de cores (0 para 256+ cores / RGBA)
  view.setUint8(9, 0); // Reservado
  view.setUint16(10, 1, true); // Planos de cores
  view.setUint16(12, 32, true); // Bits por pixel (32-bit com transparência alfa)
  view.setUint32(14, pngBytes.length, true); // Tamanho dos dados PNG
  view.setUint32(18, icoHeaderSize + icoDirEntrySize, true); // Offset de início dos dados (22 bytes)

  // Copia os bytes do PNG
  const fullBytes = new Uint8Array(icoBuffer);
  fullBytes.set(pngBytes, icoHeaderSize + icoDirEntrySize);

  return new Blob([fullBytes], { type: 'image/x-icon' });
}

/**
 * Constrói um documento PDF 1.4 padrão contendo a imagem em alta fidelidade
 */
async function createPdfFromJpegBlob(
  jpegBlob: Blob,
  width: number,
  height: number
): Promise<Blob> {
  const jpegBuffer = await jpegBlob.arrayBuffer();
  const jpegBytes = new Uint8Array(jpegBuffer);

  // Ajusta a escala proporcional do documento em pontos PDF (72 DPI)
  const maxDim = 800;
  const scale = Math.min(1, maxDim / Math.max(width, height));
  const pdfWidth = Math.round(width * scale);
  const pdfHeight = Math.round(height * scale);

  const header = '%PDF-1.4\n';
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfWidth} ${pdfHeight}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n`;
  const contentStream = `q\n${pdfWidth} 0 0 ${pdfHeight} 0 0 cm\n/Im0 Do\nQ\n`;
  const obj4 = `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`;
  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
  const obj5Footer = '\nendstream\nendobj\n';

  const enc = new TextEncoder();
  const pHeader = enc.encode(header);
  const pObj1 = enc.encode(obj1);
  const pObj2 = enc.encode(obj2);
  const pObj3 = enc.encode(obj3);
  const pObj4 = enc.encode(obj4);
  const pObj5H = enc.encode(obj5Header);
  const pObj5F = enc.encode(obj5Footer);

  const offset1 = pHeader.length;
  const offset2 = offset1 + pObj1.length;
  const offset3 = offset2 + pObj2.length;
  const offset4 = offset3 + pObj3.length;
  const offset5 = offset4 + pObj4.length;
  const startXref = offset5 + pObj5H.length + jpegBytes.length + pObj5F.length;

  const xref = `xref\n0 6\n0000000000 65535 f \n${String(offset1).padStart(10, '0')} 00000 n \n${String(offset2).padStart(10, '0')} 00000 n \n${String(offset3).padStart(10, '0')} 00000 n \n${String(offset4).padStart(10, '0')} 00000 n \n${String(offset5).padStart(10, '0')} 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  const pXref = enc.encode(xref);

  return new Blob([pHeader, pObj1, pObj2, pObj3, pObj4, pObj5H, jpegBytes, pObj5F, pXref], {
    type: 'application/pdf',
  });
}

