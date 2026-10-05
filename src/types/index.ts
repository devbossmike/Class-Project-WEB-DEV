export type DietaryTag = 'V' | 'VG' | 'GF' | 'DF';

export type MenuCategory = 'breakfast' | 'lunch_specials' | 'grab_and_go';

export type AvailabilityStatus = 'available' | 'low_stock' | 'sold_out';

export interface MenuItem {
  id: string;
  name: string;
  swahiliName?: string;
  description: string;
  category: MenuCategory;
  priceKes: number;
  dietary: DietaryTag[];
  availability: AvailabilityStatus;
  remainingPortions?: number;
  image?: string;
  servingTime: string;
  sourcingNote?: string;
  caloriesApprox?: number;
  isPopular?: boolean;
}

export interface DaySpecial {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  shortDay: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  dishName: string;
  swahiliTitle?: string;
  description: string;
  priceKes: number;
  dietary: DietaryTag[];
  farmSource: string;
  chefQuote: string;
  highlightTag: string;
}

export interface CateringInquiry {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  serviceDate: string;
  headcount: number;
  cateringType: 'office_lunch_drop' | 'buffet_spread' | 'executive_bento' | 'tea_and_pastries';
  dietaryNotes: string;
}
