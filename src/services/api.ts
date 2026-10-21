import { ExtractionResponse, InstagramPostData } from '../types/instagram.ts';

export async function extractInstagramMedia(url: string): Promise<ExtractionResponse> {
  try {
    const res = await fetch('/api/instagram/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Não foi possível conectar ao servidor de extração.',
    };
  }
}

export function buildDownloadProxyUrl(
  mediaUrl: string,
  filename: string,
  type: 'video' | 'audio' | 'image' = 'video'
): string {
  const params = new URLSearchParams({
    url: mediaUrl,
    filename,
    type,
  });
  return `/api/download?${params.toString()}`;
}

export function triggerDirectDownload(
  mediaUrl: string,
  filename: string,
  type: 'video' | 'audio' | 'image' = 'video'
): void {
  const downloadUrl = buildDownloadProxyUrl(mediaUrl, filename, type);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export interface PresetSummary {
  key: string;
  title: string;
  type: string;
  author: string;
  thumbnailUrl: string;
  url: string;
}

export async function fetchPresets(): Promise<PresetSummary[]> {
  try {
    const res = await fetch('/api/presets');
    if (!res.ok) return [];
    const json = await res.json();
    return json.presets || [];
  } catch {
    return [];
  }
}
