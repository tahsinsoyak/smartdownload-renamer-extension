import type { DocumentType } from "../types/downloads";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  invoice: "Invoice",
  receipt: "Receipt",
  certificate: "Certificate",
  bank_receipt: "Receipt",
  report: "Report",
  statement: "Statement",
  ticket: "Ticket",
  contract: "Contract",
  form: "Form",
  transcript: "Transcript",
  presentation: "Presentation",
  image: "Image",
  archive: "Archive",
  document: "Document",
  download: "Download",
  other: "Other"
};

export const DOCUMENT_TYPE_KEYWORDS: Record<DocumentType, string[]> = {
  invoice: ["invoice", "fatura", "billing", "bill"],
  receipt: ["receipt", "makbuz", "payment", "paid"],
  certificate: ["certificate", "sertifika", "completion", "diploma"],
  bank_receipt: ["dekont", "transaction", "transfer", "eft", "havale"],
  report: ["report", "rapor", "analysis", "summary"],
  statement: ["statement", "hesap-ozeti", "extract"],
  ticket: ["ticket", "bilet", "boarding", "reservation"],
  contract: ["contract", "agreement", "sozlesme", "sözleşme"],
  form: ["form", "application", "basvuru", "başvuru"],
  transcript: ["transcript", "not-dokumu", "not dökümü", "grade", "academic"],
  presentation: ["presentation", "slides", "sunum", "deck"],
  image: ["image", "photo", "picture", "screenshot"],
  archive: ["archive", "backup", "bundle"],
  document: ["document", "doc", "paper"],
  download: ["download", "attachment"],
  other: []
};

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif", "svg"];
export const ARCHIVE_EXTENSIONS = ["zip", "rar", "7z", "tar", "gz"];
export const PRESENTATION_EXTENSIONS = ["ppt", "pptx", "key"];
export const DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx", "txt", "rtf", "odt"];
export const SPREADSHEET_EXTENSIONS = ["xls", "xlsx", "csv", "tsv"];
export const EXECUTABLE_EXTENSIONS = ["exe", "msi", "bat", "cmd", "ps1", "sh", "app", "dmg", "pkg"];

export const GENERIC_BASENAMES = [
  "document",
  "download",
  "file",
  "invoice",
  "receipt",
  "attachment",
  "unknown",
  "export",
  "report",
  "data",
  "scan",
  "image",
  "default",
  "unnamed"
];
