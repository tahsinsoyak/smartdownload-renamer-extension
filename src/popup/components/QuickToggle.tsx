export function QuickToggle({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Enable smart renaming"
      onClick={() => onChange(!enabled)}
      className="flex h-9 min-w-[72px] cursor-pointer items-center gap-2 rounded-xl border border-white/40 bg-white px-2 text-blue-800 shadow-sm transition-colors hover:bg-blue-50 dark:bg-blue-100"
    >
      <span className={`h-5 w-5 rounded-lg shadow-sm transition-colors ${enabled ? "bg-emerald-500" : "bg-slate-400"}`} />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.08em]">{enabled ? "On" : "Off"}</span>
    </button>
  );
}
