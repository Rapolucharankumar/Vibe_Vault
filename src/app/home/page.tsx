'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useMoodStore } from '@/stores/moodStore';
import { MoodType, PlaylistMode, ShiftTarget, PlaylistData } from '@/lib/types';
import { MOODS, MOOD_MUSIC_MAPPING } from '@/lib/constants';
import { searchYouTubeMusic } from '@/lib/music';
import { MoodButton } from '@/components/MoodButton';
import { IntensitySlider } from '@/components/IntensitySlider';
import { JournalInput } from '@/components/JournalInput';
import { ModeToggle } from '@/components/ModeToggle';
import { ShiftTargetSelector } from '@/components/ShiftTargetSelector';
import { PlaylistCard } from '@/components/PlaylistCard';
import { YouTubePlayer } from '@/components/YouTubePlayer';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { addMoodEntry, isLoading: moodLoading } = useMoodStore();

  // Form state
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [mode, setMode] = useState<PlaylistMode>('mirror');
  const [shiftTarget, setShiftTarget] = useState<ShiftTarget | null>(null);

  // Playlist state
  const [playlist, setPlaylist] = useState<PlaylistData | null>(null);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Generate playlist when mood is selected
  useEffect(() => {
    if (selectedMood) {
      generatePlaylist();
    }
  }, [selectedMood, mode, shiftTarget]);

  async function generatePlaylist() {
    if (!selectedMood) return;

    setPlaylistLoading(true);
    try {
      const searchQuery =
        mode === 'mirror'
          ? MOOD_MUSIC_MAPPING[selectedMood].mirror
          : shiftTarget
          ? MOOD_MUSIC_MAPPING[selectedMood][shiftTarget as 'mirror' | 'calm' | 'lift' | 'focus' | 'energize']
          : MOOD_MUSIC_MAPPING[selectedMood].mirror;

      const songs = await searchYouTubeMusic(searchQuery, 12);

      if (songs.length > 0) {
        setPlaylist({
          videoIds: songs.map((s) => s.id),
          titles: songs.map((s) => s.title),
          artists: songs.map((s) => s.artist),
          durations: songs.map((s) => s.duration),
          thumbnails: songs.map((s) => s.thumbnail),
        });
        setCurrentPlayingIndex(0);
        setShowPlaylist(true);
      }
    } catch (error) {
      console.error('Error generating playlist:', error);
    } finally {
      setPlaylistLoading(false);
    }
  }

  async function handleSaveMood() {
    if (!selectedMood) return;

    try {
      await addMoodEntry(
        selectedMood,
        intensity,
        note || null,
        mode,
        mode === 'shift' ? shiftTarget : null,
        playlist
      );

      // Reset form
      setSelectedMood(null);
      setIntensity(3);
      setNote('');
      setMode('mirror');
      setShiftTarget(null);
      setPlaylist(null);
      setShowPlaylist(false);

      // Show success message
      alert('Vibe saved! ✨');
    } catch (error) {
      console.error('Error saving mood:', error);
      alert('Failed to save vibe. Try again!');
    }
  }

  const moodEmoji = selectedMood ? MOODS[selectedMood] : null;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
          <p className="text-slate-300">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        moodEmoji
          ? `bg-gradient-to-br ${moodEmoji.bgGradient}`
          : 'bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950'
      }`}
    >
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow">VibeVault</h1>
            <p className="text-sm text-slate-200">What's your vibe today?</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/journal"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-slate-700 transition-colors bg-slate-800"
            >
              Journal
            </Link>
            <Link
              href="/settings"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-slate-700 transition-colors bg-slate-800"
            >
              ⚙️
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-12">
        {/* Mood Selection */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 drop-shadow">How are you feeling?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.values(MOODS).map((mood) => (
              <MoodButton
                key={mood.id}
                mood={mood}
                isSelected={selectedMood === mood.id}
                onClick={() => setSelectedMood(mood.id)}
                disabled={moodLoading}
              />
            ))}
          </div>
        </section>

        {selectedMood && (
          <>
            {/* Intensity Slider */}
            <section className="mb-8 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <IntensitySlider value={intensity} onChange={setIntensity} disabled={moodLoading} />
            </section>

            {/* Journal Input */}
            <section className="mb-8 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <JournalInput value={note} onChange={setNote} disabled={moodLoading} />
            </section>

            {/* Mode Toggle */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Music Mode</h3>
              <ModeToggle mode={mode} onChange={setMode} disabled={moodLoading} />
            </section>

            {/* Shift Target Selector */}
            {mode === 'shift' && (
              <section className="mb-8 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <ShiftTargetSelector
                  target={shiftTarget}
                  onChange={setShiftTarget}
                  disabled={moodLoading}
                />
              </section>
            )}

            {/* Playlist */}
            {showPlaylist && playlist && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  {mode === 'mirror'
                    ? 'Songs that match your mood'
                    : `Songs to help you ${shiftTarget}`}
                </h3>

                {/* Now Playing */}
                {playlist.videoIds[currentPlayingIndex] && (
                  <div className="mb-6">
                    <YouTubePlayer
                      videoId={playlist.videoIds[currentPlayingIndex]}
                      title={playlist.titles[currentPlayingIndex]}
                      autoplay={true}
                    />
                  </div>
                )}

                {/* Playlist Cards */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex gap-4">
                    {playlist.videoIds.map((videoId, index) => (
                      <PlaylistCard
                        key={videoId}
                        song={{
                          id: videoId,
                          title: playlist.titles[index],
                          artist: playlist.artists[index],
                          duration: playlist.durations[index],
                          thumbnail: playlist.thumbnails[index],
                        }}
                        isPlaying={currentPlayingIndex === index}
                        onPlay={() => setCurrentPlayingIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Save Button */}
            <section className="mb-8">
              <button
                onClick={handleSaveMood}
                disabled={moodLoading || !playlist}
                className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {moodLoading ? 'Saving...' : 'Save This Vibe ✨'}
              </button>
            </section>
          </>
        )}

        {/* Empty State */}
        {!selectedMood && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              Start capturing your vibes
            </h3>
            <p className="text-slate-400">
              Your first mood is waiting. Choose how you're feeling to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
