import { MoodEmoji, MoodType } from './types';

export const MOODS: Record<MoodType, MoodEmoji> = {
  joyful: {
    id: 'joyful',
    label: 'Joyful',
    emoji: '😊',
    color: 'from-yellow-300 to-orange-300',
    bgGradient: 'from-yellow-100 to-orange-100',
  },
  peaceful: {
    id: 'peaceful',
    label: 'Peaceful',
    emoji: '😌',
    color: 'from-blue-300 to-cyan-300',
    bgGradient: 'from-blue-100 to-cyan-100',
  },
  melancholy: {
    id: 'melancholy',
    label: 'Melancholy',
    emoji: '😢',
    color: 'from-purple-400 to-blue-400',
    bgGradient: 'from-purple-100 to-blue-100',
  },
  anxious: {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😟',
    color: 'from-red-300 to-pink-300',
    bgGradient: 'from-red-100 to-pink-100',
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic',
    emoji: '🔥',
    color: 'from-orange-400 to-red-400',
    bgGradient: 'from-orange-100 to-red-100',
  },
  frustrated: {
    id: 'frustrated',
    label: 'Frustrated',
    emoji: '😠',
    color: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-100 to-pink-100',
  },
  nostalgic: {
    id: 'nostalgic',
    label: 'Nostalgic',
    emoji: '🌙',
    color: 'from-indigo-400 to-purple-400',
    bgGradient: 'from-indigo-100 to-purple-100',
  },
  drained: {
    id: 'drained',
    label: 'Drained',
    emoji: '😴',
    color: 'from-gray-400 to-slate-400',
    bgGradient: 'from-gray-100 to-slate-100',
  },
  loved: {
    id: 'loved',
    label: 'Loved',
    emoji: '🥰',
    color: 'from-pink-300 to-rose-300',
    bgGradient: 'from-pink-100 to-rose-100',
  },
  mixed: {
    id: 'mixed',
    label: 'Mixed / Other',
    emoji: '🤍',
    color: 'from-white to-gray-200',
    bgGradient: 'from-white to-gray-100',
  },
};

// Mood-to-music mapping for search queries
export const MOOD_MUSIC_MAPPING: Record<MoodType, Record<string, string>> = {
  joyful: {
    mirror: 'happy upbeat pop indie cheerful',
    calm: 'calm lo-fi chill',
    lift: 'joyful pop uplifting',
    focus: 'focus lo-fi study beats',
    energize: 'edm dance energetic',
  },
  peaceful: {
    mirror: 'ambient chill lo-fi relaxing',
    calm: 'deeper ambient nature',
    lift: 'soft acoustic happy',
    focus: 'calm piano focus',
    energize: 'light indie upbeat',
  },
  melancholy: {
    mirror: 'sad acoustic melancholic rainy',
    calm: 'gentle piano healing',
    lift: 'warm indie folk hopeful',
    focus: 'soft lo-fi reflection',
    energize: 'mid-tempo indie rock',
  },
  anxious: {
    mirror: 'anxious tense cinematic dark ambient',
    calm: 'very calm meditation',
    lift: 'comforting acoustic',
    focus: 'steady lo-fi concentration',
    energize: 'motivational cinematic',
  },
  energetic: {
    mirror: 'workout edm electronic hype',
    calm: 'calm down chill',
    lift: 'high energy pop',
    focus: 'intense focus electronic',
    energize: 'hardcore gym trap',
  },
  frustrated: {
    mirror: 'angry intense rock metal',
    calm: 'calming down ambient',
    lift: 'empowering rock',
    focus: 'aggressive focus beats',
    energize: 'hype trap rage',
  },
  nostalgic: {
    mirror: 'nostalgic 80s 90s retro indie',
    calm: 'soft vintage lo-fi',
    lift: 'uplifting throwback',
    focus: 'chill retro study',
    energize: 'energetic 2000s pop',
  },
  drained: {
    mirror: 'tired sleepy lo-fi slow',
    calm: 'deep rest sleep',
    lift: 'gentle uplifting acoustic',
    focus: 'minimal focus ambient',
    energize: 'slow build motivational',
  },
  loved: {
    mirror: 'romantic r&b love soul warm',
    calm: 'intimate chill',
    lift: 'joyful love songs',
    focus: 'soft focus r&b',
    energize: 'romantic upbeat',
  },
  mixed: {
    mirror: 'emotional indie alternative mixed feelings',
    calm: 'balanced calm',
    lift: 'hopeful emotional',
    focus: 'introspective beats',
    energize: 'dynamic indie rock',
  },
};

export const SHIFT_TARGETS = [
  { id: 'calm', label: 'Calm Me', icon: '😌' },
  { id: 'lift', label: 'Lift Me', icon: '✨' },
  { id: 'focus', label: 'Focus Me', icon: '🎯' },
  { id: 'energize', label: 'Energize Me', icon: '⚡' },
];

export const INTENSITY_LABELS = {
  1: 'Subtle',
  2: 'Light',
  3: 'Moderate',
  4: 'Strong',
  5: 'Intense',
};
