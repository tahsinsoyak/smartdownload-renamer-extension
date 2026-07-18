import type { SelectHTMLAttributes } from "react";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full cursor-pointer rounded-lg border border-[#ccd7e7] bg-white px-3 py-2 text-sm text-ink outline-none transition-colors hover:border-slate-400 focus:border-blue-500 focus:shadow-ring dark:border-lift dark:bg-[#0d1a2e] dark:text-white dark:hover:border-slate-500 dark:focus:border-blue-400 ${props.className ?? ""}`}
    />
  );
}
