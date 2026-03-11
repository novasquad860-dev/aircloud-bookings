import { Phone, MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

const actions = [
  { icon: Phone, label: "Call", action: () => toast("Opening phone...") },
  { icon: MessageCircle, label: "WhatsApp", action: () => toast("Opening WhatsApp...") },
  { icon: MapPin, label: "Directions", action: () => toast("Opening maps...") },
];

const ContactSalon = () => (
  <div className="px-5">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-3">Contact</p>
    <div className="flex justify-center gap-6">
      {actions.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          onClick={action}
          className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-150"
        >
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <Icon size={22} className="text-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default ContactSalon;
