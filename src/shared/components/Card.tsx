import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-border-light bg-surface shadow-card dark:border-lift dark:bg-panel ${className}`}>
      {children}
    </div>
  );
}
