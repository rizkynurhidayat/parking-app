import React, { useState, useEffect } from 'react';
import type { ParkingSpot } from '../types';
import { User, CreditCard, Clock, Info } from 'lucide-react';

interface Props {
  selectedSpot: ParkingSpot | null;
  onBook: (data: { name: string; vehicleNumber: string; durationMinutes: number; spotId: string }) => void;
}

export const BookingForm: React.FC<Props> = ({ selectedSpot, onBook }) => {
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [duration, setDuration] = useState('60');

  useEffect(() => {
    setName('');
    setVehicleNumber('');
    setDuration('60');
  }, [selectedSpot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpot) return;

    onBook({
      name,
      vehicleNumber,
      durationMinutes: parseInt(duration, 10),
      spotId: selectedSpot.id,
    });
  };

  if (!selectedSpot) {
    return (
      <div className="bg-white/50 border-2 border-dashed border-slate-200 p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <Info size={32} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-700">No Spot Selected</h3>
          <p className="text-slate-500 max-w-[200px] mx-auto text-sm">
            Please select an available parking spot from the map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Reserve Spot <span className="text-indigo-600">{selectedSpot.id}</span>
        </h2>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
          Available
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-600 px-1">
            <User size={16} /> Customer Name
          </label>
          <input
            type="text"
            required
            className="input-field"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-600 px-1">
            <CreditCard size={16} /> Vehicle Number
          </label>
          <input
            type="text"
            required
            className="input-field uppercase"
            placeholder="e.g. B 1234 ABC"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-600 px-1">
            <Clock size={16} /> Duration
          </label>
          <div className="relative">
            <select
              className="input-field appearance-none"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="120">2 Hours</option>
              <option value="180">3 Hours</option>
              <option value="300">5 Hours</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Clock size={18} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary mt-4">
          Complete Booking
        </button>
      </form>
    </div>
  );
};
