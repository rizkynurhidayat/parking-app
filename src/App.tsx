import { useState, useRef, useEffect } from 'react';
import { useParkingData } from './hooks/useParkingData';
import { ParkingMap } from './components/ParkingMap';
import { BookingForm } from './components/BookingForm';
import { BookingDetails } from './components/BookingDetails';
import { CarFront, Search, LayoutDashboard, Settings, Info } from 'lucide-react';

function App() {
  const { spots, booking, bookSpot, endSession } = useParkingData();
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(640);

  useEffect(() => {
    const updateWidth = () => {
      if (mapContainerRef.current) {
        setMapWidth(mapContainerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const selectedSpot = spots.find((s) => s.id === selectedSpotId) || null;

  const handleBook = (data: { name: string; vehicleNumber: string; durationMinutes: number; spotId: string }) => {
    bookSpot(data);
    setSelectedSpotId(null);
  };

  const filteredSpots = spots.map(spot => ({
    ...spot,
    isHighlighted: searchQuery ? spot.id.toLowerCase().includes(searchQuery.toLowerCase()) : false
  }));

  const availableCount = spots.filter(s => !s.isOccupied).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Sidebar - Desktop Only */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8 hidden md:flex z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <CarFront size={28} />
        </div>
        <nav className="flex flex-col gap-6">
          <button className="p-3 text-indigo-600 bg-indigo-50 rounded-xl transition-all">
            <LayoutDashboard size={24} />
          </button>
          <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
            <Info size={24} />
          </button>
          <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
            <Settings size={24} />
          </button>
        </nav>
      </aside>

      <div className="md:ml-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                ParkirPintar <span className="text-indigo-600">Pro</span>
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Parking Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-time Status</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   {availableCount} Slots Available
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Map Section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Zone A Floor 1</h2>
                  <p className="text-slate-500 text-sm">Interactive floor plan with real-time occupancy.</p>
                </div>
                
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Search slot ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-full sm:w-64 transition-all outline-none shadow-sm"
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                <div className="flex flex-wrap items-center gap-6 mb-8 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-50"></div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Occupied</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Selected</span>
                  </div>
                </div>
                
                <div ref={mapContainerRef} className="w-full">
                  <ParkingMap
                    spots={searchQuery ? filteredSpots.filter(s => s.id.toLowerCase().includes(searchQuery.toLowerCase())) : spots}
                    selectedSpotId={selectedSpotId}
                    onSelectSpot={setSelectedSpotId}
                    containerWidth={mapWidth}
                  />
                </div>
              </div>
            </div>

            {/* Right: Booking Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              {booking ? (
                <BookingDetails booking={booking} onEndSession={endSession} />
              ) : (
                <BookingForm selectedSpot={selectedSpot} onBook={handleBook} />
              )}
              
              {!booking && !selectedSpot && (
                <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100/50">
                  <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info size={16} /> Quick Tip
                  </h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    Green spots are ready to be reserved. Simply click on a slot to start your session.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
