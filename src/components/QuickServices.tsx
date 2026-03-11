import { Scissors, SprayCan, Paintbrush, Wind } from "lucide-react";
import type { Service } from "@/lib/mockData";
import { services } from "@/lib/mockData";

const icons = [Scissors, Scissors, Paintbrush, Wind];

interface Props {
  onSelect: (service: Service) => void;
}

const QuickServices = ({ onSelect }: Props) => (
  <div className="px-5">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-3">Quick Services</p>
    <div className="grid grid-cols-2 gap-3">
      {services.map((s, i) => {
        const Icon = icons[i];
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className="service-chip flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.duration}</p>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export default QuickServices;
