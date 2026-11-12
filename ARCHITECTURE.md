# Multi-Merchant Shopify Mobile Application – Architecture

## 1. Architecture Overview

The proposed solution uses a shared React Native codebase to support multiple Shopify merchants.

Each merchant can have its own:
- Branding and theme.
- Product catalog.
- Currency and regional settings.
- Enabled features.
- Third-party integrations.
- Checkout and customer experience.

The architecture separates the mobile presentation layer, business logic, merchant configuration, integration providers and backend services.

The current assignment prototype uses local mock data. This document describes the proposed production architecture.

## 2. High-Level Architecture

```text
                 Mobile Application
                 (React Native)
                         |
              Merchant Configuration
                         |
                Presentation Layer
                         |
                 Business Logic
                         |
                Service / Repository
                         |
                  API Client Layer
                         |
                  Backend Services
                         |
       +-----------------+------------------+
       |                 |                  |
  Merchant          Shopify API       Integration
  Registry          Adapter Layer      Adapters
       |                 |                  |
  Configuration     Storefront API     Reviews
  Feature Flags     Customer API       Loyalty
  Branding          Cart / Checkout    Subscriptions
                                      Notifications
                                      Analytics
```

## 3. Mobile Application Architecture

### Presentation Layer

Responsible for rendering the user interface.

Reusable screens and components:
- Welcome screen.
- Home screen.
- Product listing.
- Product details.
- Variant selector.
- Cart.
- Checkout handoff.
- Account and order screens (future scope).

Screens should not contain direct Shopify API calls. They should communicate through repositories and application services.

### State Management Layer

Zustand can manage:
- Cart state.
- Selected merchant.
- User session state.
- UI state.
- Feature-related state.

Server data can be managed through TanStack Query for caching, refetching, loading states and error handling.

### Repository Layer

The repository provides a consistent interface regardless of the underlying provider.

Example:

```typescript
interface ProductProvider {
  getProducts(storeId: string): Promise<Product[]>;
  getProductById(
    storeId: string,
    productId: string
  ): Promise<Product | undefined>;
}
```

Possible implementations:
- MockProductProvider.
- ShopifyProductProvider.
- CustomCommerceProvider.

This allows the application to switch data providers without changing its screens.

## 4. Multi-Merchant Configuration

Each merchant has a configuration record.

Example:

```typescript
interface MerchantConfig {
  id: string;
  name: string;
  logo: string;
  currency: string;

  theme: {
    primary: string;
    background: string;
    text: string;
  };

  features: {
    reviews: boolean;
    loyalty: boolean;
    subscriptions: boolean;
    search: boolean;
  };

  integrations: {
    reviewsProvider?: string;
    loyaltyProvider?: string;
    subscriptionProvider?: string;
  };
}
```

### Configuration loading

In production:

1. User opens the application.
2. Application identifies the merchant using a merchant-specific app configuration, deep link or store selection.
3. Mobile application requests the merchant configuration from the backend.
4. Backend returns branding, currency, feature flags and integration settings.
5. Application applies the configuration.
6. Screens render according to the active merchant.

A cached configuration can be used while refreshing from the backend.

### Merchant onboarding

When a new merchant joins:

1. Merchant submits their Shopify store domain.
2. Backend initiates Shopify OAuth authorization.
3. Merchant approves the requested permissions.
4. Backend securely stores the authorization credentials.
5. Merchant selects available integrations.
6. Backend saves merchant configuration and integration mappings.
7. Mobile application retrieves the new configuration.

This avoids requiring mobile screen changes for every new merchant.

## 5. Shopify Integration Architecture

Shopify integration should be isolated behind a dedicated adapter.

### Shopify Storefront API

Used for buyer-facing commerce operations:

- Retrieve products and collections.
- Retrieve product variants.
- Check product availability.
- Create carts.
- Add cart lines.
- Update cart quantities.
- Remove cart lines.
- Retrieve checkout URL.

### Customer Account API

Used for supported customer account functionality:

- Customer authentication.
- Customer profile.
- Customer orders.
- Customer account information.

### Shopify Admin API

Used for privileged merchant operations that require administrative permissions.

Examples:
- Merchant configuration.
- Product administration.
- Order management.
- Webhook management.

Admin API credentials must remain on the backend and must never be embedded in the mobile application.

### Cart and checkout flow

```text
User selects product variant
          |
          v
Application validates selection
          |
          v
Create Shopify cart
          |
          v
Add selected variant
          |
          v
Update cart quantities
          |
          v
Retrieve checkout URL
          |
          v
Open Shopify checkout
          |
          v
Shopify handles payment
          |
          v
Application retrieves order status
```

The production checkout should use Shopify's supported checkout flow rather than implementing payment processing independently.

## 6. Third-Party Integration Strategy

Integrations should be implemented through provider adapters.

This prevents the application from depending directly on one vendor.

| Category | Possible providers | Recommended approach |
|---|---|---|
| Reviews and ratings | Judge.me, Yotpo, Okendo | Provider adapter |
| Loyalty and rewards | Smile.io, LoyaltyLion | Provider adapter |
| Subscriptions | Recharge, Appstle | Provider adapter |
| Search and discovery | Algolia, Searchanise | Provider adapter |
| Discounts and bundles | Shopify Functions, third-party apps | Shopify-native or adapter |
| Push notifications | Firebase Cloud Messaging, OneSignal | Native SDK or backend |
| Analytics | Firebase Analytics, Amplitude | Analytics adapter |
| Customer support | Gorgias, Zendesk | SDK or web fallback |
| Shipping and tracking | AfterShip, 17TRACK | API adapter |
| Returns and refunds | Loop Returns, ReturnGO | API or web fallback |

These are candidate providers, not confirmed integrations. Their current API availability, Shopify compatibility, commercial plans and mobile support must be verified during merchant onboarding.

### Integration classification

Every third-party integration should be evaluated in four categories:

**1. Shopify-native**

Prefer Shopify-native capabilities when they meet the requirement.

Examples:
- Product catalog.
- Cart.
- Checkout.
- Discounts supported by Shopify.

**2. Direct API / SDK integration**

Use when the provider exposes suitable APIs or mobile SDKs.

Examples:
- Reviews.
- Loyalty.
- Analytics.

**3. Web fallback**

Use a secure web view or external browser when the provider only exposes a web-based merchant experience and an acceptable mobile integration is unavailable.

**4. Unsupported**

If an app has no suitable API, SDK or safe web experience, clearly mark it unsupported rather than promising full functionality.

## 7. Handling Unfamiliar Shopify Apps and Theme Customizations

Not every Shopify application provides a public mobile SDK or API.

The onboarding process should inspect:

- Available APIs and SDKs.
- Shopify app documentation.
- Required permissions.
- Webhook support.
- Theme app extensions.
- Storefront compatibility.
- Authentication requirements.

For theme-specific functionality, investigate whether the feature can be reproduced using Storefront API data or a supported app extension.

If the functionality is only available through a web storefront, use a web fallback where appropriate.

If no secure and maintainable integration is possible, classify the feature as unsupported or require custom development.

Theme customization should not be assumed to be directly available in a native mobile application.

## 8. Configurable Features vs New Builds vs Custom Development

| Requirement | Recommended solution |
|---|---|
| Logo, colors and typography | Merchant configuration |
| Currency and regional settings | Merchant configuration |
| Enable or disable reviews | Feature flags |
| Supported loyalty provider | Integration configuration |
| Product catalog | Shopify adapter |
| Merchant-specific app icon and package name | Separate app build |
| New native screen or complex workflow | Custom development |
| Unsupported third-party integration | Custom adapter or web fallback |
| Different checkout requirements | Shopify-supported checkout customization or custom development after feasibility review |

### Merchant application strategy

Two deployment models are possible.

**Shared application model**

- One application serves multiple merchants.
- Merchant is identified at runtime.
- Configuration is loaded dynamically.
- New merchants can be onboarded without publishing a new app, provided existing application capabilities are sufficient.

**White-label application model**

- Same React Native codebase.
- Separate application identity, icon, branding and package/bundle identifiers.
- Separate builds and store submissions for merchants requiring their own app identity.

The choice depends on merchant branding requirements and distribution strategy.

## 9. Security Architecture

Security is critical because the application connects to multiple merchant Shopify stores.

Key practices:

- Store private Shopify credentials only on the backend.
- Use Shopify OAuth for merchant authorization.
- Validate OAuth state and authorization callbacks.
- Use HTTPS for all network communication.
- Use secure token storage for mobile customer sessions.
- Use iOS Keychain and Android Keystore through an appropriate secure-storage library.
- Never expose Admin API tokens in mobile source code.
- Apply least-privilege API permissions.
- Validate requests and merchant ownership on the backend.
- Separate merchant data and enforce tenant-level authorization.
- Avoid logging access tokens or sensitive customer information.

## 10. Caching and Synchronization

To improve performance and handle unreliable connectivity:

- Cache merchant configuration locally.
- Cache product and collection responses.
- Use TanStack Query for server-state caching.
- Refresh stale product data when connectivity returns.
- Persist appropriate cart state.
- Handle network failures with retry and user feedback.
- Use Shopify webhooks on the backend for relevant catalog and order updates.

The server remains the source of truth for Shopify product availability, pricing and cart operations.

An offline cart should be treated as pending local state until validated against Shopify.

## 11. Three Major Technical Risks

### Risk 1: Third-party Shopify app compatibility

**Problem:** Some Shopify apps only support storefront or theme integrations and may not expose mobile-compatible APIs.

**Impact:** Merchant-specific features may not work in a native application.

**Mitigation:**
- Evaluate every provider before onboarding.
- Maintain a standard integration adapter interface.
- Support web fallback when appropriate.
- Clearly identify unsupported functionality.
- Offer custom integration when commercially justified.

### Risk 2: Multi-merchant security and data isolation

**Problem:** Incorrect merchant identification or credential handling could expose one merchant's data to another merchant.

**Impact:** Security incidents, customer data exposure and loss of trust.

**Mitigation:**
- Maintain a backend merchant registry.
- Resolve merchant identity on the server.
- Enforce tenant-level authorization on every relevant request.
- Store private credentials securely.
- Use automated tests for cross-merchant data isolation.

### Risk 3: Shopify API changes, rate limits and synchronization

**Problem:** API version changes, request limits, stale product data and network failures can affect the application.

**Impact:** Incorrect availability, pricing or cart behavior.

**Mitigation:**
- Pin and regularly review supported API versions.
- Centralize Shopify API communication in an adapter.
- Use caching and controlled retries.
- Handle rate-limit responses.
- Use webhooks for synchronization.
- Validate prices and availability before checkout.

## 12. Recommended Production Technology Stack

| Layer | Technology |
|---|---|
| Mobile | React Native + TypeScript |
| Navigation | React Navigation |
| Client state | Zustand |
| Server state | TanStack Query |
| Local storage | AsyncStorage |
| Secure storage | Keychain / Keystore |
| Backend | Node.js / NestJS |
| Database | PostgreSQL |
| ORM | Prisma or TypeORM |
| Cache | Redis |
| API integration | Shopify GraphQL |
| Authentication | Shopify OAuth and customer authentication |
| Notifications | Firebase Cloud Messaging / OneSignal |
| Monitoring | Sentry |
| Analytics | Firebase Analytics / Amplitude |
| CI/CD | GitHub Actions |

## 13. Implementation Roadmap

**Phase 1 – Mobile prototype**
- Shared React Native screens.
- Merchant configurations.
- Mock product data.
- Cart management.
- Local persistence.
- Mock third-party integration.

**Phase 2 – Shopify integration**
- Connect Shopify development stores.
- Implement Storefront GraphQL queries.
- Implement Shopify cart operations.
- Implement checkout handoff.

**Phase 3 – Multi-merchant backend**
- Merchant registration.
- Shopify OAuth.
- Credential management.
- Merchant registry.
- Dynamic configuration.

**Phase 4 – Third-party integrations**
- Provider discovery and evaluation.
- Adapter implementation.
- Feature flags.
- Web fallbacks.

**Phase 5 – Production readiness**
- Security review.
- Performance optimization.
- Automated testing.
- Monitoring.
- CI/CD and store deployment.

## 14. Conclusion

The recommended architecture uses a shared React Native codebase, merchant-driven configuration and a provider-based integration layer.

This approach minimizes duplicated mobile code, supports merchant-specific experiences and makes it easier to add new integrations.

A backend merchant registry and secure Shopify authorization layer provide the foundation for scaling the solution into a production-ready multi-merchant platform.

The current assignment prototype demonstrates the mobile application and its configuration approach. The backend onboarding, live Shopify integration and production third-party connections are proposed extensions rather than completed features.