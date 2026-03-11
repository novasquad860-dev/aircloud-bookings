import { useState, useEffect, useCallback } from "react";
import { X, Check, ChevronLeft } from "lucide-react";
import { services, operators, generateTimeSlots } from "@/lib/mockData";
import type { Service, Operator, TimeSlot, Appointment, Salon } from "@/lib/mockData";

interface Props {
  salon: Salon;
  preselectedService?: Service | null;
  onClose: () => void;
  onConfirm: (appointment: Appointment) => void;
}

const BookingSheet = ({ salon, preselectedService, onClose, onConfirm }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(preselectedService ?? null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (preselectedService) setStep(2);
  }, [preselectedService]);

  useEffect(() => {
    if (selectedService) {
      setTimeSlots(generateTimeSlots(selectedService.durationMinutes));
    }
  }, [selectedService]);

  const handleConfirm = useCallback(() => {
    if (!selectedService || !selectedOperator || !selectedTime) return;
    setConfirmed(true);
    // vibration feedback
    if (navigator.vibrate) navigator.vibrate(50);
    const appointment: Appointment = {
      service: selectedService,
      operator: selectedOperator,
      date: "Saturday 22 March",
      time: selectedTime,
      salon,
    };
    setTimeout(() => onConfirm(appointment), 1500);
  }, [selectedService, selectedOperator, selectedTime, salon, onConfirm]);

  const title = step === 1 ? "Select Service" : step === 2 ? "Select Operator" : "Select Time";

  if (confirmed) {
    return (
      <>
        <div className="overlay-backdrop animate-fade-in" />
        <div className="bottom-sheet animate-slide-up p-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center animate-scale-check">
            <Check size={40} className="text-success-foreground" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold mt-6">Appointment Confirmed</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {selectedService?.name} · {selectedTime}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="overlay-backdrop animate-fade-in" onClick={onClose} />
      <div className="bottom-sheet animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="p-1 -ml-1 active:opacity-60 transition-opacity"
              >
                <ChevronLeft size={20} className="text-muted-foreground" />
              </button>
            )}
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 active:opacity-60 transition-opacity">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-1.5 px-5 pb-5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-150 ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="px-5 pb-8 max-h-[50vh] overflow-y-auto">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedService(s);
                    setStep(2);
                  }}
                  className={`service-chip text-left ${
                    selectedService?.id === s.id ? "service-chip-selected" : ""
                  }`}
                >
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.duration}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => {
                    setSelectedOperator(op);
                    setStep(3);
                  }}
                  className={`service-chip w-full text-left ${
                    selectedOperator?.id === op.id ? "service-chip-selected" : ""
                  }`}
                >
                  <p className="font-semibold text-sm">{op.name}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots
                  .filter((t) => t.available)
                  .map((t) => (
                    <button
                      key={t.time}
                      onClick={() => setSelectedTime(t.time)}
                      className={`time-slot ${selectedTime === t.time ? "time-slot-selected" : ""}`}
                    >
                      {t.time}
                    </button>
                  ))}
              </div>
              {selectedTime && (
                <button onClick={handleConfirm} className="btn-primary w-full mt-6">
                  Confirm Booking
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingSheet;
