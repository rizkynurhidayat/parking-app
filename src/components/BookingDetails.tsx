import React, { useEffect, useState } from 'react';
import type { Booking } from '../types';
import { format } from 'date-fns';
import { Clock, Car, User, AlertCircle, CheckCircle2, LogOut } from 'lucide-react';

interface Props {
  booking: Booking;
  onEndSession: () => void;
}

export const BookingDetails: React.FC<Props> = ({ booking, onEndSession }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const endTime = booking.startTime + booking.durationMinutes * 60 * 1000;
  const isOvertime = now > endTime;
  
  const timeDifferenceMs = Math.abs(endTime - now);
  const minutes = Math.floor(timeDifferenceMs / (1000 * 60));
  const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

  const timeString = `${minutes}m ${seconds}s`;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className={`absolute top-0 left-0 w-full h-2 ${isOvertime ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
      
      <div className="flex justify-between items-start mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active Session</h2>
          <p className="text-slate-500 text-sm">Real-time parking monitor</p>
        </div>
        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${isOvertime ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isOvertime ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
          {isOvertime ? 'Overtime' : 'Live'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Spot ID</span>
          <div className="text-2xl font-black text-indigo-600">{booking.spotId}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Scheduled</span>
          <div className="text-lg font-bold text-slate-700">{booking.durationMinutes} Min</div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center group">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
            <User size={18} />
          </div>
          <div className="ml-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver</div>
            <div className="font-bold text-slate-700">{booking.name}</div>
          </div>
        </div>
        <div className="flex items-center group">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
            <Car size={18} />
          </div>
          <div className="ml-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</div>
            <div className="font-bold text-slate-700 uppercase">{booking.vehicleNumber}</div>
          </div>
        </div>
        <div className="flex items-center group">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
            <Clock size={18} />
          </div>
          <div className="ml-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Started At</div>
            <div className="font-bold text-slate-700">{format(booking.startTime, 'HH:mm:ss')}</div>
          </div>
        </div>
      </div>

      <div className={`p-5 rounded-2xl mb-8 flex items-center justify-between border-2 ${isOvertime ? 'bg-rose-50/50 border-rose-100' : 'bg-indigo-50/50 border-indigo-100'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOvertime ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {isOvertime ? <AlertCircle size={20} /> : <Clock size={20} />}
          </div>
          <span className={`font-bold tracking-tight ${isOvertime ? 'text-rose-700' : 'text-indigo-700'}`}>
            {isOvertime ? 'Overtime' : 'Time Left'}
          </span>
        </div>
        <span className={`text-2xl font-black tabular-nums tracking-tighter ${isOvertime ? 'text-rose-600' : 'text-indigo-600'}`}>
          {isOvertime ? '+' : ''}{timeString}
        </span>
      </div>

      <button onClick={onEndSession} className="btn-danger">
        <LogOut size={20} /> Checkout & End Session
      </button>
    </div>
  );
};
