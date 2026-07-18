type LogoIconProps = {
  size?: number;
  inverted?: boolean;
};

export function LogoIcon({ size = 36, inverted = false }: LogoIconProps) {
  const background = inverted ? "#FFFFFF" : "#2563EB";
  const page = inverted ? "#2563EB" : "#FFFFFF";
  const detail = inverted ? "#FFFFFF" : "#2563EB";

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
      <path d="M38 25h35l19 19v59H38z" fill={page} />
      <path d="M73 25v19h19" fill="none" stroke={detail} strokeWidth="5" strokeLinejoin="round" />
      <path
        d="M65 43v32m-13-12 13 13 13-13"
        fill="none"
        stroke={detail}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M50 91h30" fill="none" stroke={detail} strokeWidth="6" strokeLinecap="round" />
      <circle cx="103" cy="27" r="8" fill="#FBBF24" stroke={background} strokeWidth="4" />
    </svg>
  );
}
