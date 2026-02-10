'use client';

import { ShiftTarget } from '@/lib/types';
import { SHIFT_TARGETS } from '@/lib/constants';

interface ShiftTargetSelectorProps {
  target: ShiftTarget | null;
  onChange: (target: ShiftTarget) => void;
  disabled?: boolean;
}

export function ShiftTargetSelector({
  target,
  onChange,
  disabled = false,
}: ShiftTargetSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-white drop-shadow">
        How would you like to feel?
      </label>
      <div className="grid grid-cols-2 gap-2">
        {SHIFT_TARGETS.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id as ShiftTarget)}
            disabled={disabled}
            className={`py-2 px-3 rounded-lg transition-all text-sm font-bold ${
              target === t.id
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600'
            } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <span className="mr-2">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
