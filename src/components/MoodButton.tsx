'use client';

import { MoodEmoji } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MoodButtonProps {
  mood: MoodEmoji;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MoodButton({
  mood,
  isSelected,
  onClick,
  disabled = false,
}: MoodButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-center justify-center p-4 rounded-2xl',
        'transition-all duration-300 ease-out',
        'transform hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected
          ? `bg-gradient-to-br ${mood.bgGradient} ring-2 ring-offset-2 ring-offset-slate-950 ring-${mood.color.split('-')[1]}-400 shadow-lg scale-105`
          : `bg-gradient-to-br ${mood.bgGradient} shadow-md hover:shadow-lg`,
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-400'
      )}
      aria-label={`Select ${mood.label} mood`}
    >
      {/* Pulse animation for selected state */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent animate-pulse" />
      )}

      {/* Emoji */}
      <div className="text-4xl mb-2 drop-shadow-lg">{mood.emoji}</div>

      {/* Label */}
      <div className="text-xs font-bold text-slate-800 text-center drop-shadow">
        {mood.label}
      </div>
    </button>
  );
}
