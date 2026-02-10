import axios from 'axios';
import { Song } from './types';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

if (!YOUTUBE_API_KEY) {
  console.warn('YouTube API key not configured');
}

export async function searchYouTubeMusic(query: string, maxResults: number = 12): Promise<Song[]> {
  try {
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key not configured');
      return [];
    }

    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        q: query,
        type: 'video',
        part: 'snippet',
        maxResults,
        key: YOUTUBE_API_KEY,
        videoCategoryId: '10', // Music category
      },
    });

    const songs: Song[] = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: 0, // We'd need to fetch this separately with videos.list
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    return songs;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return [];
  }
}

export async function fetchVideoDetails(videoId: string) {
  try {
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key not configured');
      return null;
    }

    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        id: videoId,
        part: 'contentDetails,snippet',
        key: YOUTUBE_API_KEY,
      },
    });

    if (response.data.items.length === 0) {
      return null;
    }

    const item = response.data.items[0];
    const duration = parseISO8601Duration(item.contentDetails.duration);

    return {
      id: videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration,
      thumbnail: item.snippet.thumbnails.high.url,
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

function parseISO8601Duration(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) return 0;

  const hours = parseInt(matches[1] || '0', 10);
  const minutes = parseInt(matches[2] || '0', 10);
  const seconds = parseInt(matches[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
