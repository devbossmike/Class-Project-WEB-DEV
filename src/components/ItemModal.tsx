import React from 'react';
import { X, Clock, MapPin, CheckCircle2, AlertTriangle, Flame, Activity, Sparkles, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onToggleStatus?: (id: string) => void;
  isStaffMode?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onToggleStatus,
  isStaffMode = false,
  isFavorite = false,
  onToggleFavorite,
}) => {
  if (!item) return null;

  const nutrition = item.nutrition;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#2C332D]/15 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top actions: Bookmark heart + Close button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(item.id)}
              type="button"
              aria-label={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
              title={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
              className={`p-2 rounded-full shadow-md transition-all active:scale-90 ${
                isFavorite
                  ? 'bg-white text-[#C85A32]'
                  : 'bg-white/90 hover:bg-white text-[#2C332D]/60 hover:text-[#C85A32]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="p-2 text-[#2C332D]/70 hover:text-[#2C332D] bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image header if available */}
        {item.image && (
          <div className="relative h-52 w-full bg-[#E8E2D9] overflow-hidden shrink-0">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {item.availability === 'sold_out' && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-4 py-2 bg-red-700 text-white font-bold tracking-wider text-sm uppercase rounded shadow-lg">
                  Sold Out For Today
                </span>
              </div>
            )}
          </div>
        )}

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32]">
                {item.category === 'lunch_specials' ? 'Daily Lunch Special' : item.category === 'breakfast' ? 'Breakfast' : 'Grab & Go'}
              </span>
              <span className="font-mono tabular-nums text-xl font-bold text-[#C85A32]">
                Ksh {item.priceKes}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#1F3D24] mt-1">
              {item.name}
            </h3>

            {item.swahiliName && (
              <p className="text-xs italic text-[#2C332D]/70 mt-0.5">
                Swahili: {item.swahiliName}
              </p>
            )}
          </div>

          {/* Availability status */}
          <div className="flex items-center gap-2 text-xs">
            {item.availability === 'available' && (
              <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Available fresh at counter
              </span>
            )}
            {item.availability === 'low_stock' && (
              <span className="inline-flex items-center gap-1.5 text-amber-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Running Low ({item.remainingPortions ?? 'A few'} portions left)
              </span>
            )}
            {item.availability === 'sold_out' && (
              <span className="inline-flex items-center gap-1.5 text-red-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Sold out for today (batch exhausted)
              </span>
            )}
          </div>

          <p className="text-sm text-[#2C332D]/85 leading-relaxed">
            {item.description}
          </p>

          {/* Dedicated Nutritional Breakdown Panel */}
          {nutrition && (
            <div className="p-4 rounded-xl bg-white border border-[#2C332D]/12 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3D24] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#C85A32]" />
                  Nutritional Profile
                </span>
                <span className="text-[11px] text-[#2C332D]/60">
                  Per standard plate
                </span>
              </div>

              {/* 3 Primary Highlight Metrics (Calories, Protein, Fiber) */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-[#F3EFEA] text-center border border-[#2C332D]/5">
                  <span className="text-[10px] uppercase font-semibold text-[#2C332D]/65 block">
                    Energy
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-[#C85A32] block">
                    {nutrition.calories}
                  </span>
                  <span className="text-[10px] text-[#2C332D]/60 block -mt-0.5">
                    kcal
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F3EFEA] text-center border border-[#2C332D]/5">
                  <span className="text-[10px] uppercase font-semibold text-[#2C332D]/65 block">
                    Protein
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-[#1F3D24] block">
                    {nutrition.proteinGrams}g
                  </span>
                  <span className="text-[10px] text-[#2C332D]/60 block -mt-0.5">
                    lean muscle
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F3EFEA] text-center border border-[#2C332D]/5">
                  <span className="text-[10px] uppercase font-semibold text-[#2C332D]/65 block">
                    Dietary Fiber
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-emerald-800 block">
                    {nutrition.fiberGrams}g
                  </span>
                  <span className="text-[10px] text-[#2C332D]/60 block -mt-0.5">
                    gut healthy
                  </span>
                </div>
              </div>

              {/* Secondary Macros: Carbs & Healthy Fats */}
              {(nutrition.carbsGrams !== undefined || nutrition.fatGrams !== undefined) && (
                <div className="flex items-center justify-between text-xs text-[#2C332D]/75 pt-1.5 border-t border-[#2C332D]/8 px-1">
                  {nutrition.carbsGrams !== undefined && (
                    <span>
                      Carbohydrates: <strong className="text-[#1F3D24] font-mono tabular-nums">{nutrition.carbsGrams}g</strong>
                    </span>
                  )}
                  {nutrition.fatGrams !== undefined && (
                    <span>
                      Healthy Fats: <strong className="text-[#1F3D24] font-mono tabular-nums">{nutrition.fatGrams}g</strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sourcing note */}
          {item.sourcingNote && (
            <div className="p-3.5 rounded-xl bg-[#F3EFEA] border border-[#2C332D]/8 space-y-1">
              <span className="text-xs font-semibold text-[#1F3D24] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                Local Farm Sourcing
              </span>
              <p className="text-xs text-[#2C332D]/75 leading-relaxed">
                {item.sourcingNote}
              </p>
            </div>
          )}

          {/* Meta facts: Serving hours, Dietary tags */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-white border border-[#2C332D]/10">
              <span className="text-[#2C332D]/60 block">Serving Hours</span>
              <span className="font-semibold text-[#1F3D24] mt-0.5 block">
                {item.servingTime}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#2C332D]/10">
              <span className="text-[#2C332D]/60 block">Dietary Profile</span>
              <span className="font-semibold text-[#1F3D24] mt-0.5 block">
                {item.dietary.length > 0 ? item.dietary.join(' · ') : 'Standard Recipe'}
              </span>
            </div>
          </div>

          {/* Staff Mode control button */}
          {isStaffMode && onToggleStatus && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
              <span className="text-xs font-bold text-amber-900 block">
                Kitchen Staff Control
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onToggleStatus(item.id)}
                  className="flex-1 py-2 text-xs font-semibold bg-[#1F3D24] text-white rounded-lg hover:bg-[#2D5A27] transition-colors"
                >
                  Cycle Status (Now: {item.availability.replace('_', ' ')})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#F3EFEA] border-t border-[#2C332D]/10 flex items-center justify-between text-xs text-[#2C332D]/70">
          <span>Counter pickup at Karen Hub</span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-[#1F3D24] text-white font-medium rounded-lg hover:bg-[#2D5A27] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
