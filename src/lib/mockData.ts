export interface Salon {
  id: string;
  name: string;
  rating: number;
  distance: string;
  isFavorite: boolean;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  durationMinutes: number;
}

export interface Operator {
  id: string;
  name: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  service: Service;
  operator: Operator;
  date: string;
  time: string;
  salon: Salon;
}

export const salons: Salon[] = [
  { id: "1", name: "Barber Studio Milano", rating: 4.8, distance: "0.8 km", isFavorite: true },
  { id: "2", name: "Elite Hair Roma", rating: 4.6, distance: "1.2 km", isFavorite: true },
  { id: "3", name: "Beauty Lounge Torino", rating: 4.9, distance: "2.1 km", isFavorite: true },
  { id: "4", name: "Urban Style Barber", rating: 4.5, distance: "3.4 km", isFavorite: false },
  { id: "5", name: "Modern Cuts Milano", rating: 4.7, distance: "4.0 km", isFavorite: false },
];

export const services: Service[] = [
  { id: "1", name: "Haircut", duration: "30 min", durationMinutes: 30 },
  { id: "2", name: "Haircut + Beard", duration: "45 min", durationMinutes: 45 },
  { id: "3", name: "Color", duration: "60 min", durationMinutes: 60 },
  { id: "4", name: "Blow Dry", duration: "25 min", durationMinutes: 25 },
];

export const operators: Operator[] = [
  { id: "1", name: "Marco" },
  { id: "2", name: "Giovanni" },
  { id: "3", name: "Alessandro" },
  { id: "4", name: "First Available" },
];

export function generateTimeSlots(durationMinutes: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 18;
  const interval = 30;

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      if (h + durationMinutes / 60 > endHour) continue;
      const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      slots.push({ time, available: Math.random() > 0.25 });
    }
  }
  return slots;
}
