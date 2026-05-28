type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 rounded-full transition-all duration-200 ${
        checked
          ? "bg-teal-500 dark:bg-teal-400"
          : "bg-[#d4d4d4] dark:bg-[#444444]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
          checked ? "left-[19px]" : "left-0.5"
        }`}
      />
    </button>
  );
}
