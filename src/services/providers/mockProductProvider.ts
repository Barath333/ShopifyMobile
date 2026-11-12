
import {ProductProvider} from './productProvider';
import {getProductsForStore} from '../../data/storeProducts';

export const mockProductProvider: ProductProvider = {
  async getProducts(storeId) {
    return getProductsForStore(storeId);
  },

  async getProductById(storeId, productId) {
    const products = getProductsForStore(storeId);

    return products.find(product => product.id === productId);
  },
};
