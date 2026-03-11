import { ChevronDown } from "lucide-react";
import type { Salon } from "@/lib/mockData";

interface Props {
  salon: Salon;
  onTap: () => void;
}

const SalonSelector = ({ salon, onTap }: Props) => (
  <button
    onClick={onTap}
    className="w-full flex items-center justify-between px-5 py-4 active:opacity-70 transition-opacity duration-150"
  >
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Salon</p>
      <h1 className="text-lg font-semibold text-foreground mt-0.5">{salon.name}</h1>
    </div>
    <ChevronDown size={20} className="text-muted-foreground" />
  </button>
);

export default SalonSelector;
