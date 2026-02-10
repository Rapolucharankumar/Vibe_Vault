'use client';

import { Song } from '@/lib/types';
import { formatDuration } from '@/lib/music';
import Image from 'next/image';

interface PlaylistCardProps {
  song: Song;
  isPlaying?: boolean;
  onPlay?: () => void;
  onSave?: () => void;
}

export function PlaylistCard({
  song,
  isPlaying = false,
  onPlay,
  onSave,
}: PlaylistCardProps) {
  return (
    <div
      className={`flex-shrink-0 w-48 rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-xl ${
        isPlaying ? 'ring-2 ring-pink-500 shadow-lg' : 'shadow-md'
      }`}
    >
      <div className="relative bg-slate-800 aspect-square">
        {song.thumbnail ? (
          <Image
            src={song.thumbnail}
            alt={song.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-4xl">🎵</span>
          </div>
        )}

        {/* Play button overlay */}
        {onPlay && (
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
          >
            <div className="bg-pink-500 rounded-full p-3 transform hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-pink-400 rounded-full animate-pulse"
                  style={{
                    height: `${8 + i * 4}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Song info */}
      <div className="bg-slate-800 p-3 space-y-1 border-t border-slate-700">
        <div className="font-semibold text-white text-sm line-clamp-2 drop-shadow">
          {song.title}
        </div>
        <div className="text-xs text-slate-200 line-clamp-1">
          {song.artist}
        </div>
        <div className="text-xs text-slate-300 font-medium">
          {formatDuration(song.duration || 0)}
        </div>
      </div>

      {/* Save button */}
      {onSave && (
        <button
          onClick={onSave}
          className="w-full bg-slate-800 hover:bg-slate-700 text-pink-400 py-2 text-xs font-semibold transition-colors"
        >
          Save this vibe
        </button>
      )}
    </div>
  );
}
