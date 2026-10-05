import React, { useMemo } from 'react';
import { Clock, MapPin, Sparkles, ArrowDown, Wifi, Leaf, ShieldAlert } from 'lucide-react';
import { HERO_IMAGE } from '../data/menuData';

interface HeroProps {
  onScrollToMenu: () => void;
  soldOutCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu, soldOutCount }) => {
  // Compute cafeteria status based on local East Africa Time (UTC+3)
  const currentStatus = useMemo(() => {
    const now = new Date();
    // UTC time in ms + 3 hours for EAT
    const eatOffset = 3 * 60;
    const utcMinutes = now.getTime() + now.getTimezoneOffset() * 60000;
    const eatDate = new Date(utcMinutes + eatOffset * 60000);

    const day = eatDate.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = eatDate.getHours();
    const minutes = eatDate.getMinutes();
    const timeVal = hours + minutes / 60;

    if (day === 0) {
      return {
        isOpen: false,
        phase: 'closed',
        badgeText: 'Closed on Sundays',
        subtext: 'Reopens Monday morning at 7:00 AM',
      };
    }

    const closeTime = day === 6 ? 15.0 : 16.5; // Saturday closes at 3 PM, weekdays at 4:30 PM
    const openTime = day === 6 ? 8.0 : 7.0;

    if (timeVal < openTime) {
      return {
        isOpen: false,
        phase: 'opening_soon',
        badgeText: 'Opening Soon at ' + (day === 6 ? '8:00 AM' : '7:00 AM'),
        subtext: 'Kitchen crew is prepping fresh morning batches',
      };
    } else if (timeVal >= closeTime) {
      return {
        isOpen: false,
        phase: 'closed_for_day',
        badgeText: 'Closed for Today',
        subtext: 'Prepping fresh specials for tomorrow at 7:00 AM',
      };
    } else if (timeVal >= 11.5 && timeVal <= 15.0) {
      return {
        isOpen: true,
        phase: 'lunch_rush',
        badgeText: 'Open Now · Lunch Specials Serving',
        subtext: 'Hot stews, fresh chapatis, and curries ready right now',
      };
    } else if (timeVal < 11.5) {
      return {
        isOpen: true,
        phase: 'breakfast',
        badgeText: 'Open Now · Breakfast & Spiced Chai',
        subtext: 'Warm mandazi, eggs, and rich Kenyan masala tea',
      };
    } else {
      return {
        isOpen: true,
        phase: 'afternoon',
        badgeText: 'Open Now · Grab & Go & Afternoon Tea',
        subtext: 'Chilled salads, freshly brewed coffee, and snacks',
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 pb-6 border-b border-[#2C332D]/10 text-xs sm:text-sm text-[#2C332D]/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-[#1F3D24]">
              <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
              {currentStatus.badgeText}
            </span>
            <span className="text-[#2C332D]/30">·</span>
            <span className="hidden sm:inline text-[#2C332D]/70">{currentStatus.subtext}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              Mon–Fri 7:00am–4:30pm · Sat 8:00am–3:00pm
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-[#1F3D24]">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              Karen Road, Nairobi
            </span>
          </div>
        </div>

        {/* Hero Grid: Split Showcase */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
                Farm-to-Counter Nairobi Cafeteria
              </p>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1F3D24] text-balance leading-[1.15]">
                Fresh Daily Meals. Zero Guesswork. No Chalkboard Lines.
              </h1>

              <p className="text-base sm:text-lg text-[#2C332D]/80 leading-relaxed max-w-xl">
                Karen’s favorite independent cafeteria inside the Karen Triangle hub. 
                Locally sourced from nearby organic farms, cooked fresh from scratch every morning for estate residents, corporate hybrid teams, and students.
              </p>
            </div>

            {/* Quick Sourcing & Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#2C332D]/90">
              <div className="p-3 rounded-lg bg-[#F3EFEA] border border-[#2C332D]/5">
                <span className="block font-semibold text-[#1F3D24]">Farm Fresh</span>
                <span className="text-[#2C332D]/70">Karen & Limuru greens</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F3EFEA] border border-[#2C332D]/5">
                <span className="block font-semibold text-[#1F3D24]">Under 3-Min Line</span>
                <span className="text-[#2C332D]/70">Fast counter service</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F3EFEA] border border-[#2C332D]/5 col-span-2 sm:col-span-1">
                <span className="block font-semibold text-[#1F3D24]">Live Stock</span>
                <span className="text-[#2C332D]/70">Real-time sold-out alerts</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#B24E29] rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <span>See Today's Menu</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <a
                href="#weekly-specials"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#1F3D24] bg-white border border-[#2C332D]/15 hover:border-[#1F3D24]/40 rounded-lg transition-all whitespace-nowrap"
              >
                Weekly Specials Preview
              </a>
            </div>

            {/* Stock Alert Note */}
            {soldOutCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Kitchen notice:</strong> {soldOutCount} daily special {soldOutCount === 1 ? 'is' : 'are'} already sold out today. Check availability below before heading over!
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Visual Anchor of the Cafeteria Space */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#2C332D]/10 bg-[#E8E2D9]">
              
              {/* Cafeteria Space Photo */}
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="The Daily Scoop Cafeteria interior in Karen Nairobi, featuring warm timber and sunlit garden views"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Scrim overlay banner */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#F3EFEA]/80 block">
                      Inside Karen Triangle Hub
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      The Daily Scoop Cafeteria
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                      Karen Road · Near Karen Triangle & Galleria Shopping Mall
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded text-white font-medium">
                      <Wifi className="w-3 h-3 text-emerald-300" />
                      5G Fiber Wi-Fi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
