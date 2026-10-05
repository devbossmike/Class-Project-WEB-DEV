import React, { useState } from 'react';
import { Utensils, Clock, MapPin, ChefHat, Phone, Menu as MenuIcon, X, Heart } from 'lucide-react';

interface HeaderProps {
  onOpenKitchenMode: () => void;
  kitchenModeActive: boolean;
  soldOutCount: number;
  favoritesCount?: number;
  onViewFavorites?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKitchenMode,
  kitchenModeActive,
  soldOutCount,
  favoritesCount = 0,
  onViewFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#2C332D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1F3D24] group-hover:text-[#2D5A27] transition-colors">
              The Daily Scoop
            </span>
            <span className="text-xs uppercase tracking-widest text-[#C85A32] font-semibold hidden sm:inline">
              Karen
            </span>
          </a>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2C332D]/80">
            <a href="#menu" className="hover:text-[#1F3D24] transition-colors">
              Today's Menu
            </a>
            <a href="#weekly-specials" className="hover:text-[#1F3D24] transition-colors">
              Weekly Specials
            </a>
            <a href="#location" className="hover:text-[#1F3D24] transition-colors">
              Hours & Location
            </a>
            <a href="#catering" className="hover:text-[#1F3D24] transition-colors">
              Corporate Catering
            </a>
          </nav>

          {/* Zone 3: Primary actions, favorites & staff quick-toggle affordance */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* My Favorites button if items are saved */}
            {favoritesCount > 0 && onViewFavorites && (
              <button
                onClick={onViewFavorites}
                type="button"
                title="View your bookmarked favorites"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#C85A32]/30 bg-amber-50/60 text-[#C85A32] hover:bg-amber-100/70 transition-colors whitespace-nowrap"
              >
                <Heart className="w-3.5 h-3.5 fill-[#C85A32]" />
                <span className="hidden sm:inline">Favorites</span>
                <span className="font-mono tabular-nums">({favoritesCount})</span>
              </button>
            )}

            {/* Kitchen staff manager toggle */}
            <button
              onClick={onOpenKitchenMode}
              type="button"
              title="Kitchen crew availability control"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                kitchenModeActive
                  ? 'bg-[#1F3D24] text-white border-[#1F3D24]'
                  : 'bg-white/80 text-[#2C332D] border-[#2C332D]/15 hover:border-[#2C332D]/30'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="hidden lg:inline">Kitchen Control</span>
              {soldOutCount > 0 && (
                <span className="text-[11px] font-semibold tabular-nums text-[#C85A32]">
                  ({soldOutCount} out)
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#C85A32] hover:bg-[#B24E29] rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              Today's Menu
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#2C332D] hover:text-[#1F3D24] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2C332D]/10 space-y-3 animate-in fade-in duration-150">
            {favoritesCount > 0 && onViewFavorites && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewFavorites();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-semibold text-[#C85A32] bg-amber-50 rounded-md text-left"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-[#C85A32]" />
                  <span>My Bookmarked Favorites</span>
                </span>
                <span className="font-mono tabular-nums">({favoritesCount})</span>
              </button>
            )}
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#2C332D] hover:bg-[#F3EFEA] rounded-md"
            >
              Today's Menu
            </a>
            <a
              href="#weekly-specials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#2C332D] hover:bg-[#F3EFEA] rounded-md"
            >
              Weekly Specials Calendar
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#2C332D] hover:bg-[#F3EFEA] rounded-md"
            >
              Location, Hours & Wi-Fi
            </a>
            <a
              href="#catering"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#2C332D] hover:bg-[#F3EFEA] rounded-md"
            >
              Corporate Office Catering
            </a>

            <div className="pt-2 border-t border-[#2C332D]/10 flex items-center justify-between text-xs text-[#2C332D]/70 px-3">
              <span>Karen Road, Nairobi</span>
              <span>Open: Mon–Fri 7am–4:30pm</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
