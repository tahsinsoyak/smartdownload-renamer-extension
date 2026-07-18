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
      className={`relative h-7 w-12 cursor-pointer rounded-full border border-transparent shadow-inner transition-colors duration-200 ${
        checked
          ? "bg-blue-600 dark:bg-blue-500"
          : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-[22px] w-[22px] rounded-full bg-white shadow-md transition-[left] duration-200 ${
          checked ? "left-[23px]" : "left-0.5"
        }`}
      />
    </button>
  );
}
