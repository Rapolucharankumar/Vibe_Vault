'use client';

interface JournalInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export function JournalInput({
  value,
  onChange,
  placeholder = "Tell me more… what's weighing on you / lighting you up?",
  disabled = false,
  maxLength = 150,
}: JournalInputProps) {
  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-bold text-white drop-shadow">Notes</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-600 text-white placeholder-slate-400 resize-none focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
        rows={3}
      />
      <div className="text-xs text-slate-300 text-right font-semibold">
        {value.length} / {maxLength}
      </div>
    </div>
  );
}
