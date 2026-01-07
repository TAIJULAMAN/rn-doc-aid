// Core data models for Doc Aid app

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number; // years
  photo: string;
  rating: number;
  reviewCount: number;
  patientsTreated: number;
  consultationFee: number;
  about: string;
  availability: Record<string, string[]>; // { "Monday": ["10:00", "10:30", ...] }
  reviews: Review[];
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  dateTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'video' | 'offline';
  paymentMode: 'clinic' | 'online';
  prescriptionUrl?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  disabled: boolean; // for past times
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
