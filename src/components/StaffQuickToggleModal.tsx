import React from 'react';
import { X, ChefHat, CheckCircle2, Flame, AlertOctagon, RotateCcw, ShieldCheck } from 'lucide-react';
import { MenuItem, AvailabilityStatus } from '../types';

interface StaffQuickToggleModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onUpdateItemStatus: (id: string, newStatus: AvailabilityStatus, portions?: number) => void;
  onResetDefaults: () => void;
}

export const StaffQuickToggleModal: React.FC<StaffQuickToggleModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateItemStatus,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const soldOutCount = items.filter((i) => i.availability === 'sold_out').length;
  const lowStockCount = items.filter((i) => i.availability === 'low_stock').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#2C332D]/15 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#1F3D24] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ChefHat className="w-5 h-5 text-[#C85A32]" />
            <div>
              <h3 className="font-serif text-lg font-bold">
                Kitchen Crew Stock Manager
              </h3>
              <p className="text-xs text-white/80">
                1-tap live inventory updater to stop customer lines & prevent wasted trips
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Metrics Bar */}
        <div className="px-5 py-3 bg-[#F3EFEA] border-b border-[#2C332D]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#2C332D]/70">
              Total Menu Items: <strong>{items.length}</strong>
            </span>
            <span className="text-amber-800 font-medium">
              Low Stock: <strong>{lowStockCount}</strong>
            </span>
            <span className="text-red-700 font-medium">
              Sold Out: <strong>{soldOutCount}</strong>
            </span>
          </div>

          <button
            onClick={onResetDefaults}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] text-[#2C332D]/80 hover:text-[#1F3D24] font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto space-y-3">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-[#2C332D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#C85A32]">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#2C332D]/40">·</span>
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#2C332D]">
                      Ksh {item.priceKes}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1F3D24]">
                    {item.name}
                  </h4>
                  {item.remainingPortions !== undefined && item.availability !== 'available' && (
                    <span className="text-[11px] text-[#2C332D]/60 block">
                      Remaining: {item.remainingPortions} portions
                    </span>
                  )}
                </div>

                {/* 3-State Toggle Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => onUpdateItemStatus(item.id, 'available', 20)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      item.availability === 'available'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-[#F3EFEA] text-[#2C332D]/70 hover:bg-[#EAE5DC]'
                    }`}
                  >
                    Fresh / In Stock
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateItemStatus(item.id, 'low_stock', 4)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      item.availability === 'low_stock'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-[#F3EFEA] text-[#2C332D]/70 hover:bg-[#EAE5DC]'
                    }`}
                  >
                    Running Low
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateItemStatus(item.id, 'sold_out', 0)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      item.availability === 'sold_out'
                        ? 'bg-red-700 text-white shadow-sm'
                        : 'bg-[#F3EFEA] text-[#2C332D]/70 hover:bg-[#EAE5DC]'
                    }`}
                  >
                    Sold Out
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3EFEA] border-t border-[#2C332D]/10 flex items-center justify-between text-xs">
          <span className="text-[#2C332D]/70">
            Changes immediately reflect on all customer phones and mobile browsers.
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-[#1F3D24] text-white font-medium rounded-lg hover:bg-[#2D5A27] transition-colors"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
