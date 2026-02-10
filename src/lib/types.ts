// Mood types and interfaces
export type MoodType = 'joyful' | 'peaceful' | 'melancholy' | 'anxious' | 'energetic' | 'frustrated' | 'nostalgic' | 'drained' | 'loved' | 'mixed';

export type PlaylistMode = 'mirror' | 'shift';
export type ShiftTarget = 'calm' | 'lift' | 'focus' | 'energize';

export interface MoodEmoji {
  id: MoodType;
  label: string;
  emoji: string;
  color: string;
  bgGradient: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  created_at: string;
  mood: MoodType;
  intensity: number; // 1-5
  note: string | null;
  mode: PlaylistMode;
  target: ShiftTarget | null;
  playlist: PlaylistData | null;
}

export interface PlaylistData {
  videoIds: string[];
  titles: string[];
  artists: string[];
  durations: number[];
  thumbnails: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface MoodHistoryEntry {
  date: string;
  mood: MoodType;
  intensity: number;
  note: string | null;
  id: string;
}
