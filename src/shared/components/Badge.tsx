import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-black uppercase text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
      {children}
    </span>
  );
}
