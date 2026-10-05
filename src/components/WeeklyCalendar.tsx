import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Clock, ChefHat, Sparkles, Share2, Check } from 'lucide-react';
import { WEEKLY_SPECIALS } from '../data/menuData';
import { DaySpecial } from '../types';

export const WeeklyCalendar: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedMobileDay, setExpandedMobileDay] = useState<string | null>(WEEKLY_SPECIALS[0].day);

  const activeSpecial = WEEKLY_SPECIALS[selectedDayIndex];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out this week's lunch specials at The Daily Scoop Karen: ${window.location.origin}/#weekly-specials`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="weekly-specials" className="py-12 sm:py-16 lg:py-20 bg-[#F3EFEA] border-y border-[#2C332D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#2C332D]/10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              Weekly Rotation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3D24] mt-1">
              Upcoming Lunch Specials
            </h2>
            <p className="text-sm text-[#2C332D]/75 mt-1 max-w-xl">
              Plan your in-office days around your favorite stews and coastal specials. Each lunch special is slow-cooked fresh and served from 11:30 AM until sold out.
            </p>
          </div>

          <button
            onClick={handleShare}
            type="button"
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1F3D24] bg-white hover:bg-[#FAF8F5] rounded-lg border border-[#2C332D]/15 shadow-sm transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Share with Office Team</span>
              </>
            )}
          </button>
        </div>

        {/* Desktop & Tablet View: Segmented Day Tabs + Showcase Spotlight */}
        <div className="hidden md:block mt-8">
          
          {/* Day Buttons Bar */}
          <div className="grid grid-cols-6 gap-2 p-1.5 bg-[#E8E2D9] rounded-2xl border border-[#2C332D]/10">
            {WEEKLY_SPECIALS.map((special, index) => {
              const isSelected = selectedDayIndex === index;
              return (
                <button
                  key={special.day}
                  type="button"
                  onClick={() => setSelectedDayIndex(index)}
                  className={`py-3 px-2 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-white text-[#1F3D24] shadow-md font-bold'
                      : 'text-[#2C332D]/70 hover:text-[#1F3D24] hover:bg-white/50 font-medium'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider text-[#C85A32]">
                    {special.shortDay}
                  </span>
                  <span className="block text-sm mt-0.5">
                    {special.day}
                  </span>
                  <span className="block text-[11px] text-[#2C332D]/60 truncate mt-1">
                    {special.highlightTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Day Detail Card */}
          <div className="mt-6 bg-white rounded-2xl border border-[#2C332D]/12 p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#1F3D24] text-white text-xs font-semibold rounded-md">
                    {activeSpecial.day} Spotlight
                  </span>
                  <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">
                    {activeSpecial.highlightTag}
                  </span>
                  <span className="text-xs text-[#2C332D]/50">·</span>
                  <span className="text-xs text-[#2C332D]/70">
                    Serving: 11:30 AM – 3:00 PM
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#1F3D24]">
                    {activeSpecial.dishName}
                  </h3>
                  {activeSpecial.swahiliTitle && (
                    <p className="text-sm italic text-[#2C332D]/70 mt-1">
                      Swahili: {activeSpecial.swahiliTitle}
                    </p>
                  )}
                </div>

                <p className="text-base text-[#2C332D]/85 leading-relaxed max-w-2xl">
                  {activeSpecial.description}
                </p>

                {/* Sourcing & Chef quote */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#2C332D]/8">
                    <span className="text-xs font-bold text-[#1F3D24] block">
                      🌱 Farm Provenance
                    </span>
                    <p className="text-xs text-[#2C332D]/75 mt-1">
                      {activeSpecial.farmSource}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#2C332D]/8">
                    <span className="text-xs font-bold text-[#1F3D24] block flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-[#C85A32]" />
                      Chef's Note
                    </span>
                    <p className="text-xs italic text-[#2C332D]/75 mt-1">
                      "{activeSpecial.chefQuote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Summary Box */}
              <div className="lg:col-span-4 bg-[#F3EFEA] rounded-2xl p-6 border border-[#2C332D]/10 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs text-[#2C332D]/70 uppercase tracking-wider block">
                    Special Plate Price
                  </span>
                  <div className="font-mono tabular-nums text-3xl font-bold text-[#C85A32] mt-1">
                    Ksh {activeSpecial.priceKes}
                  </div>
                  <p className="text-xs text-[#2C332D]/60 mt-1">
                    Includes side starch & hot kachumbari or greens
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#2C332D]/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2C332D]/70">Dietary Profile:</span>
                    <span className="font-bold text-[#1F3D24]">
                      {activeSpecial.dietary.join(' · ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2C332D]/70">Batch Limit:</span>
                    <span className="font-bold text-[#1F3D24]">40 portions daily</span>
                  </div>
                </div>

                <a
                  href="#catering"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-[#1F3D24] hover:bg-[#2D5A27] rounded-lg transition-colors block"
                >
                  Pre-Book for Office Group
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Accordion View for Speedy Thumb Navigation */}
        <div className="md:hidden mt-6 space-y-3">
          {WEEKLY_SPECIALS.map((special) => {
            const isExpanded = expandedMobileDay === special.day;
            return (
              <div
                key={special.day}
                className="bg-white rounded-xl border border-[#2C332D]/10 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedMobileDay(isExpanded ? null : special.day)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                        {special.day}
                      </span>
                      <span className="text-[11px] text-[#2C332D]/60">·</span>
                      <span className="text-xs font-medium text-[#1F3D24]">
                        {special.highlightTag}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1F3D24] mt-0.5">
                      {special.dishName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono tabular-nums text-sm font-bold text-[#C85A32]">
                      Ksh {special.priceKes}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#2C332D]/60" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#2C332D]/60" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#2C332D]/8 space-y-3 bg-[#FAF8F5]/50 animate-in fade-in duration-150">
                    <p className="text-xs text-[#2C332D]/80 leading-relaxed">
                      {special.description}
                    </p>

                    <div className="text-xs space-y-1.5 bg-[#F3EFEA] p-3 rounded-lg border border-[#2C332D]/5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#2C332D]/70">Dietary:</span>
                        <span className="font-semibold text-[#1F3D24]">
                          {special.dietary.join(' · ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2C332D]/70">Farm Source:</span>
                        <span className="font-semibold text-[#1F3D24] truncate max-w-[200px]">
                          {special.farmSource}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] italic text-[#2C332D]/70">
                      "{special.chefQuote}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
