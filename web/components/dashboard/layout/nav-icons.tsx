import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
  ChartPie as ChartPieIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  GearSix as GearSixIcon,
} from "@phosphor-icons/react";

export const navIcons = {
  chart: ChartPieIcon,
  clock: ClockIcon,
  calendar: CalendarIcon,
  gear: GearSixIcon,
} satisfies Record<string, Icon>;
