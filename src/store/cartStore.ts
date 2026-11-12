
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACTIVE_STORE_ID} from '../config/stores';

import {Product, ProductVariant} from '../types/product';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (product: Product, variant: ProductVariant) => void;
  increaseQuantity: (variantId: string) => void;
  decreaseQuantity: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product, variant) =>
        set(state => {
          const existingItem = state.items.find(
            item => item.variant.id === variant.id,
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.variant.id === variant.id
                  ? {...item, quantity: item.quantity + 1}
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, {product, variant, quantity: 1}],
          };
        }),

      increaseQuantity: variantId =>
        set(state => ({
          items: state.items.map(item =>
            item.variant.id === variantId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        })),

      decreaseQuantity: variantId =>
        set(state => ({
          items: state.items
            .map(item =>
              item.variant.id === variantId
                ? {...item, quantity: item.quantity - 1}
                : item,
            )
            .filter(item => item.quantity > 0),
        })),

      removeItem: variantId =>
        set(state => ({
          items: state.items.filter(
            item => item.variant.id !== variantId,
          ),
        })),

      clearCart: () => set({items: []}),
    }),

 {
  name: `shopify-cart-storage-${ACTIVE_STORE_ID}`,
  storage: createJSONStorage(() => AsyncStorage),
  partialize: state => ({items: state.items}),
}
  ),
);
