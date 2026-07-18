type LogoIconProps = {
  size?: number;
  inverted?: boolean;
};

export function LogoIcon({ size = 36, inverted = false }: LogoIconProps) {
  const background = inverted ? "#FFFFFF" : "#2563EB";
  const page = inverted ? "#2563EB" : "#FFFFFF";
  const detail = inverted ? "#FFFFFF" : "#2563EB";
  const fold = inverted ? "#DBEAFE" : "#BFDBFE";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 128 128"
      style={{ display: "block", flexShrink: 0 }}
      role="img"
      aria-label="Smart Download Renamer"
    >
      <rect x="4" y="4" width="120" height="120" rx="30" fill={background} />
      <path d="M32 22h43l21 21v63H32V22Z" fill={page} />
      <path d="M75 22v21h21L75 22Z" fill={fold} />
      <path d="M56 43h16v25h12L64 90 44 68h12V43Z" fill={detail} />
      <path d="m103 14 3.4 8.6L115 26l-8.6 3.4L103 38l-3.4-8.6L91 26l8.6-3.4L103 14Z" fill="#FBBF24" />
      <path d="m22 78 2.2 5.8L30 86l-5.8 2.2L22 94l-2.2-5.8L14 86l5.8-2.2L22 78Z" fill={inverted ? "#93C5FD" : "#BFDBFE"} />
    </svg>
  );
}
