import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Car, ShieldCheck, ExternalLink, Navigation, Phone, Mail, Coffee } from 'lucide-react';

export const LocationAndAmenities: React.FC = () => {
  const [selectedMapPin, setSelectedMapPin] = useState<'cafeteria' | 'triangle' | 'galleria'>('cafeteria');

  return (
    <section id="location" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-6 border-b border-[#2C332D]/10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
            Visit Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3D24] mt-1">
            Location, Hours & Amenities
          </h2>
          <p className="text-sm text-[#2C332D]/75 mt-1 max-w-xl">
            Tucked inside the Karen Triangle commercial hub with plenty of shade, free gated parking, and high-speed Wi-Fi for hybrid workers.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Quick Details & Amenities */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#2C332D]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#1F3D24]">
                <Clock className="w-5 h-5 text-[#C85A32]" />
                <h3 className="font-serif text-lg font-bold">Cafeteria Operating Hours</h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#2C332D]/85">
                <div className="flex items-center justify-between pb-2 border-b border-[#2C332D]/5">
                  <span className="font-medium">Monday – Friday</span>
                  <span className="font-semibold text-[#1F3D24]">7:00 AM – 4:30 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2C332D]/5">
                  <span className="font-medium">Saturday Brunch</span>
                  <span className="font-semibold text-[#1F3D24]">8:00 AM – 3:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-[#2C332D]/60">
                  <span>Sunday</span>
                  <span className="italic">Closed (Farm restocking day)</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#2C332D]/70 bg-[#F3EFEA] p-3 rounded-xl border border-[#2C332D]/5 space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">Breakfast Service:</span>
                  <span>7:00 AM – 11:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Lunch Specials:</span>
                  <span>11:30 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Grab & Go Cabinet:</span>
                  <span>All day until close</span>
                </div>
              </div>
            </div>

            {/* Hub Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-4 rounded-xl bg-white border border-[#2C332D]/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Safaricom 5G Fiber</span>
                </div>
                <p className="text-xs text-[#2C332D]/75 leading-relaxed">
                  Complimentary 150 Mbps Wi-Fi and power outlets at booth tables for hybrid work and Zoom catch-ups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2C332D]/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#1F3D24]">
                  <Car className="w-4 h-4 text-[#C85A32]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Free Gated Parking</span>
                </div>
                <p className="text-xs text-[#2C332D]/75 leading-relaxed">
                  Over 60 dedicated parking slots with 24/7 security guards and direct entrance off Karen Road.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2C332D]/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#1F3D24]">
                  <Coffee className="w-4 h-4 text-[#C85A32]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Garden Terrace</span>
                </div>
                <p className="text-xs text-[#2C332D]/75 leading-relaxed">
                  Lush outdoor sheltered seating shaded by Karen fever trees and flowering bougainvillea.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2C332D]/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#1F3D24]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fast Counter Turn</span>
                </div>
                <p className="text-xs text-[#2C332D]/75 leading-relaxed">
                  Average line wait time under 3 minutes even during the peak 12:30 PM lunch rush.
                </p>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="p-4 rounded-xl bg-[#F3EFEA] border border-[#2C332D]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#1F3D24] block">Direct Kitchen Line:</span>
                <span className="text-[#2C332D]/70">+254 722 000 000 · Karen Road Hub</span>
              </div>
              <a
                href="tel:+254722000000"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1F3D24] text-white rounded-lg font-medium hover:bg-[#2D5A27] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Kitchen</span>
              </a>
            </div>

          </div>

          {/* Right Column: Custom Interactive Styled Karen Map */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-[#2C332D]/15 shadow-sm bg-[#EAE5DC] flex flex-col">
              
              {/* Map Header Toolbar */}
              <div className="p-4 bg-white/95 backdrop-blur-sm border-b border-[#2C332D]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                  <span className="font-bold text-[#1F3D24]">Karen Triangle Commercial Hub</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#2C332D]/60 hidden sm:inline">Near:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedMapPin('cafeteria')}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      selectedMapPin === 'cafeteria' ? 'bg-[#1F3D24] text-white' : 'bg-[#F3EFEA] text-[#2C332D]'
                    }`}
                  >
                    The Daily Scoop
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMapPin('triangle')}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      selectedMapPin === 'triangle' ? 'bg-[#1F3D24] text-white' : 'bg-[#F3EFEA] text-[#2C332D]'
                    }`}
                  >
                    Karen Triangle
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMapPin('galleria')}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      selectedMapPin === 'galleria' ? 'bg-[#1F3D24] text-white' : 'bg-[#F3EFEA] text-[#2C332D]'
                    }`}
                  >
                    Galleria Mall (4 min)
                  </button>
                </div>
              </div>

              {/* Graphic Karen Area Map Illustration */}
              <div className="relative h-[340px] sm:h-[400px] w-full bg-[#E5DFD5] overflow-hidden select-none">
                
                {/* SVG Map Layout */}
                <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Karen Greenery Areas */}
                  <rect width="800" height="500" fill="#E6E0D4" />
                  
                  {/* Forest / Greenery patches */}
                  <path d="M 50,20 C 120,40 180,30 220,90 C 250,140 190,210 120,200 C 60,190 20,130 50,20 Z" fill="#D3DCBA" opacity="0.6" />
                  <path d="M 550,20 C 630,10 700,50 740,110 C 780,180 720,240 640,230 C 580,220 540,120 550,20 Z" fill="#D3DCBA" opacity="0.6" />
                  <path d="M 450,320 C 530,310 680,330 720,420 C 740,470 650,490 560,470 C 480,450 420,380 450,320 Z" fill="#D3DCBA" opacity="0.6" />

                  {/* Roads: Karen Road (Primary artery) */}
                  <path d="M 0,280 L 320,240 L 480,220 L 800,160" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 0,280 L 320,240 L 480,220 L 800,160" stroke="#D1C7B7" strokeWidth="14" strokeLinecap="round" />

                  {/* Langata Road connection */}
                  <path d="M 320,240 L 280,500" stroke="#FFFFFF" strokeWidth="16" />
                  <path d="M 320,240 L 280,500" stroke="#D1C7B7" strokeWidth="12" />

                  {/* Bogani Road link */}
                  <path d="M 480,220 L 520,0" stroke="#FFFFFF" strokeWidth="14" />
                  <path d="M 480,220 L 520,0" stroke="#D1C7B7" strokeWidth="10" />

                  {/* Karen Roundabout / Triangle junction */}
                  <circle cx="320" cy="240" r="28" fill="#F0ECE3" stroke="#D1C7B7" strokeWidth="4" />
                  
                  {/* Street Labels */}
                  <text x="120" y="255" fill="#6B6258" fontSize="11" fontWeight="600" transform="rotate(-7 120 255)">
                    KAREN ROAD
                  </text>
                  <text x="600" y="180" fill="#6B6258" fontSize="11" fontWeight="600" transform="rotate(-10 600 180)">
                    TO GALLERIA & NAIROBI CBD
                  </text>
                  <text x="310" y="380" fill="#6B6258" fontSize="10" fontWeight="600" transform="rotate(78 310 380)">
                    LANGATA ROAD
                  </text>
                  <text x="485" y="100" fill="#6B6258" fontSize="10" fontWeight="600" transform="rotate(-75 485 100)">
                    BOGANI ROAD
                  </text>

                  {/* Landmarks */}
                  {/* Karen Triangle Landmark */}
                  <g className="cursor-pointer" onClick={() => setSelectedMapPin('triangle')}>
                    <rect x="230" y="150" width="80" height="45" rx="6" fill="#F8F6F2" stroke="#2C332D" strokeWidth="1.5" />
                    <text x="270" y="172" fill="#1F3D24" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Karen Triangle
                    </text>
                    <text x="270" y="185" fill="#6B6258" fontSize="8" textAnchor="middle">
                      Shops & Banks
                    </text>
                  </g>

                  {/* Galleria Landmark */}
                  <g className="cursor-pointer" onClick={() => setSelectedMapPin('galleria')}>
                    <rect x="680" y="100" width="95" height="45" rx="6" fill="#F8F6F2" stroke="#2C332D" strokeWidth="1.5" />
                    <text x="727" y="122" fill="#1F3D24" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Galleria Mall
                    </text>
                    <text x="727" y="135" fill="#6B6258" fontSize="8" textAnchor="middle">
                      5 mins drive
                    </text>
                  </g>

                  {/* THE DAILY SCOOP PIN (Prominent anchor) */}
                  <g className="cursor-pointer" onClick={() => setSelectedMapPin('cafeteria')}>
                    {/* Pulsing ring */}
                    <circle cx="430" cy="210" r="22" fill="#C85A32" opacity="0.25" className="animate-ping" />
                    <circle cx="430" cy="210" r="14" fill="#C85A32" />
                    <circle cx="430" cy="210" r="6" fill="#FFFFFF" />
                    
                    {/* Callout box */}
                    <rect x="360" y="125" width="140" height="42" rx="8" fill="#1F3D24" stroke="#FAF8F5" strokeWidth="2" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.2))" />
                    <text x="430" y="144" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                      The Daily Scoop
                    </text>
                    <text x="430" y="157" fill="#C8DABF" fontSize="8" textAnchor="middle">
                      Cafeteria & Terrace Hub
                    </text>
                    {/* Pointer arrow down */}
                    <polygon points="425,167 435,167 430,175" fill="#1F3D24" />
                  </g>

                  {/* Compass rose */}
                  <g transform="translate(40, 420)">
                    <circle cx="20" cy="20" r="16" fill="#FFFFFF" stroke="#D1C7B7" />
                    <text x="20" y="16" fill="#1F3D24" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
                    <path d="M 20,8 L 23,20 L 20,18 L 17,20 Z" fill="#C85A32" />
                  </g>
                </svg>

                {/* Overlaid Location Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#2C332D]/15 shadow-md flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[#1F3D24] block">
                      {selectedMapPin === 'cafeteria'
                        ? 'The Daily Scoop Cafeteria'
                        : selectedMapPin === 'triangle'
                        ? 'Karen Triangle Hub'
                        : 'Galleria Shopping Mall Junction'}
                    </span>
                    <span className="text-[#2C332D]/75 text-[11px]">
                      Karen Road, Nairobi · 1.2 km from Karen Roundabout
                    </span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Karen+Road+Nairobi+Kenya"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C85A32] hover:bg-[#B24E29] text-white rounded-lg font-semibold text-xs transition-colors shrink-0 shadow-sm"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

            {/* Travel Times Helper */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-[#2C332D]/10">
                <span className="text-[#2C332D]/60 block text-[11px]">From Karen Roundabout</span>
                <span className="font-semibold text-[#1F3D24] mt-0.5 block">3 mins drive</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#2C332D]/10">
                <span className="text-[#2C332D]/60 block text-[11px]">From Galleria Mall</span>
                <span className="font-semibold text-[#1F3D24] mt-0.5 block">5 mins drive</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#2C332D]/10">
                <span className="text-[#2C332D]/60 block text-[11px]">Matatu Routes</span>
                <span className="font-semibold text-[#1F3D24] mt-0.5 block">Route 111 & 24</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
