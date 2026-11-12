
export interface StoreConfig {
  id: string;
  name: string;
  tagline: string;
  currency: string;
  currencySymbol: string;

  theme: {
    primary: string;
    background: string;
    text: string;
    secondary: string;
    surface: string;
    border: string;
  };

  features: {
    reviews: boolean;
    loyalty: boolean;
    subscriptions: boolean;
  };
}
