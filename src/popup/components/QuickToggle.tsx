import { Switch } from "../../shared/components/Switch";

export function QuickToggle({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) {
  return <Switch checked={enabled} onChange={onChange} label="Enable smart renaming" />;
}
