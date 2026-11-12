import {Review} from '../../types/review';

const mockReviews: Review[] = [
  {
    id: 'review-1',
    customerName: 'Alex',
    rating: 5,
    comment: 'Excellent quality and comfortable fit.',
  },
  {
    id: 'review-2',
    customerName: 'John',
    rating: 4,
    comment: 'Good product. Perfect for training.',
  },
];

export const getProductReviews = async (
  productId: string,
): Promise<Review[]> => {
  // Simulate API response delay
await new Promise<void>(resolve => setTimeout(resolve, 1000));

  if (productId.startsWith('flex-')) {
    throw new Error('Reviews service is currently unavailable.');
  }

  return mockReviews;
};