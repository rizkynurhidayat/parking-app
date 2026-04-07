import { useState, useEffect } from 'react';
import type { ParkingSpot, Booking } from '../types';

const INITIAL_SPOTS: ParkingSpot[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `A${i + 1}`,
  x: (i % 5) * 120 + 20,
  y: Math.floor(i / 5) * 150 + 20,
  width: 100,
  height: 120,
  isOccupied: false,
  zone: 'A',
}));

export function useParkingData() {
  const [spots, setSpots] = useState<ParkingSpot[]>(() => {
    const saved = localStorage.getItem('parking_spots');
    if (saved) return JSON.parse(saved);
    return INITIAL_SPOTS;
  });

  const [booking, setBooking] = useState<Booking | null>(() => {
    const saved = localStorage.getItem('current_booking');
    if (saved) return JSON.parse(saved);
    return null;
  });

  useEffect(() => {
    localStorage.setItem('parking_spots', JSON.stringify(spots));
  }, [spots]);

  useEffect(() => {
    if (booking) {
      localStorage.setItem('current_booking', JSON.stringify(booking));
    } else {
      localStorage.removeItem('current_booking');
    }
  }, [booking]);

  const bookSpot = (newBooking: Omit<Booking, 'id' | 'startTime'>) => {
    const bookingEntry: Booking = {
      ...newBooking,
      id: Math.random().toString(36).substring(2, 9),
      startTime: Date.now(),
    };
    
    setBooking(bookingEntry);
    setSpots((prev) =>
      prev.map((s) =>
        s.id === newBooking.spotId ? { ...s, isOccupied: true } : s
      )
    );
  };

  const endSession = () => {
    if (!booking) return;
    setSpots((prev) =>
      prev.map((s) =>
        s.id === booking.spotId ? { ...s, isOccupied: false } : s
      )
    );
    setBooking(null);
  };

  return { spots, booking, bookSpot, endSession };
}
