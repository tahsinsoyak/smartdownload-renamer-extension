import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#cbd7e8] bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:shadow-ring dark:border-[#2a3c59] dark:bg-[#0a1729] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus:border-blue-400 ${props.className ?? ""}`}
    />
  );
}
