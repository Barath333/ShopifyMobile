export interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
}

export const shopifyConfig: ShopifyConfig = {
  domain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-storefront-token',
};

export const shopifyRequest = async <T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> => {
  const response = await fetch(
    `https://${shopifyConfig.domain}/api/2026-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          shopifyConfig.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Shopify API request failed');
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error('Shopify GraphQL error');
  }

  return result.data as T;
};