import React from 'react';
import { MapPin, Phone, Mail, Clock, Wifi } from 'lucide-react';

interface FooterProps {
  onOpenKitchenMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenKitchenMode }) => {
  return (
    <footer className="bg-[#1F3D24] text-[#F3EFEA] pt-12 pb-8 border-t border-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="font-serif text-xl font-bold tracking-tight text-white block">
              The Daily Scoop Karen
            </span>
            <p className="text-white/70 text-xs leading-relaxed">
              Independent cafeteria serving fresh breakfast, rotating daily lunch specials, and grab-and-go artisan meals to the Karen community.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#C85A32] font-semibold">
              <Wifi className="w-3.5 h-3.5" />
              <span>Complimentary 5G Fiber Wi-Fi on-site</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Today's Live Menu & Stock
                </a>
              </li>
              <li>
                <a href="#weekly-specials" className="hover:text-white transition-colors">
                  Upcoming Lunch Specials
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Location & Amenities
                </a>
              </li>
              <li>
                <a href="#catering" className="hover:text-white transition-colors">
                  Corporate Catering Inquiries
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenKitchenMode}
                  className="hover:text-white text-[#C85A32] font-medium transition-colors"
                >
                  Kitchen Crew Controls
                </button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Serving Hours
            </h4>
            <div className="space-y-1.5 text-xs text-white/70">
              <p>
                <strong className="text-white block">Monday – Friday:</strong>
                7:00 AM – 4:30 PM
              </p>
              <p>
                <strong className="text-white block">Saturday Brunch:</strong>
                8:00 AM – 3:00 PM
              </p>
              <p>
                <strong className="text-white block">Sunday:</strong>
                Closed for farm harvesting
              </p>
            </div>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Contact & Address
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <span>Karen Road, Karen Triangle Commercial Hub, Nairobi, Kenya</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>+254 722 000 000</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>hello@thedailyscoopkaren.co.ke</span>
              </p>
            </div>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} The Daily Scoop Karen. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Fast HTML Menu · 0 MB PDFs</span>
            <span>·</span>
            <span>Locally Sourced in Karen & Limuru</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
