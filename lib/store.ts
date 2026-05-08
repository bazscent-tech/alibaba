import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface UserState {
  isLoggedIn: boolean;
  userType: 'buyer' | 'seller' | null;
  user: {
    id: string;
    name: string;
    email: string;
    companyName?: string;
    phone?: string;
    country?: string;
  } | null;
  login: (user: UserState['user'], type: 'buyer' | 'seller') => void;
  logout: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.priceMin * item.quantity), 0);
      }
    }),
    {
      name: 'shabam-cart'
    }
  )
);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userType: null,
      user: null,
      login: (user, type) => set({ isLoggedIn: true, user, userType: type }),
      logout: () => set({ isLoggedIn: false, user: null, userType: null })
    }),
    {
      name: 'shabam-user'
    }
  )
);
