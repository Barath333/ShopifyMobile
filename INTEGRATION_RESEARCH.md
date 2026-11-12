# Shopify Third-Party App Integration Research

## 1. Objective

The purpose of this research is to identify how common Shopify merchant applications can be integrated into a shared React Native mobile commerce application.

Not every Shopify application provides a native mobile SDK. Therefore, each integration should be evaluated based on:

- Public API availability.
- SDK availability.
- Authentication requirements.
- Shopify compatibility.
- Mobile application support.
- Merchant permissions and pricing.
- Security and maintenance requirements.

The proposed architecture uses a provider-based integration layer so that merchants can select supported services without requiring changes to the core mobile screens.

## 2. Integration Strategy

Each integration is classified into one of four approaches.

| Approach | Description |
|---|---|
| Shopify-native | Use functionality already provided by Shopify APIs or extensions. |
| API / SDK integration | Connect to a third-party service through its API or mobile SDK. |
| Web fallback | Open a provider-hosted experience using a secure browser or WebView. |
| Custom development | Build an adapter or custom feature when existing integrations are insufficient. |

An integration should be marked unsupported if no secure, maintainable integration path is available.

## 3. Third-Party Provider Research

### 3.1 Product Reviews and Ratings

Candidate providers:
- Judge.me
- Yotpo
- Okendo

**Recommended approach: API integration**

Judge.me provides APIs to retrieve and create product reviews. Its documentation distinguishes public API tokens from private API tokens.

The private API token should remain on the backend. The mobile application should retrieve review information through an authenticated application backend or an appropriate public endpoint.

Potential mobile features:
- Display product ratings.
- Show customer reviews.
- Display review images where supported.
- Submit customer reviews.
- Filter reviews by rating.

**Recommendation:** Start with Judge.me as a candidate provider because its documented API supports retrieving product review information.

Documentation:
https://judge.me/api

### 3.2 Loyalty and Rewards

Candidate providers:
- Smile.io
- LoyaltyLion
- Yotpo Loyalty
- Rivo

**Recommended approach: API / SDK integration**

Smile.io documents REST API access and JavaScript SDK capabilities. API availability depends on the merchant's subscription plan.

Potential mobile features:
- Display loyalty points.
- Display available rewards.
- Show VIP membership tiers.
- Redeem rewards.
- Display loyalty activity.

The backend should manage provider credentials and customer identity mapping.

**Recommendation:** Evaluate Smile.io first for merchants requiring a loyalty experience. Confirm API access and commercial plan requirements before implementation.

Documentation:
https://dev.smile.io/

### 3.3 Subscription Management

Candidate providers:
- Recharge
- Appstle Subscriptions

**Recommended approach: API integration with hosted checkout or web fallback**

Recharge provides APIs for subscription products, checkout and customer subscription management.

Potential mobile features:
- Display subscription purchase options.
- Select delivery frequency.
- Create subscription orders.
- View active subscriptions.
- Pause or cancel subscriptions.
- Manage upcoming orders.

Recharge supports hosted checkout and API-based custom checkout approaches. A hosted experience can reduce the need to handle sensitive payment information in the mobile application.

**Recommendation:** Evaluate Recharge for merchants that sell recurring products. Use its supported checkout and customer portal flows rather than implementing recurring payment processing independently.

Documentation:
https://docs.getrecharge.com/

### 3.4 Search and Product Discovery

Candidate providers:
- Algolia
- Searchanise

**Recommended approach: API integration**

Algolia provides search capabilities and Shopify integration options.

Potential mobile features:
- Product search.
- Search suggestions.
- Filtering by category, size and price.
- Sorting.
- Search result ranking.
- Product discovery.

For a custom React Native application, the search provider can be accessed through an appropriate client API, with sensitive credentials and indexing operations managed securely.

**Recommendation:** Evaluate Algolia for merchants requiring advanced search and product discovery.

Documentation:
https://www.algolia.com/developers/code-exchange/integrate-shopify-with-algolia

### 3.5 Discounts and Product Bundles

Candidate approaches:
- Shopify Discount API.
- Shopify Functions.
- Shopify Bundles.
- Third-party bundle applications.

**Recommended approach: Shopify-native first**

Shopify supports discount management through its Admin GraphQL API and Shopify Functions.

Potential features:
- Discount codes.
- Automatic discounts.
- Product discounts.
- Order discounts.
- Shipping discounts.
- Volume discounts.
- Bundle pricing.

The mobile application should retrieve and display valid pricing information from Shopify rather than calculating authoritative discounts independently.

Some advanced bundle applications may require a dedicated API integration or web fallback.

**Recommendation:** Prefer Shopify-native discount functionality. Evaluate third-party bundle providers individually.

Documentation:
https://shopify.dev/docs/apps/build/discounts

### 3.6 Push Notifications

Candidate providers:
- Firebase Cloud Messaging.
- OneSignal.

**Recommended approach: Native mobile SDK with backend integration**

Potential features:
- Order confirmation.
- Shipping updates.
- Delivery notifications.
- Promotional notifications.
- Abandoned cart reminders.
- Loyalty reward notifications.

Firebase Cloud Messaging supports push notification delivery to Android and iOS applications.

OneSignal provides a React Native SDK for push notifications and in-app messaging.

The backend should associate device tokens with the correct merchant and customer. Notification payloads must be validated to prevent cross-merchant notifications.

**Recommendation:** Use FCM for a basic notification infrastructure or evaluate OneSignal when additional campaign and in-app messaging functionality is required.

Documentation:
https://firebase.google.com/docs/cloud-messaging

https://github.com/OneSignal/react-native-onesignal

### 3.7 Analytics

Candidate providers:
- Firebase Analytics.
- Amplitude.

**Recommended approach: Native SDK / event adapter**

Potential events:
- App opened.
- Product viewed.
- Search performed.
- Product added to cart.
- Checkout initiated.
- Purchase completed.
- Loyalty reward viewed.

The application should use a common analytics interface so that merchant-specific analytics providers can be configured without modifying screen components.

Customer consent, privacy requirements and data-sharing policies must be considered.

**Recommendation:** Use Firebase Analytics for a straightforward mobile analytics implementation. Evaluate Amplitude for more advanced behavioral analysis.

### 3.8 Customer Support

Candidate providers:
- Gorgias.
- Zendesk.

**Recommended approach: API / SDK or web fallback**

Potential features:
- Customer support chat.
- Order-related questions.
- Support ticket creation.
- Conversation history.
- Customer identification.

Gorgias provides developer APIs and Shopify integrations.

If a suitable native mobile SDK is unavailable for the selected provider, use its supported web-based experience or implement a backend-mediated support interface.

**Recommendation:** Evaluate Gorgias for Shopify-focused customer support workflows.

Documentation:
https://developers.gorgias.com/

### 3.9 Shipping and Order Tracking

Candidate providers:
- AfterShip.
- 17TRACK.

**Recommended approach: API integration**

AfterShip provides tracking APIs and webhooks.

Potential features:
- Display shipment status.
- Display carrier information.
- Show tracking checkpoints.
- Notify customers when shipment status changes.
- Display estimated delivery information where available.

The backend can receive tracking webhooks and update the application's order information.

**Recommendation:** Evaluate AfterShip for a unified shipment tracking experience across multiple carriers.

Documentation:
https://www.aftership.com/docs/tracking/

### 3.10 Returns and Refunds

Candidate providers:
- Loop Returns.
- AfterShip Returns.

**Recommended approach: API integration or web fallback**

Potential features:
- View return eligibility.
- Initiate return requests.
- Select return reasons.
- Track return status.
- View refund progress.

Shopify's Returns API provides native return-related capabilities. Loop Returns also documents integration with Shopify Returns APIs.

The application should not assume that every third-party return workflow can be fully reproduced through a public API.

**Recommendation:** Prefer Shopify Returns API where it meets merchant requirements. Use Loop Returns or AfterShip Returns when merchants require more advanced return workflows.

Documentation:

https://help.loopreturns.com/en/articles/1919681

https://support.aftership.com/en/returns/articles/15389545-auto-update-return-status-to-shopify-with-shopify-returns-api

## 4. Provider Evaluation Matrix

| Integration category | Example provider | Proposed method |
|---|---|---|
| Reviews | Judge.me | API |
| Loyalty | Smile.io | API / SDK |
| Subscriptions | Recharge | API / hosted checkout |
| Search | Algolia | API / client |
| Discounts | Shopify | Native API / Functions |
| Bundles | Shopify / third-party app | Native or custom adapter |
| Notifications | FCM / OneSignal | Native SDK |
| Analytics | Firebase / Amplitude | Native SDK |
| Customer support | Gorgias | API / web fallback |
| Tracking | AfterShip | API / webhooks |
| Returns | Loop Returns | API / web fallback |

These are proposed integration choices, not claims that every provider has a compatible React Native SDK or that every feature is available on every merchant plan.

## 5. Proposed Integration Adapter Architecture

Every third-party service should be accessed through a common interface.

Example:

```typescript
interface ReviewsProvider {
  getProductReviews(
    storeId: string,
    productId: string
  ): Promise<Review[]>;

  getAverageRating(
    storeId: string,
    productId: string
  ): Promise<number>;
}
```

Possible implementations:

```text
integrations/
├── reviews/
│   ├── reviewsProvider.ts
│   └── judgeMeProvider.ts
│
├── loyalty/
│   ├── loyaltyProvider.ts
│   └── smileProvider.ts
│
├── subscriptions/
│   ├── subscriptionProvider.ts
│   └── rechargeProvider.ts
│
├── search/
│   ├── searchProvider.ts
│   └── algoliaProvider.ts
│
└── tracking/
    ├── trackingProvider.ts
    └── afterShipProvider.ts
```

The mobile screens communicate with the common interfaces rather than directly depending on individual vendors.

This makes it possible to replace a provider without rewriting the presentation layer.

## 6. Merchant Integration Configuration

A merchant's enabled integrations can be represented through backend-managed configuration.

Example:

```typescript
interface MerchantIntegrations {
  reviews?: {
    enabled: boolean;
    provider: string;
  };

  loyalty?: {
    enabled: boolean;
    provider: string;
  };

  subscriptions?: {
    enabled: boolean;
    provider: string;
  };

  search?: {
    enabled: boolean;
    provider: string;
  };

  tracking?: {
    enabled: boolean;
    provider: string;
  };
}
```

Example merchant configuration:

```json
{
  "merchantId": "gymshark",
  "integrations": {
    "reviews": {
      "enabled": true,
      "provider": "judge_me"
    },
    "loyalty": {
      "enabled": false,
      "provider": "smile"
    },
    "subscriptions": {
      "enabled": false,
      "provider": "recharge"
    }
  }
}
```

The backend resolves provider credentials using the merchant ID.

Private API keys must never be stored in the mobile application or exposed through merchant configuration responses.

## 7. Handling Unsupported Shopify Applications

Not all Shopify applications provide suitable APIs or SDKs for mobile applications.

The proposed onboarding process:

1. Identify the Shopify app installed by the merchant.
2. Review its official documentation.
3. Verify API and SDK availability.
4. Check authentication and permissions.
5. Check whether its features can be accessed outside the Shopify theme.
6. Test the integration against a development store.
7. Select the most suitable integration approach.

Possible outcomes:

- Shopify-native implementation.
- Direct API integration.
- Native SDK integration.
- Secure web fallback.
- Custom development.
- Unsupported.

This avoids promising functionality that cannot be delivered reliably.

## 8. Security and Operational Considerations

- Private provider credentials remain on the backend.
- Merchant credentials must be isolated by tenant.
- OAuth should be preferred when supported.
- Only necessary API permissions should be requested.
- All communication should use HTTPS.
- Webhook signatures should be verified.
- Customer identity must be mapped correctly between Shopify and third-party providers.
- Provider failures should not crash the main shopping experience.
- Implement retries and appropriate error handling.
- Monitor provider API usage and rate limits.
- Review pricing and plan restrictions before onboarding merchants.

## 9. Final Recommendation

Use Shopify-native functionality wherever possible and introduce third-party integrations only when they provide additional value.

The recommended design is a provider-based integration architecture with backend-managed credentials, merchant-specific feature configuration and controlled web fallbacks.

This approach allows new merchants to select different supported providers while preserving a shared React Native codebase.

The proposed integrations should be validated individually during production onboarding before being advertised as supported features.

## 10. Research Sources

- Judge.me API: https://judge.me/api
- Smile.io developer documentation: https://dev.smile.io/
- Recharge API: https://docs.getrecharge.com/
- Algolia Shopify integration: https://www.algolia.com/developers/code-exchange/integrate-shopify-with-algolia
- Shopify discounts: https://shopify.dev/docs/apps/build/discounts
- OneSignal React Native SDK: https://github.com/OneSignal/react-native-onesignal
- Firebase Cloud Messaging: https://firebase.google.com/docs/cloud-messaging
- Gorgias developer documentation: https://developers.gorgias.com/
- AfterShip Tracking API: https://www.aftership.com/docs/tracking/
- Loop Returns and Shopify Returns API: https://help.loopreturns.com/en/articles/1919681