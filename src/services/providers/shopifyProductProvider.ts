
import {Product} from '../../types/product';
import {ProductProvider} from './productProvider';
import {getShopifyProducts} from '../shopify/productService';

const mapShopifyProduct = (item: any): Product => {
  return {
    id: item.id,
    title: item.title,
    category: item.productType || 'General',
    image: item.featuredImage?.url || '',
    variants: item.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      size: edge.node.title,
      price: Number(edge.node.price.amount),
      available: edge.node.availableForSale,
    })),
  };
};

export const shopifyProductProvider: ProductProvider = {
  async getProducts(_storeId) {
    const products = await getShopifyProducts();
    return products.map(mapShopifyProduct);
  },

  async getProductById(_storeId, productId) {
    const products = await getShopifyProducts();
  const mappedProducts: Product[] = products.map(mapShopifyProduct);

    return mappedProducts.find(
      product => product.id === productId,
    );
  },
};
