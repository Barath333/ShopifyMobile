import { StoreConfig } from "../types/store";



export const formatCurrency = (
  amount: number,
  store: StoreConfig,
): string => {
  return new Intl.NumberFormat(
    store.currency === 'INR' ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency: store.currency,
      maximumFractionDigits: 2,
    },
  ).format(amount);
};
