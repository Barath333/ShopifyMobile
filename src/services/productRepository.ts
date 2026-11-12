
import {mockProductProvider} from './providers/mockProductProvider';
import {shopifyProductProvider} from './providers/shopifyProductProvider';
import {ProductProvider} from './providers/productProvider';

// Change this to shopifyProductProvider when real Shopify
// credentials and a merchant store are configured.
const productProvider: ProductProvider = mockProductProvider;

export async function getProducts(storeId: string) {
  return productProvider.getProducts(storeId);
}

export async function getProductById(
  storeId: string,
  productId: string,
) {
  return productProvider.getProductById(storeId, productId);
}
