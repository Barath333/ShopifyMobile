import {shopifyRequest} from './shopifyClient';

import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './cartQueries';

interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}

const checkUserErrors = (errors: ShopifyUserError[]) => {
  if (errors?.length) {
    throw new Error(errors.map(error => error.message).join(', '));
  }
};

export const createShopifyCart = async (
  variantId: string,
  quantity: number,
) => {
  const data = await shopifyRequest<any>(
    CART_CREATE_MUTATION,
    {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    },
  );

  checkUserErrors(data.cartCreate.userErrors);

  return data.cartCreate.cart as ShopifyCart;
};

export const addShopifyCartLine = async (
  cartId: string,
  variantId: string,
  quantity: number,
) => {
  const data = await shopifyRequest<any>(
    CART_LINES_ADD_MUTATION,
    {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  );

  checkUserErrors(data.cartLinesAdd.userErrors);

  return data.cartLinesAdd.cart as ShopifyCart;
};

export const updateShopifyCartLine = async (
  cartId: string,
  lineId: string,
  quantity: number,
) => {
  const data = await shopifyRequest<any>(
    CART_LINES_UPDATE_MUTATION,
    {
      cartId,
      lines: [{id: lineId, quantity}],
    },
  );

  checkUserErrors(data.cartLinesUpdate.userErrors);

  return data.cartLinesUpdate.cart as ShopifyCart;
};

export const removeShopifyCartLine = async (
  cartId: string,
  lineId: string,
) => {
  const data = await shopifyRequest<any>(
    CART_LINES_REMOVE_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    },
  );

  checkUserErrors(data.cartLinesRemove.userErrors);

  return data.cartLinesRemove.cart as ShopifyCart;
};