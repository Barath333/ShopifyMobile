
import {StoreConfig} from '../types/store';

export const stores: Record<string, StoreConfig> = {
  gymshark: {
    id: 'gymshark',
    name: 'GYMSHARK',
    tagline: 'TRAINING. LIFESTYLE. PERFORMANCE.',
    currency: 'USD',
    currencySymbol: '$',

    theme: {
      primary: '#111111',
      background: '#FFFFFF',
      text: '#111111',
      secondary: '#777777',
      surface: '#F5F5F5',
      border: '#E5E5E5',
    },

    features: {
      reviews: true,
      loyalty: false,
      subscriptions: false,
    },
  },

  flexfit: {
    id: 'flexfit',
    name: 'FLEXFIT',
    tagline: 'MOVE BETTER. LIVE STRONGER.',
    currency: 'INR',
    currencySymbol: '₹',

    theme: {
      primary: '#176B55',
      background: '#FFFFFF',
      text: '#172B24',
      secondary: '#718078',
      surface: '#EFF5F1',
      border: '#DCE7DF',
    },

    features: {
      reviews: false,
      loyalty: true,
      subscriptions: true,
    },
  },
};

// Change this value to preview another merchant.
// export const ACTIVE_STORE_ID = 'flexfit';

export const ACTIVE_STORE_ID = 'gymshark';

export const getStoreConfig = (storeId: string): StoreConfig => {
  return stores[storeId] ?? stores.gymshark;
};
