import { create } from 'zustand';
import { MoodEntry, MoodType, PlaylistMode, ShiftTarget, PlaylistData } from '@/lib/types';
import { supabase } from '@/lib/supabase';

interface MoodStore {
  entries: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  
  addMoodEntry: (
    mood: MoodType,
    intensity: number,
    note: string | null,
    mode: PlaylistMode,
    target: ShiftTarget | null,
    playlist: PlaylistData | null
  ) => Promise<void>;
  
  fetchUserEntries: () => Promise<void>;
  clearError: () => void;
}

export const useMoodStore = create<MoodStore>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,

  addMoodEntry: async (
    mood: MoodType,
    intensity: number,
    note: string | null,
    mode: PlaylistMode,
    target: ShiftTarget | null,
    playlist: PlaylistData | null
  ) => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('mood_entries')
        .insert([
          {
            user_id: user.id,
            mood,
            intensity,
            note,
            mode,
            target,
            playlist,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        set((state) => ({
          entries: [data[0] as MoodEntry, ...state.entries],
        }));
      }
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ entries: data as MoodEntry[] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
