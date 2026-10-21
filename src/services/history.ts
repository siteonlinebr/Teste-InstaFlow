import { DownloadHistoryItem, InstagramPostData } from '../types/instagram.ts';

const STORAGE_KEY = 'instaflow_download_history_v1';
const MAX_HISTORY_ITEMS = 25;

export function getHistory(): DownloadHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    if (Array.isArray(items)) {
      return items;
    }
    return [];
  } catch (err) {
    console.error('Falha ao ler histórico do localStorage:', err);
    return [];
  }
}

export function saveHistoryItem(
  postData: InstagramPostData,
  downloadFormat: 'mp4' | 'mp3' | 'jpg'
): DownloadHistoryItem[] {
  try {
    const current = getHistory();
    // Evita duplicatas consecutivas imediatas
    const filtered = current.filter(
      (item) => item.postData.shortcode !== postData.shortcode || item.downloadFormat !== downloadFormat
    );

    const newItem: DownloadHistoryItem = {
      id: `${postData.shortcode}_${downloadFormat}_${Date.now()}`,
      timestamp: Date.now(),
      postData,
      downloadFormat,
    };

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Falha ao salvar item no histórico:', err);
    return getHistory();
  }
}

export function removeHistoryItem(id: string): DownloadHistoryItem[] {
  try {
    const current = getHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Falha ao remover item do histórico:', err);
    return getHistory();
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Falha ao limpar histórico:', err);
  }
}
