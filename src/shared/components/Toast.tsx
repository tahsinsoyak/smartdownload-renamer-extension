export function Toast({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="fixed bottom-4 left-4 right-4 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-glow dark:bg-white dark:text-slate-950">{message}</div>;
}
