import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection, CategoryFilterType } from './components/MenuSection';
import { ItemModal } from './components/ItemModal';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { LocationAndAmenities } from './components/LocationAndAmenities';
import { CateringForm } from './components/CateringForm';
import { StaffQuickToggleModal } from './components/StaffQuickToggleModal';
import { Footer } from './components/Footer';
import { MenuItem, AvailabilityStatus } from './types';
import { INITIAL_MENU_ITEMS } from './data/menuData';
import { ChefHat, CheckCircle2, AlertTriangle, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'daily_scoop_menu_v1';
const FAVORITES_STORAGE_KEY = 'daily_scoop_favorites_v1';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        // Merge fresh nutritional info if missing from cached items
        return parsed.map((item) => {
          const fresh = INITIAL_MENU_ITEMS.find((i) => i.id === item.id);
          return {
            ...item,
            nutrition: item.nutrition || fresh?.nutrition,
          };
        });
      }
    } catch {
      // Fallback
    }
    return INITIAL_MENU_ITEMS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilterType>('all');
  const [kitchenModalOpen, setKitchenModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync menu items to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    } catch {
      // Ignore
    }
  }, [menuItems]);

  // Sync favorites to local storage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore
    }
  }, [favorites]);

  // Track scroll position for subtle scroll-to-top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleFavorite = (id: string) => {
    const item = menuItems.find((i) => i.id === id);
    setFavorites((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        showToast(`Removed "${item?.name || 'Dish'}" from favorites.`);
        return prev.filter((favId) => favId !== id);
      } else {
        showToast(`Saved "${item?.name || 'Dish'}" to your favorites!`);
        return [...prev, id];
      }
    });
  };

  const handleViewFavorites = () => {
    setActiveCategory('favorites');
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateItemStatus = (id: string, newStatus: AvailabilityStatus, portions?: number) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = {
            ...item,
            availability: newStatus,
            remainingPortions: portions !== undefined ? portions : item.remainingPortions,
          };
          if (newStatus === 'sold_out') {
            updated.remainingPortions = 0;
            showToast(`"${item.name}" marked as SOLD OUT.`);
          } else if (newStatus === 'low_stock') {
            updated.remainingPortions = portions || 4;
            showToast(`"${item.name}" marked as Running Low (${updated.remainingPortions} left).`);
          } else {
            updated.remainingPortions = 20;
            showToast(`"${item.name}" restored to Fresh & In Stock.`);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleQuickCycleStatus = (id: string) => {
    const item = menuItems.find((i) => i.id === id);
    if (!item) return;
    if (item.availability === 'available') {
      handleUpdateItemStatus(id, 'low_stock', 4);
    } else if (item.availability === 'low_stock') {
      handleUpdateItemStatus(id, 'sold_out', 0);
    } else {
      handleUpdateItemStatus(id, 'available', 20);
    }
  };

  const handleResetDefaults = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Menu reset to fresh daily morning defaults.');
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const soldOutItemsCount = menuItems.filter((i) => i.availability === 'sold_out').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C332D] flex flex-col font-sans selection:bg-[#C85A32]/20">
      
      {/* Top Bar Contract with My Favorites Counter */}
      <Header
        onOpenKitchenMode={() => setKitchenModalOpen(true)}
        kitchenModeActive={kitchenModalOpen}
        soldOutCount={soldOutItemsCount}
        favoritesCount={favorites.length}
        onViewFavorites={handleViewFavorites}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToMenu={scrollToMenu}
          soldOutCount={soldOutItemsCount}
        />

        {/* Live Dynamic Menu Display with Favorites Support */}
        <MenuSection
          items={menuItems}
          onSelectItem={(item) => setSelectedItem(item)}
          onQuickToggleStatus={handleQuickCycleStatus}
          isStaffMode={false}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Weekly Calendar Lunch Special Preview */}
        <WeeklyCalendar />

        {/* Location, Embedded Map, Amenities & Wi-Fi */}
        <LocationAndAmenities />

        {/* Corporate Catering & Office Lunch Drop Form */}
        <CateringForm />
      </main>

      {/* Footer */}
      <Footer onOpenKitchenMode={() => setKitchenModalOpen(true)} />

      {/* Item Detail Modal with Bookmark Heart Toggle */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleStatus={handleQuickCycleStatus}
        isStaffMode={true}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Kitchen Staff Stock Controller Modal */}
      <StaffQuickToggleModal
        isOpen={kitchenModalOpen}
        onClose={() => setKitchenModalOpen(false)}
        items={menuItems}
        onUpdateItemStatus={handleUpdateItemStatus}
        onResetDefaults={handleResetDefaults}
      />

      {/* Real-time Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1F3D24] text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Scroll to Top affordance */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
          aria-label="Scroll back to top"
          className="fixed bottom-5 left-5 z-30 p-2.5 bg-white/90 hover:bg-white text-[#1F3D24] rounded-full shadow-md border border-[#2C332D]/15 transition-all active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}

