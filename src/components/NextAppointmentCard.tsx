import { Calendar, Clock, User, Pencil, X } from "lucide-react";
import type { Appointment } from "@/lib/mockData";

interface Props {
  appointment: Appointment | null;
  onEdit: () => void;
  onCancel: () => void;
}

const NextAppointmentCard = ({ appointment, onEdit, onCancel }: Props) => (
  <div className="card-elevated p-5 mx-5">
    <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.15em] mb-3">Next Appointment</p>
    {appointment ? (
      <>
        <h2 className="text-xl font-bold">{appointment.service.name}</h2>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User size={14} />
            <span>With {appointment.operator.name}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onEdit} className="btn-secondary flex-1 flex items-center justify-center gap-2">
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={onCancel}
            className="btn-secondary flex-1 flex items-center justify-center gap-2 text-destructive"
          >
            <X size={14} /> Cancel
          </button>
        </div>
      </>
    ) : (
      <p className="text-sm text-muted-foreground py-4">No appointment scheduled</p>
    )}
  </div>
);

export default NextAppointmentCard;
