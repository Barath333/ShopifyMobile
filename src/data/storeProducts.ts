
import {Product} from '../types/product';

export const storeProducts: Record<string, Product[]> = {
  gymshark: [
    {
      id: 'gym-1',
      title: 'Arrival T-Shirt',
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      variants: [
        {id: 'gym-v1', size: 'S', price: 25, available: true},
        {id: 'gym-v2', size: 'M', price: 25, available: true},
        {id: 'gym-v3', size: 'L', price: 25, available: false},
      ],
    },
    {
      id: 'gym-2',
      title: 'Training Hoodie',
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      variants: [
        {id: 'gym-v4', size: 'S', price: 55, available: true},
        {id: 'gym-v5', size: 'M', price: 55, available: true},
        {id: 'gym-v6', size: 'L', price: 55, available: true},
      ],
    },
  ],

  flexfit: [
    {
      id: 'flex-1',
      title: 'FlexFit Sports Tee',
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600',
      variants: [
        {id: 'flex-v1', size: 'S', price: 1299, available: true},
        {id: 'flex-v2', size: 'M', price: 1299, available: true},
        {id: 'flex-v3', size: 'L', price: 1299, available: false},
      ],
    },
    {
      id: 'flex-2',
      title: 'FlexFit Training Jacket',
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600',
      variants: [
        {id: 'flex-v4', size: 'S', price: 2499, available: true},
        {id: 'flex-v5', size: 'M', price: 2499, available: true},
        {id: 'flex-v6', size: 'L', price: 2499, available: true},
      ],
    },
  ],
};

export const getProductsForStore = (storeId: string): Product[] => {
  return storeProducts[storeId] ?? storeProducts.gymshark;
};
