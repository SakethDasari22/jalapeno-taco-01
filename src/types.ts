export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceLarge?: number; // For Aguas Frescas small/large
  description: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export type ViewState = 'home' | 'menu' | 'visit' | 'contact' | '404';
