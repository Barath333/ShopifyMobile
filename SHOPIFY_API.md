# Shopify Storefront API Integration

## 1. Overview

The application is designed to support Shopify as its e-commerce backend.

Shopify Storefront API uses GraphQL to retrieve product information, variants, collections and manage customer carts.

The current project uses mock product data for the working prototype. A Shopify API client and product provider have also been prepared, but live Shopify credentials have not been configured.

This document explains the proposed production integration.

## 2. API Architecture

```text
React Native Screens
        |
        v
Product Repository
        |
        v
Product Provider
        |
        +------------------+
        |                  |
        v                  v
Mock Provider       Shopify Provider
                           |
                           v
                    Shopify Client
                           |
                           v
                    Storefront API
                           |
                           v
                    Shopify Store
```

The application can switch between mock and Shopify providers without changing the product screens.

## 3. Shopify Storefront API Configuration

The Storefront API endpoint follows this structure:

```text
https://{store-domain}/api/2026-10/graphql.json
```

Required configuration:

```typescript
const SHOPIFY_DOMAIN = 'your-store.myshopify.com';

const STOREFRONT_ACCESS_TOKEN =
  'your-storefront-access-token';

const API_VERSION = '2026-10';

const SHOPIFY_ENDPOINT =
  `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;
```

The access token shown above is a placeholder.

For production:
- Use a Storefront API access token with only the required permissions.
- Obtain merchant authorization through a backend onboarding flow where appropriate.
- Resolve the correct store domain and credentials using the merchant ID.
- Never place Shopify Admin API credentials in the React Native application.
- Never expose private provider credentials in the mobile bundle.

## 4. Shopify GraphQL Client

The existing project contains a Shopify client abstraction.

Example implementation:

```typescript
const SHOPIFY_ENDPOINT =
  `https://${SHOPIFY_DOMAIN}/api/2026-10/graphql.json`;

export async function shopifyRequest<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Shopify API request failed');
  }

  const result = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}
```

This is an illustrative client implementation. Production code should also validate the response shape, handle network timeouts and classify GraphQL errors.

## 5. Fetch Products

The Storefront API can retrieve products and their variants.

GraphQL operation:

```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        description
        productType
        featuredImage {
          url
          altText
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  }
}
```

Variables:

```json
{
  "first": 20
}
```

The application maps the returned Shopify product objects into its shared `Product` model.

Example mapping:

```typescript
const mapShopifyProduct = (item: any): Product => ({
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
});
```

Important: Shopify product and variant IDs are GraphQL global IDs. They are different from the local mock IDs used in the prototype.

## 6. Fetch a Single Product

A production implementation can retrieve a specific product by its Shopify ID or handle.

Example using a product handle:

```graphql
query GetProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    featuredImage {
      url
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
}
```

This supports:
- Product details.
- Product images.
- Available sizes and variants.
- Current variant prices.
- Availability information.

## 7. Shopify Cart Management

The prototype currently uses Zustand and AsyncStorage for its local cart.

For production, Shopify Cart API should become the authoritative cart system.

### 7.1 Create a Cart

```graphql
mutation CreateCart($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

Example variables:

```json
{
  "input": {
    "lines": [
      {
        "merchandiseId": "gid://shopify/ProductVariant/123456",
        "quantity": 1
      }
    ]
  }
}
```

The variant ID must come from the actual Shopify Storefront API response.

### 7.2 Add Items to a Cart

```graphql
mutation AddCartLines(
  $cartId: ID!,
  $lines: [CartLineInput!]!
) {
  cartLinesAdd(
    cartId: $cartId,
    lines: $lines
  ) {
    cart {
      id
      totalQuantity
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

### 7.3 Update Quantity

```graphql
mutation UpdateCartLines(
  $cartId: ID!,
  $lines: [CartLineUpdateInput!]!
) {
  cartLinesUpdate(
    cartId: $cartId,
    lines: $lines
  ) {
    cart {
      id
      totalQuantity
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

### 7.4 Remove Items

```graphql
mutation RemoveCartLines(
  $cartId: ID!,
  $lineIds: [ID!]!
) {
  cartLinesRemove(
    cartId: $cartId,
    lineIds: $lineIds
  ) {
    cart {
      id
      totalQuantity
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

After each cart mutation, the application should use the returned cart data to update its UI.

## 8. Production Cart Flow

```text
Customer opens product
        |
        v
Selects product variant
        |
        v
Checks availability
        |
        v
Creates Shopify cart if needed
        |
        v
Adds variant to Shopify cart
        |
        v
Receives updated cart
        |
        v
Updates cart screen
        |
        v
Customer selects Checkout
        |
        v
Opens Shopify checkout URL
```

The mobile application should retain the Shopify cart ID for subsequent cart operations.

A cart ID should be associated with the correct merchant and customer/session. Avoid mixing carts across stores.

## 9. Production Checkout

The application should not implement its own payment processing by simply collecting card details inside React Native.

Instead:

1. Create or retrieve the Shopify cart.
2. Add selected product variants.
3. Retrieve the latest cart information.
4. Obtain the Shopify `checkoutUrl`.
5. Open that URL using the supported Shopify checkout experience or an appropriate browser.
6. Let Shopify handle checkout, payment and order creation.
7. Refresh order information after checkout through an appropriate supported flow.

Example:

```typescript
async function openCheckout(checkoutUrl: string) {
  const supported = await Linking.canOpenURL(checkoutUrl);

  if (!supported) {
    throw new Error('Checkout URL cannot be opened');
  }

  await Linking.openURL(checkoutUrl);
}
```

The application should also handle checkout cancellation, network failures and return navigation.

The final checkout and payment experience depends on the merchant's Shopify configuration and supported checkout capabilities.

## 10. Cart Persistence

The prototype currently uses Zustand persistence with AsyncStorage.

For production, persist the Shopify cart ID rather than treating the local cart as the source of truth.

Example:

```typescript
interface ShopifyCartSession {
  merchantId: string;
  cartId: string;
}
```

On application startup:

1. Load the saved cart session.
2. Confirm that it belongs to the active merchant.
3. Retrieve the latest Shopify cart.
4. Update the local UI.
5. Handle expired or unavailable carts appropriately.

Local storage can still be used for temporary UI state and offline interactions.

## 11. Error Handling

The application should handle:

- Network failures.
- Invalid or expired cart IDs.
- Unavailable product variants.
- Invalid quantities.
- Shopify GraphQL errors.
- API rate limits.
- Product price changes.
- Checkout URL failures.

Recommended behavior:

- Display a meaningful error message.
- Provide retry functionality for recoverable failures.
- Refresh product availability before checkout when necessary.
- Do not show a successful cart update until the server confirms it.
- Prevent duplicate operations when requests are retried.

## 12. Multi-Merchant Support

A shared mobile application may support multiple Shopify merchants.

The backend should maintain a merchant registry.

Example:

```typescript
interface MerchantShopifyConfig {
  merchantId: string;
  shopDomain: string;
  storefrontTokenReference: string;
  enabled: boolean;
}
```

The mobile application sends the merchant identifier to the backend.

The backend resolves the merchant's Shopify configuration and applies the correct authorization strategy.

Each merchant must have isolated:
- Shopify credentials.
- Cart sessions.
- Customer information.
- Orders.
- Third-party integration credentials.
- Analytics and notification configuration.

A production merchant onboarding process should include Shopify authorization, permission validation, configuration storage and connection testing.

## 13. Current Prototype vs Production

| Capability | Current prototype | Production requirement |
|---|---|---|
| Product listing | Mock provider | Shopify Storefront API |
| Product details | Mock provider | Shopify product query |
| Product variants | Mock variants | Shopify variant IDs |
| Availability | Mock values | Shopify availability |
| Cart | Zustand + AsyncStorage | Shopify Cart API |
| Cart persistence | Local storage | Persist Shopify cart ID |
| Checkout | Demo action | Shopify checkout URL |
| Merchant configuration | Local configuration | Backend-managed configuration |
| Credentials | Placeholder values | Secure merchant credential management |
| Third-party services | Mock reviews | Actual provider integrations |

## 14. Conclusion

The prototype demonstrates a provider-based architecture that separates the user interface from the underlying commerce data source.

For production, Shopify Storefront API should provide product and cart functionality, while Shopify checkout should handle the actual payment flow.

A backend merchant registry and secure credential management layer are necessary for a scalable multi-merchant implementation.

The current project contains a Shopify integration foundation, but live Shopify data, production cart synchronization and real checkout have not yet been connected or verified.