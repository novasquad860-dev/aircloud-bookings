import { useState, useCallback } from "react";
import { salons as initialSalons } from "@/lib/mockData";
import type { Salon, Service, Appointment } from "@/lib/mockData";
import SalonSelector from "@/components/SalonSelector";
import SalonSearchPanel from "@/components/SalonSearchPanel";
import NextAppointmentCard from "@/components/NextAppointmentCard";
import BookingSheet from "@/components/BookingSheet";
import QuickServices from "@/components/QuickServices";
import ContactSalon from "@/components/ContactSalon";

const Index = () => {
  const [salonsData, setSalonsData] = useState(initialSalons);
  const [activeSalon, setActiveSalon] = useState<Salon>(initialSalons[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const handleSelectSalon = useCallback((salon: Salon) => {
    setActiveSalon(salon);
    setShowSearch(false);
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setSalonsData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  }, []);

  const openBooking = useCallback((service?: Service) => {
    setPreselectedService(service ?? null);
    setShowBooking(true);
  }, []);

  const handleConfirm = useCallback((apt: Appointment) => {
    setAppointment(apt);
    setShowBooking(false);
    setPreselectedService(null);
  }, []);

  return (
    <div className="app-container bg-background pb-12">
      {/* Header */}
      <SalonSelector salon={activeSalon} onTap={() => setShowSearch(true)} />

      {/* Next Appointment */}
      <div className="mt-2">
        <NextAppointmentCard
          appointment={appointment}
          onEdit={() => openBooking(appointment?.service)}
          onCancel={() => setAppointment(null)}
        />
      </div>

      {/* Book Button */}
      <div className="px-5 mt-5">
        <button onClick={() => openBooking()} className="btn-primary w-full">
          Book Appointment
        </button>
      </div>

      {/* Quick Services */}
      <div className="mt-8">
        <QuickServices onSelect={(s) => openBooking(s)} />
      </div>

      {/* Contact */}
      <div className="mt-8">
        <ContactSalon />
      </div>

      {/* Overlays */}
      {showSearch && (
        <SalonSearchPanel
          salons={salonsData}
          onSelect={handleSelectSalon}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setShowSearch(false)}
        />
      )}

      {showBooking && (
        <BookingSheet
          salon={activeSalon}
          preselectedService={preselectedService}
          onClose={() => {
            setShowBooking(false);
            setPreselectedService(null);
          }}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Index;
