import { Clock, Code2, Globe, Settings2, Shield, type LucideIcon } from "lucide-react";

export type OptionsTab = "general" | "template" | "domains" | "history" | "about";

export type NavigationItem = {
  id: OptionsTab;
  labelKey: string;
  descriptionKey: string;
  Icon: LucideIcon;
};

export const OPTIONS_NAVIGATION: NavigationItem[] = [
  {
    id: "general",
    labelKey: "navigation.general",
    descriptionKey: "navigation.generalDescription",
    Icon: Settings2,
  },
  {
    id: "template",
    labelKey: "navigation.template",
    descriptionKey: "navigation.templateDescription",
    Icon: Code2,
  },
  {
    id: "domains",
    labelKey: "navigation.domains",
    descriptionKey: "navigation.domainsDescription",
    Icon: Globe,
  },
  {
    id: "history",
    labelKey: "navigation.history",
    descriptionKey: "navigation.historyDescription",
    Icon: Clock,
  },
  {
    id: "about",
    labelKey: "navigation.about",
    descriptionKey: "navigation.aboutDescription",
    Icon: Shield,
  },
];

export function getNavigationItem(tab: OptionsTab): NavigationItem {
  return OPTIONS_NAVIGATION.find((item) => item.id === tab) ?? OPTIONS_NAVIGATION[0];
}
