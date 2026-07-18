import { Heart } from "lucide-react";
import { SUPPORT_URL } from "../../shared/constants/links";
import { OPTIONS_NAVIGATION, type OptionsTab } from "../navigation";

type OptionsNavigationProps = {
  activeTab: OptionsTab;
  historyCount: number;
  onSelect: (tab: OptionsTab) => void;
};

function HistoryBadge({ active, count }: { active: boolean; count: number }) {
  if (count === 0) return null;

  return (
    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${active ? "bg-white/20 text-white dark:bg-white/90 dark:text-blue-800" : "bg-slate-200 text-slate-600 dark:bg-[#23324a] dark:text-slate-300"}`}>
      {count}
    </span>
  );
}

export function OptionsNavigation({ activeTab, historyCount, onSelect }: OptionsNavigationProps) {
  return (
    <>
      <div className="-mx-4 mb-6 flex overflow-x-auto border-b border-[#d7e0ee] px-4 dark:border-[#263854] md:hidden">
        {OPTIONS_NAVIGATION.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-3.5 pb-3.5 text-[13px] font-semibold transition-colors ${active ? "border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300" : "border-transparent text-muted-dark hover:text-ink dark:text-slate-400 dark:hover:text-white"}`}
            >
              <Icon size={15} />
              {label}
              {id === "history" && <HistoryBadge active={active} count={historyCount} />}
            </button>
          );
        })}
      </div>

      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="sticky top-[88px] rounded-2xl border border-border-light bg-white p-2.5 shadow-card dark:border-[#263854] dark:bg-panel">
          <p className="px-3 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Settings</p>
          <div className="space-y-1">
            {OPTIONS_NAVIGATION.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${active ? "bg-blue-600 font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.18)] dark:bg-blue-500 dark:text-[#07111f]" : "font-semibold text-muted-dark hover:bg-blue-50 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-[#172842] dark:hover:text-blue-300"}`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                  {id === "history" && <HistoryBadge active={active} count={historyCount} />}
                </button>
              );
            })}
          </div>
          <div className="mt-3 border-t border-border-light pt-2 dark:border-[#263854]">
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-muted-dark transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
            >
              <Heart size={16} className="shrink-0 text-rose-400" />
              Support
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
