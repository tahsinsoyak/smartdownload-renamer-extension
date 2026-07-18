import type { SelectHTMLAttributes } from "react";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full cursor-pointer rounded-xl border border-[#cbd7e8] bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors hover:border-slate-400 focus:border-blue-500 focus:shadow-ring dark:border-[#2a3c59] dark:bg-[#0a1729] dark:text-white dark:hover:border-slate-500 dark:focus:border-blue-400 ${props.className ?? ""}`}
    />
  );
}
