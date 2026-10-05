import React, { useState, useMemo } from 'react';
import { Search, Flame, Clock, Info, Check, AlertTriangle, Eye, Sparkles, Filter, Leaf, Heart } from 'lucide-react';
import { MenuItem, MenuCategory, DietaryTag } from '../types';
import { DIETARY_LEGEND } from '../data/menuData';

export type CategoryFilterType = MenuCategory | 'all' | 'favorites';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickToggleStatus?: (id: string) => void;
  isStaffMode?: boolean;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  activeCategory?: CategoryFilterType;
  onCategoryChange?: (category: CategoryFilterType) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickToggleStatus,
  isStaffMode = false,
  favorites = [],
  onToggleFavorite,
  activeCategory,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<CategoryFilterType>('all');
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLegend, setShowLegend] = useState(false);

  const selectedCategory = activeCategory ?? internalCategory;

  const handleCategorySelect = (cat: CategoryFilterType) => {
    setInternalCategory(cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter (including favorites)
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(item.id)) return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (selectedDiet !== 'all' && !item.dietary.includes(selectedDiet)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSwahili = item.swahiliName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSourcing = item.sourcingNote?.toLowerCase().includes(query);
        return matchesName || matchesSwahili || matchesDesc || matchesSourcing;
      }
      return true;
    });
  }, [items, selectedCategory, selectedDiet, searchQuery, favorites]);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      all: items.length,
      breakfast: items.filter((i) => i.category === 'breakfast').length,
      lunch_specials: items.filter((i) => i.category === 'lunch_specials').length,
      grab_and_go: items.filter((i) => i.category === 'grab_and_go').length,
      favorites: items.filter((i) => favorites.includes(i.id)).length,
    };
  }, [items, favorites]);

  return (
    <section id="menu" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#2C332D]/10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
              Live Daily Board
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3D24] mt-1">
              Today’s Farm-to-Counter Menu
            </h2>
            <p className="text-sm text-[#2C332D]/75 mt-1 max-w-xl">
              Coded directly into HTML so you never download slow PDFs on mobile data. Bookmark favorites with the heart icon to easily track stock before visiting.
            </p>
          </div>

          {/* Quick Dietary Legend Toggle Button */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            type="button"
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1F3D24] bg-[#F3EFEA] hover:bg-[#E8E2D9] rounded-lg border border-[#2C332D]/10 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{showLegend ? 'Hide Key & Nutrition' : 'Dietary & Nutrition Key'}</span>
          </button>
        </div>

        {/* Collapsible Dietary Key & Nutrition Transparency Drawer */}
        {showLegend && (
          <div className="mt-4 p-4 rounded-xl bg-[#F3EFEA] border border-[#2C332D]/10 animate-in fade-in duration-150 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3D24] mb-2.5">
                Dietary Indicators & Sourcing Standards
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {DIETARY_LEGEND.map((d) => (
                  <div key={d.code} className="bg-white/80 p-2.5 rounded-lg border border-[#2C332D]/5">
                    <div className="flex items-center gap-1.5 font-bold text-[#1F3D24]">
                      <span className="px-1.5 py-0.5 rounded bg-[#1F3D24] text-white text-[11px]">
                        {d.code}
                      </span>
                      <span>{d.label}</span>
                    </div>
                    <p className="text-[11px] text-[#2C332D]/70 mt-1 leading-snug">
                      {d.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Badges Guide */}
            <div className="pt-2 border-t border-[#2C332D]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3D24] mb-2">
                Nutritional Card Badges Guide
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="inline-flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-[#2C332D]/5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                    Cal
                  </span>
                  <span className="text-[#2C332D]/80 text-[11px]">Estimated Calories (kcal)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-[#2C332D]/5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-bold">
                    Pro
                  </span>
                  <span className="text-[#2C332D]/80 text-[11px]">Dietary Protein in grams</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-[#2C332D]/5">
                  <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200 text-[10px] font-bold">
                    Fiber
                  </span>
                  <span className="text-[#2C332D]/80 text-[11px]">Gut-Healthy Dietary Fiber in grams</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          
          {/* Top Row: Search and Category Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Segmented Control Buttons (Including My Favorites) */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EFEA] rounded-xl border border-[#2C332D]/10 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-white text-[#1F3D24] shadow-sm'
                    : 'text-[#2C332D]/70 hover:text-[#1F3D24]'
                }`}
              >
                All Dishes ({categoryCounts.all})
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('lunch_specials')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === 'lunch_specials'
                    ? 'bg-white text-[#1F3D24] shadow-sm'
                    : 'text-[#2C332D]/70 hover:text-[#1F3D24]'
                }`}
              >
                Lunch Specials ({categoryCounts.lunch_specials})
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('breakfast')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === 'breakfast'
                    ? 'bg-white text-[#1F3D24] shadow-sm'
                    : 'text-[#2C332D]/70 hover:text-[#1F3D24]'
                }`}
              >
                Breakfast ({categoryCounts.breakfast})
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('grab_and_go')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === 'grab_and_go'
                    ? 'bg-white text-[#1F3D24] shadow-sm'
                    : 'text-[#2C332D]/70 hover:text-[#1F3D24]'
                }`}
              >
                Grab & Go ({categoryCounts.grab_and_go})
              </button>

              {/* Personalized My Favorites Tab */}
              <button
                type="button"
                onClick={() => handleCategorySelect('favorites')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === 'favorites'
                    ? 'bg-white text-[#C85A32] shadow-sm font-bold'
                    : 'text-[#2C332D]/70 hover:text-[#C85A32]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    categoryCounts.favorites > 0 ? 'fill-[#C85A32] text-[#C85A32]' : 'text-[#C85A32]'
                  }`}
                />
                <span>My Favorites ({categoryCounts.favorites})</span>
              </button>
            </div>

            {/* Fast Dish Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#2C332D]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stew, chapati, salad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] placeholder:text-[#2C332D]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2C332D]/40 hover:text-[#2C332D]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Secondary Row: Dietary Filter Pills (Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#2C332D]/60 shrink-0 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Diet:
            </span>

            <button
              type="button"
              onClick={() => setSelectedDiet('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedDiet === 'all'
                  ? 'bg-[#1F3D24] text-white'
                  : 'bg-white text-[#2C332D]/80 hover:bg-[#F3EFEA] border border-[#2C332D]/10'
              }`}
            >
              All Options
            </button>

            <button
              type="button"
              onClick={() => setSelectedDiet('V')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedDiet === 'V'
                  ? 'bg-[#1F3D24] text-white'
                  : 'bg-white text-[#2C332D]/80 hover:bg-[#F3EFEA] border border-[#2C332D]/10'
              }`}
            >
              Vegetarian (V)
            </button>

            <button
              type="button"
              onClick={() => setSelectedDiet('VG')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedDiet === 'VG'
                  ? 'bg-[#1F3D24] text-white'
                  : 'bg-white text-[#2C332D]/80 hover:bg-[#F3EFEA] border border-[#2C332D]/10'
              }`}
            >
              Vegan (VG)
            </button>

            <button
              type="button"
              onClick={() => setSelectedDiet('GF')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedDiet === 'GF'
                  ? 'bg-[#1F3D24] text-white'
                  : 'bg-white text-[#2C332D]/80 hover:bg-[#F3EFEA] border border-[#2C332D]/10'
              }`}
            >
              Gluten-Free (GF)
            </button>

            <button
              type="button"
              onClick={() => setSelectedDiet('DF')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedDiet === 'DF'
                  ? 'bg-[#1F3D24] text-white'
                  : 'bg-white text-[#2C332D]/80 hover:bg-[#F3EFEA] border border-[#2C332D]/10'
              }`}
            >
              Dairy-Free (DF)
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="mt-8">
          {filteredItems.length === 0 ? (
            selectedCategory === 'favorites' ? (
              /* Specific Empty State for My Favorites */
              <div className="text-center py-16 bg-[#F3EFEA] rounded-2xl border border-dashed border-[#2C332D]/20 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-[#C85A32] shadow-xs">
                  <Heart className="w-6 h-6 fill-[#C85A32]/20 text-[#C85A32]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F3D24]">
                  No Favorite Dishes Bookmarked Yet
                </h3>
                <p className="text-xs text-[#2C332D]/70 max-w-sm mx-auto leading-relaxed">
                  Tap the heart icon on any morning breakfast item or daily lunch special to build your personal menu and track stock before heading over!
                </p>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3D24] rounded-lg hover:bg-[#2D5A27] transition-colors"
                >
                  Browse Today’s Menu
                </button>
              </div>
            ) : (
              /* General Empty State */
              <div className="text-center py-16 bg-[#F3EFEA] rounded-2xl border border-dashed border-[#2C332D]/20 space-y-3">
                <Leaf className="w-8 h-8 text-[#C85A32] mx-auto opacity-70" />
                <h3 className="font-serif text-lg font-bold text-[#1F3D24]">
                  No menu items match your search
                </h3>
                <p className="text-xs text-[#2C332D]/70 max-w-sm mx-auto">
                  Try switching diet filters or searching for something else like "stew", "chapati", or "sourdough".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleCategorySelect('all');
                    setSelectedDiet('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3D24] rounded-lg hover:bg-[#2D5A27]"
                >
                  Reset All Filters
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const isSoldOut = item.availability === 'sold_out';
                const isLowStock = item.availability === 'low_stock';
                const isFavorite = favorites.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`group relative rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer ${
                      isSoldOut
                        ? 'border-gray-300 opacity-80 bg-stone-50'
                        : 'border-[#2C332D]/10 hover:border-[#C85A32]/40 hover:shadow-md'
                    }`}
                  >
                    {/* Item Image with Fallback */}
                    {item.image ? (
                      <div className="relative h-48 w-full bg-[#E8E2D9] overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
                            isSoldOut ? 'grayscale contrast-75' : ''
                          }`}
                        />
                        
                        {/* Bookmark Heart Button (On top-right of image) */}
                        {onToggleFavorite && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(item.id);
                            }}
                            title={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
                            className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
                              isFavorite
                                ? 'bg-white text-[#C85A32] shadow-md'
                                : 'bg-white/85 hover:bg-white text-[#2C332D]/60 hover:text-[#C85A32] shadow-sm'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
                          </button>
                        )}

                        {/* Sold Out Banner Overlay */}
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-3">
                            <span className="px-3.5 py-1.5 bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded shadow">
                              Sold Out Today
                            </span>
                            <span className="text-[11px] text-white/90 mt-1.5">
                              Kitchen will prep fresh tomorrow
                            </span>
                          </div>
                        )}

                        {/* Serving Time Tag */}
                        <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium">
                          {item.servingTime}
                        </div>
                      </div>
                    ) : (
                      /* Header Bookmark if item has no image */
                      <div className="pt-3 px-5 flex justify-end">
                        {onToggleFavorite && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(item.id);
                            }}
                            title={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Bookmark dish to favorites'}
                            className={`p-1.5 rounded-full transition-all active:scale-90 ${
                              isFavorite
                                ? 'text-[#C85A32] bg-amber-50'
                                : 'text-[#2C332D]/40 hover:text-[#C85A32] hover:bg-[#F3EFEA]'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      
                      <div>
                        {/* Top Kicker: Category & Dietary metadata */}
                        <div className="flex items-center justify-between gap-2 text-xs text-[#2C332D]/60 mb-1.5">
                          <span className="uppercase tracking-wider font-semibold text-[#1F3D24]">
                            {item.category === 'lunch_specials'
                              ? 'Lunch Special'
                              : item.category === 'breakfast'
                              ? 'Breakfast'
                              : 'Grab & Go'}
                          </span>

                          {/* Zero-pill unboxed dietary metadata */}
                          {item.dietary.length > 0 && (
                            <span className="font-semibold text-[#C85A32]">
                              {item.dietary.join(' · ')}
                            </span>
                          )}
                        </div>

                        {/* Title & Swahili Name */}
                        <h3 className="font-serif text-lg font-bold text-[#1F3D24] leading-snug group-hover:text-[#C85A32] transition-colors">
                          {item.name}
                        </h3>

                        {item.swahiliName && (
                          <p className="text-xs italic text-[#2C332D]/65 mt-0.5">
                            {item.swahiliName}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs text-[#2C332D]/75 line-clamp-3 mt-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Color-coded nutritional badges for instant scannability */}
                        {item.nutrition && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {/* Calories Badge (Warm Amber) */}
                            <span 
                              title={`Energy: ${item.nutrition.calories} kcal`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs"
                            >
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700">Cal</span>
                              <span className="font-mono tabular-nums font-bold">{item.nutrition.calories}</span>
                            </span>

                            {/* Protein Badge (Emerald Leaf) */}
                            <span 
                              title={`Protein: ${item.nutrition.proteinGrams}g`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-2xs"
                            >
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Pro</span>
                              <span className="font-mono tabular-nums font-bold">{item.nutrition.proteinGrams}g</span>
                            </span>

                            {/* Fiber Badge (Teal/Sage) */}
                            <span 
                              title={`Dietary Fiber: ${item.nutrition.fiberGrams}g`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-teal-50 text-teal-900 border border-teal-200/80 shadow-2xs"
                            >
                              <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700">Fiber</span>
                              <span className="font-mono tabular-nums font-bold">{item.nutrition.fiberGrams}g</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Module: Price, Stock Alert & Action */}
                      <div className="pt-3 border-t border-[#2C332D]/8 space-y-2">
                        
                        {/* Real-time Availability State */}
                        <div className="flex items-center justify-between text-xs">
                          {isSoldOut ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-red-700">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Sold out
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-700 animate-pulse">
                              <Flame className="w-3.5 h-3.5 text-amber-600" />
                              Hurry · {item.remainingPortions ?? 'Few'} left
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              Available fresh
                            </span>
                          )}

                          <span className="font-mono tabular-nums text-base font-bold text-[#C85A32]">
                            Ksh {item.priceKes}
                          </span>
                        </div>

                        {/* Sourcing snippet */}
                        {item.sourcingNote && (
                          <p className="text-[11px] text-[#2C332D]/60 line-clamp-1 italic">
                            🌱 {item.sourcingNote}
                          </p>
                        )}

                        {/* Staff quick-toggle button if enabled */}
                        {isStaffMode && onQuickToggleStatus && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickToggleStatus(item.id);
                            }}
                            className="w-full mt-2 py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-medium text-[11px] transition-colors"
                          >
                            Staff: Toggle ({item.availability})
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
