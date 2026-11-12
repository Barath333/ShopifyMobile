
import React, {
  createContext,
  useContext,
  ReactNode,
} from 'react';

import {StoreConfig} from '../types/store';
import {getStoreConfig, ACTIVE_STORE_ID} from './stores';

const StoreContext = createContext<StoreConfig | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({children}: StoreProviderProps) => {
  const store = getStoreConfig(ACTIVE_STORE_ID);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreConfig = (): StoreConfig => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      'useStoreConfig must be used inside StoreProvider',
    );
  }

  return context;
};
