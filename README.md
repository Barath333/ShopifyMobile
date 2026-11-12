# Shopify Mobile Commerce Application

A reusable React Native mobile commerce application designed to support multiple Shopify merchants through a shared codebase and merchant-specific configurations.

## 1. Project Overview

This project demonstrates a multi-merchant mobile commerce application using React Native and TypeScript.

The application currently includes two sample merchants:

- **Gymshark** – Black-and-white branding with USD currency.
- **FlexFit** – Green branding with INR currency.

Both merchants use the same application screens and reusable components. Merchant-specific branding, currency, products, and optional features are controlled through configuration.

**Important:** This assignment uses mock product data for the working demonstration. Shopify Storefront API integration code and GraphQL operations are prepared as an integration foundation. A live Shopify store is not connected.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile application |
| TypeScript | Type safety |
| React Navigation | Screen navigation |
| Zustand | Cart state management |
| AsyncStorage | Local cart persistence |
| Shopify Storefront GraphQL | Planned product and cart integration |
| Jest | Testing foundation |

## 3. Features Implemented

### Application
- Welcome screen.
- Product listing screen.
- Product details screen.
- Product variant selection.
- Shopping cart.
- Quantity updates and item removal.
- Cart persistence using AsyncStorage.
- Loading, error, retry and empty states.

### Multi-Merchant Support
- Gymshark and FlexFit configurations.
- Merchant-specific branding and themes.
- Merchant-specific products.
- Currency formatting.
- Configurable feature visibility.
- Separate local cart storage for each merchant.

### Optional Integrations
- Mock product reviews integration.
- Reviews success and unavailable states.
- Configurable loyalty banner.
- Subscription option demonstration.

## 4. Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── product/
│   ├── cart/
│   └── integrations/
│
├── config/
│   ├── stores.ts
│   └── StoreContext.tsx
│
├── data/
│   └── storeProducts.ts
│
├── navigation/
│
├── screens/
│   ├── WelcomeScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   └── CartScreen.tsx
│
├── services/
│   ├── providers/
│   ├── integrations/
│   ├── shopify/
│   └── productRepository.ts
│
├── store/
│   └── cartStore.ts
│
├── theme/
├── types/
└── utils/
```

## 5. Installation and Setup

### Prerequisites

- Node.js
- npm
- React Native development environment
- Android Studio for Android
- Xcode and CocoaPods for iOS

### Install dependencies

```bash
npm install
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
cd ios
pod install
cd ..
npm run ios
```

### Start Metro

```bash
npm start
```

### TypeScript validation

```bash
npx tsc --noEmit
```

## 6. Merchant Configuration

Merchant configuration is maintained in:

```text
src/config/stores.ts
```

The active merchant is selected using:

```typescript
export const ACTIVE_STORE_ID = 'gymshark';
```

To run the FlexFit configuration:

```typescript
export const ACTIVE_STORE_ID = 'flexfit';
```

The StoreContext provides the active merchant configuration to the application.

Merchant configuration controls:

- Store name and tagline.
- Theme colors.
- Currency and currency symbol.
- Optional feature availability.

The current demonstration uses build/configuration-time merchant selection. Changing the merchant requires a new release build for separately branded merchant applications.

A production multi-merchant platform can use a backend configuration service to load merchant settings dynamically.

## 7. State Management and Persistence

Zustand manages the shopping cart.

Cart operations include:

- Add product.
- Increase quantity.
- Decrease quantity.
- Remove item.
- Clear cart.

AsyncStorage persists cart information locally.

The storage key includes the active merchant ID:

```typescript
shopify-cart-storage-${ACTIVE_STORE_ID}
```

This keeps local cart data separate between the two merchant configurations.

## 8. Product Data Architecture

The application uses a provider-based product repository.

Two providers are prepared:

**Mock Product Provider**
- Supplies sample merchant products.
- Used for the current working demonstration.

**Shopify Product Provider**
- Uses the Shopify product service.
- Maps Shopify product and variant responses into the application's common Product model.
- Prepared for Storefront GraphQL integration.

The active provider is selected in:

```text
src/services/productRepository.ts
```

Currently:

```typescript
const productProvider: ProductProvider = mockProductProvider;
```

For a configured Shopify integration, this can be switched to the Shopify provider.

## 9. Shopify Integration Approach

The application includes a Shopify Storefront GraphQL client foundation and sample operations.

Planned production integration:

1. Merchant registers their Shopify store.
2. Backend handles merchant authorization and onboarding.
3. Store-specific Shopify credentials are securely managed.
4. Mobile application requests product information through the configured integration.
5. Shopify product and variant data are mapped into common application models.
6. Cart operations use Shopify Cart API mutations.
7. Checkout is handed off to Shopify's returned checkout URL.

### GraphQL operations prepared

- Product listing query.
- Product and variant information.
- Cart creation.
- Add cart lines.
- Update cart lines.
- Remove cart lines.

**Security:** Private Shopify Admin API credentials must never be embedded in the mobile application. Merchant authorization and private credentials should be handled by a secure backend.

## 10. Production Architecture Considerations

For a production multi-merchant solution:

- Use a backend merchant registry.
- Support merchant onboarding and Shopify OAuth.
- Store merchant credentials securely on the backend.
- Use a configurable integration/provider layer.
- Support merchant-specific feature flags.
- Implement API caching and synchronization.
- Provide secure checkout handoff.
- Implement monitoring, analytics and error reporting.

## 11. Current Limitations

The following items are not implemented as live production integrations:

- Live Shopify store connection.
- Merchant OAuth and onboarding backend.
- Real Shopify checkout and payment processing.
- Live third-party reviews and loyalty services.
- Live subscription provider.
- Production merchant configuration service.

The application uses mock product data and simulated third-party integration responses where applicable.

## 12. Platforms

- Android
- iOS

## 13. Development Notes

The project was developed using React Native CLI and TypeScript.

AI-assisted development tools were used for implementation guidance and troubleshooting. Generated suggestions were reviewed and corrected during development.

Testing results, known issues and remaining limitations should be documented based on the final verification performed before submission.

---

**Project:** Shopify Mobile Commerce Application
**Purpose:** Multi-merchant React Native technical assignment
**Architecture:** Shared React Native codebase with configurable merchant integrations
