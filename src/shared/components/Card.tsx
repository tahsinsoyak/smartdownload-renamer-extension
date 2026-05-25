import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ children, className = "" }: CardProps) {
  return <section className={`fine-panel rounded-xl ${className}`}>{children}</section>;
}
