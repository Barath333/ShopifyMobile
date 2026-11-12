
import {Product} from '../../types/product';

export interface ProductProvider {
  getProducts(storeId: string): Promise<Product[]>;

  getProductById(
    storeId: string,
    productId: string,
  ): Promise<Product | undefined>;
}
