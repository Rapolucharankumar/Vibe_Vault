'use client';

import { INTENSITY_LABELS } from '@/lib/constants';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function IntensitySlider({
  value,
  onChange,
  disabled = false,
}: IntensitySliderProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-white drop-shadow">
          Intensity
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i <= value ? 'bg-red-400 shadow-md' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-pink-500"
        style={{
          background: `linear-gradient(to right, rgb(71, 85, 105) 0%, rgb(244, 63, 94) ${
            ((value - 1) / 4) * 100
          }%, rgb(71, 85, 105) ${((value - 1) / 4) * 100}%, rgb(71, 85, 105) 100%)`,
        }}
      />

      <div className="text-xs text-slate-200 text-center font-bold drop-shadow">
        {INTENSITY_LABELS[value as keyof typeof INTENSITY_LABELS]}
      </div>
    </div>
  );
}
