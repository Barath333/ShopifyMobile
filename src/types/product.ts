
export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  variants: ProductVariant[];
}
