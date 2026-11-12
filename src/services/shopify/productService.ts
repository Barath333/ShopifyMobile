
import {shopifyRequest} from './shopifyClient';
import {GET_PRODUCTS_QUERY} from './productQueries';

export const getShopifyProducts = async () => {
  const data = await shopifyRequest<any>(
    GET_PRODUCTS_QUERY,
    {first: 20},
  );

  return data.products.edges.map(
    (edge: any) => edge.node,
  );
};
