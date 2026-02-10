'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useMoodStore } from '@/stores/moodStore';
import { MOODS } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function JournalPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { entries, fetchUserEntries, isLoading } = useMoodStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserEntries();
    }
  }, [user, fetchUserEntries]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow">Your Vibes</h1>
            <p className="text-sm text-slate-200">History & memories</p>
          </div>
          <Link
            href="/home"
            className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-slate-700 transition-colors bg-slate-800"
          >
            Add Vibe
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-12">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
            <p className="text-slate-300">Loading your vibes...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📔</div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              No vibes yet
            </h3>
            <p className="text-slate-400 mb-6">
              Start capturing your moods to see them here
            </p>
            <Link
              href="/home"
              className="inline-block px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Add Your First Vibe
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const moodData = MOODS[entry.mood as keyof typeof MOODS];
              const isExpanded = expandedId === entry.id;

              return (
                <div
                  key={entry.id}
                  className="rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                >
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : entry.id)
                    }
                    className="w-full p-4 text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Mood Emoji */}
                      <div className="flex-shrink-0 text-4xl drop-shadow-lg">
                        {moodData?.emoji}
                      </div>

                      {/* Entry Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-lg drop-shadow">
                            {moodData?.label}
                          </span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < entry.intensity
                                    ? 'opacity-100 text-red-400'
                                    : 'opacity-30 text-slate-500'
                                }`}
                              >
                                ♡
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 mt-1 font-medium">
                          {formatDistanceToNow(new Date(entry.created_at), {
                            addSuffix: true,
                          })}
                        </p>

                        {entry.note && (
                          <p className="text-sm text-slate-200 mt-2 line-clamp-2 font-medium">
                            {entry.note}
                          </p>
                        )}
                      </div>

                      {/* Chevron */}
                      <div className="text-slate-300 font-bold text-xl">
                        {isExpanded ? '▼' : '▶'}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 bg-white/2 space-y-4">
                      {entry.note && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200 mb-2">
                            Note
                          </h4>
                          <p className="text-sm text-slate-300">
                            {entry.note}
                          </p>
                        </div>
                      )}

                      {entry.mode && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200 mb-2">
                            Music Mode
                          </h4>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">
                              {entry.mode === 'mirror' ? '🎵 Mirror' : '✨ Shift'}
                            </span>
                            {entry.target && (
                              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-300">
                                {entry.target}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {entry.playlist?.videoIds && entry.playlist.videoIds.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200 mb-2">
                            Playlist ({entry.playlist.videoIds.length} songs)
                          </h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {entry.playlist?.videoIds?.map((videoId, idx) => (
                              <a
                                key={videoId}
                                href={`https://youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 rounded bg-white/5 hover:bg-white/10 transition-colors text-xs"
                              >
                                <div className="font-semibold text-slate-200 line-clamp-1">
                                  {entry.playlist?.titles?.[idx] ?? 'Loading...'}
                                </div>
                                <div className="text-slate-400 line-clamp-1">
                                  {entry.playlist?.artists?.[idx] ?? 'Unknown artist'}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        {entry.playlist?.videoIds?.[0] && (
                          <a
                            href={`https://youtube.com/watch?v=${entry.playlist.videoIds[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-3 py-2 rounded-lg text-sm font-semibold text-pink-300 hover:bg-pink-500/20 transition-colors"
                          >
                            ▶ Replay This Vibe
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
