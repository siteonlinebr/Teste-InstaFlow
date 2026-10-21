export type MediaType = 'video' | 'image';
export type InstagramContentType = 'reel' | 'post' | 'story' | 'carousel';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  duration?: number; // seconds
  quality?: string;
  formattedSize?: string;
}

export interface InstagramAuthor {
  username: string;
  fullName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface InstagramPostData {
  id: string;
  shortcode: string;
  originalUrl: string;
  type: InstagramContentType;
  caption: string;
  author: InstagramAuthor;
  mediaList: MediaItem[];
  audioTitle?: string;
  audioArtist?: string;
  audioUrl?: string;
  likeCount?: number;
  commentCount?: number;
  publishedAt?: string;
  isDemo?: boolean;
}

export interface DownloadHistoryItem {
  id: string;
  timestamp: number;
  postData: InstagramPostData;
  downloadFormat: 'mp4' | 'mp3' | 'jpg';
}

export interface ExtractionResponse {
  success: boolean;
  data?: InstagramPostData;
  error?: string;
  fallbackReason?: string;
}
