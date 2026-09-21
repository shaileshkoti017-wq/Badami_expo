import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Clock, Car, Info, Sparkles } from 'lucide-react';
import { CIRCUIT_STOPS, MONUMENTS } from '../data/monuments';

interface CircuitMapViewProps {
  lang: 'en' | 'kn';
  onSelectMonument: (id: string) => void;
}

export const CircuitMapView: React.FC<CircuitMapViewProps> = ({
  lang,
  onSelectMonument
}) => {
  const [selectedStopId, setSelectedStopId] = useState<string>('badami_caves');

  const activeStop = CIRCUIT_STOPS.find(s => s.id === selectedStopId) || CIRCUIT_STOPS[0];
  const activeMonument = MONUMENTS.find(m => m.id === selectedStopId) || MONUMENTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#d9a441]/20 text-[#8c571c] font-bold text-xs uppercase tracking-wide border border-[#d9a441]/30">
              Heritage Route
            </span>
            <span className="text-xs text-[#705844] font-medium hidden sm:inline">
              Bagalkote District, Karnataka
            </span>
          </div>
          <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#5c2a1f]">
            {lang === 'kn' ? 'ಬಾದಾಮಿ ಸರ್ಕ್ಯೂಟ್ ಪ್ರವಾಸ ಮಾರ್ಗ' : 'Badami Circuit Heritage Route'}
          </h1>
          <p className="text-sm text-[#705844] mt-0.5">
            Total Circuit: 76 km • 7 Historic Enclaves • Badami to Kudalasangama
          </p>
        </div>

        <a
          href="https://www.google.com/maps/dir/Badami+Cave+Temples,+Badami/Bhutanatha+Temple,+Badami/Banashankari+Temple,+Cholachagudda/Mahakuta+Temples,+Mahakuta/Pattadakal,+Karnataka/Aihole,+Karnataka/Kudalasangama,+Karnataka"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-[#5c2a1f] hover:bg-[#6d2f21] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
        >
          <Navigation className="w-3.5 h-3.5 text-[#d9a441]" />
          <span>Open Full Route in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-75" />
        </a>
      </div>

      {/* Grid: Map Viewport + Active Stop Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Interactive Circuit Map & Route Diagram (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#f5efe6] rounded-2xl p-4 sm:p-5 border border-[#eadfcb] shadow-xs">
            
            {/* Embed Map Viewport */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#eadfcb] border border-[#dcc8a8]">
              <iframe
                title="Badami Heritage Circuit Map"
                className="w-full h-full border-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.60%2C15.85%2C76.15%2C16.25&layer=mapnik&marker=15.9189%2C75.6841"
              />
              
              {/* Overlay Route Legend Bar */}
              <div className="absolute top-3 left-3 bg-[#2c2018]/85 backdrop-blur-xs text-white p-2 rounded-lg text-xs font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d9a441]" />
                <span>Chalukya Heritage Corridor (SH-14 & SH-57)</span>
              </div>
            </div>

            {/* Quick Stop Pills along the circuit */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CIRCUIT_STOPS.map((stop) => (
                <button
                  key={stop.id}
                  onClick={() => setSelectedStopId(stop.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border ${
                    selectedStopId === stop.id
                      ? 'bg-[#5c2a1f] text-white border-[#5c2a1f] shadow-xs'
                      : 'bg-[#fbf8f3] text-[#5c2a1f] hover:bg-[#eadfcb] border-[#eadfcb]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#d9a441] text-[#5c2a1f] text-[10px] font-bold flex items-center justify-center">
                    {stop.stopNumber}
                  </span>
                  <span>{lang === 'kn' ? stop.kannadaName : stop.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Travel Tips Banner */}
          <div className="p-4 rounded-xl bg-[#2f7a6f]/10 border border-[#2f7a6f]/30 flex items-start gap-3">
            <Car className="w-5 h-5 text-[#2f7a6f] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#2c2018]">
              <span className="font-bold text-[#2f7a6f]">Recommended Transit Pattern: </span>
              Most visitors hire a local taxi or auto-rickshaw from Badami Town railway station. A standard 1-day circuit covers Badami Caves + Bhutanatha + Banashankari + Mahakuta + Pattadakal in 6-7 hours. Kudalasangama is best visited on Day 2 via Hungund.
            </div>
          </div>
        </div>

        {/* Right Column: Selected Stop Dossier & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#f5efe6] rounded-2xl p-5 sm:p-6 border border-[#eadfcb] shadow-xs space-y-4">
            
            <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
              <img 
                src={activeMonument.image} 
                alt={activeMonument.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#5c2a1f] text-[#d9a441] font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                Stop #{activeStop.stopNumber} of 7
              </div>
            </div>

            <div>
              <h2 className="font-heritage text-xl sm:text-2xl font-bold text-[#5c2a1f]">
                {lang === 'kn' ? activeMonument.kannadaName : activeMonument.name}
              </h2>
              <p className="text-xs text-[#8c571c] font-medium mt-0.5">
                {activeMonument.architecturalStyle}
              </p>
            </div>

            {/* Practical Logistics Row */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-[#fbf8f3] p-3 rounded-xl border border-[#eadfcb]">
              <div>
                <span className="text-[10px] font-mono text-[#705844] uppercase block">Dwell Time</span>
                <span className="font-bold text-[#5c2a1f]">{activeStop.recommendedDwellTime}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#705844] uppercase block">From Prev Stop</span>
                <span className="font-bold text-[#8c571c]">{activeStop.travelTimeFromPrev}</span>
              </div>
            </div>

            <p className="text-xs text-[#2c2018] leading-relaxed">
              {lang === 'kn' ? activeMonument.kannadaHistory : activeMonument.shortHistory}
            </p>

            {/* Highlights List */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c571c] mb-2 block">
                Must-See Highlights
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMonument.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] px-2 py-1 rounded-md bg-[#eadfcb] text-[#5c2a1f] font-medium">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Button to open in Monument Recognition or Planner */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onSelectMonument(activeMonument.id)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#5c2a1f] hover:bg-[#6d2f21] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d9a441]" />
                <span>Inspect in Monument AI</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${activeMonument.lat},${activeMonument.lng}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#fbf8f3] hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#2f7a6f]" />
                <span>Directions</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
