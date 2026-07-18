import { Clock, Code2, Globe, Settings2, Shield, type LucideIcon } from "lucide-react";

export type OptionsTab = "general" | "template" | "domains" | "history" | "about";

export type NavigationItem = {
  id: OptionsTab;
  label: string;
  description: string;
  Icon: LucideIcon;
};

export const OPTIONS_NAVIGATION: NavigationItem[] = [
  {
    id: "general",
    label: "General",
    description: "Automatic renaming, safety, and filename preview.",
    Icon: Settings2,
  },
  {
    id: "template",
    label: "Template",
    description: "Choose the information included in every filename.",
    Icon: Code2,
  },
  {
    id: "domains",
    label: "Domains",
    description: "Create clearer naming rules for familiar websites.",
    Icon: Globe,
  },
  {
    id: "history",
    label: "History",
    description: "Find renamed downloads and their saved locations.",
    Icon: Clock,
  },
  {
    id: "about",
    label: "About",
    description: "Permissions, privacy details, and extension data.",
    Icon: Shield,
  },
];

export function getNavigationItem(tab: OptionsTab): NavigationItem {
  return OPTIONS_NAVIGATION.find((item) => item.id === tab) ?? OPTIONS_NAVIGATION[0];
}
