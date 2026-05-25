import type { DateFormat } from "../types/downloads";

const pad = (value: number) => String(value).padStart(2, "0");

export function formatDate(input: string | Date, format: DateFormat = "YYYY-MM-DD"): string {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  if (format === "DD-MM-YYYY") return `${day}-${month}-${year}`;
  if (format === "YYYYMMDD") return `${year}${month}${day}`;
  return `${year}-${month}-${day}`;
}
