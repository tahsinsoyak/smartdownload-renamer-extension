export type DocumentType =
  | "invoice"
  | "receipt"
  | "certificate"
  | "bank_receipt"
  | "report"
  | "statement"
  | "ticket"
  | "contract"
  | "form"
  | "transcript"
  | "presentation"
  | "image"
  | "archive"
  | "document"
  | "download"
  | "other";

export type DateFormat = "YYYY-MM-DD" | "DD-MM-YYYY" | "YYYYMMDD";

export type NamingSettings = {
  enabled: boolean;
  template: string;
  dateFormat: DateFormat;
  separator: "_" | "-" | " ";
  preserveOriginalName: boolean;
  includeSource: boolean;
  includeType: boolean;
  includeDate: boolean;
  asciiSafeMode: boolean;
  allowTurkishCharacters: boolean;
  maxFilenameLength: number;
  conflictStrategy: "append_number" | "uniquify";
  skipExecutables: boolean;
  skipDescriptiveFilenames: boolean;
  ignoredDomains: string[];
  ignoreKeywords: string[];
};

export type DomainRule = {
  id: string;
  domain: string;
  sourceName: string;
  defaultDocumentType?: DocumentType;
  customTemplate?: string;
  enabled: boolean;
  createdAt: string;
};

export type RenameRecord = {
  id: string;
  originalFilename: string;
  suggestedFilename: string;
  finalFilename?: string;
  sourceDomain?: string;
  sourceName?: string;
  documentType: DocumentType;
  fileExtension: string;
  mime?: string;
  url?: string;
  createdAt: string;
  status: "renamed" | "skipped" | "failed";
  reason?: string;
};

export type FilenameSuggestionInput = {
  originalFilename: string;
  url?: string;
  finalUrl?: string;
  referrer?: string;
  mime?: string;
  fileExtension?: string;
  startTime: string;
  settings: NamingSettings;
  domainRules: DomainRule[];
};

export type FilenameSuggestion = {
  shouldRename: boolean;
  filename: string;
  originalFilename: string;
  sourceDomain?: string;
  sourceName: string;
  documentType: DocumentType;
  fileExtension: string;
  reason?: string;
};
