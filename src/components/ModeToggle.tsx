'use client';

import { PlaylistMode } from '@/lib/types';

interface ModeToggleProps {
  mode: PlaylistMode;
  onChange: (mode: PlaylistMode) => void;
  disabled?: boolean;
}

export function ModeToggle({ mode, onChange, disabled = false }: ModeToggleProps) {
  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={() => onChange('mirror')}
        disabled={disabled}
        className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
          mode === 'mirror'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600'
        } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500`}
      >
        <div className="text-sm drop-shadow">🌛 Mirror</div>
        <div className="text-xs mt-1 opacity-90">Match my vibe</div>
      </button>

      <button
        onClick={() => onChange('shift')}
        disabled={disabled}
        className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
          mode === 'shift'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
            : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600'
        } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500`}
      >
        <div className="text-sm drop-shadow">✨ Shift</div>
        <div className="text-xs mt-1 opacity-90">Change my mood</div>
      </button>
    </div>
  );
}
