import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-teal-500 focus:shadow-ring dark:border-lift dark:bg-panel dark:text-white dark:focus:border-teal-400 ${props.className ?? ""}`}
    />
  );
}
