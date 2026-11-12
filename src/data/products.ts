
import {Product} from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    title: 'Arrival T-Shirt',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    variants: [
      {id: 'v1', size: 'S', price: 25, available: true},
      {id: 'v2', size: 'M', price: 25, available: true},
      {id: 'v3', size: 'L', price: 25, available: false},
      {id: 'v4', size: 'XL', price: 25, available: true},
    ],
  },
  {
    id: '2',
    title: 'Training Hoodie',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    variants: [
      {id: 'v5', size: 'S', price: 55, available: true},
      {id: 'v6', size: 'M', price: 55, available: true},
      {id: 'v7', size: 'L', price: 55, available: true},
    ],
  },
  {
    id: '3',
    title: 'Training Leggings',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1506629905607-d9c297d6f5f4?w=600',
    variants: [
      {id: 'v8', size: 'S', price: 40, available: true},
      {id: 'v9', size: 'M', price: 40, available: true},
      {id: 'v10', size: 'L', price: 40, available: false},
    ],
  },
  {
    id: '4',
    title: 'Performance Jacket',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    variants: [
      {id: 'v11', size: 'S', price: 70, available: true},
      {id: 'v12', size: 'M', price: 70, available: true},
      {id: 'v13', size: 'L', price: 70, available: true},
    ],
  },
];
