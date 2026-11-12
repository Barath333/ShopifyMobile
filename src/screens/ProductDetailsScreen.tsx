
import React, {useEffect, useState} from 'react';

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import VariantSelector from '../components/product/VariantSelector';
import SubscriptionOption from '../components/product/SubscriptionOption';

import {getProductById} from '../services/productRepository';
import {getProductReviews} from '../services/integrations/reviewsService';

import {Product, ProductVariant} from '../types/product';
import {Review} from '../types/review';

import {useStoreConfig} from '../config/StoreContext';
import {formatCurrency} from '../utils/formatCurrency';
import {useCartStore} from '../store/cartStore';

import {colors, spacing, radius} from '../theme';

interface Props {
  route: {
    params: {
      productId: string;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const ProductDetailsScreen = ({route, navigation}: Props) => {
  const store = useStoreConfig();
  const {productId} = route.params;

  // Product state
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Selected variant
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(null);

  // Cart action
  const addToCart = useCartStore(state => state.addToCart);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState('');

  // In-app feedback popup
  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    type: 'error' | 'success';
  } | null>(null);

  // Load product
  async function loadProduct() {
    try {
      setLoading(true);
      setError(false);

      const result = await getProductById(store.id, productId);

      setProduct(result);
      setSelectedVariant(null);
    } catch (err) {
      console.log('Failed to load product:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId, store.id]);

  // Load reviews
  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      setReviewsError('');

      const response = await getProductReviews(productId);

      setReviews(response);
    } catch (err) {
      setReviewsError('Reviews are currently unavailable.');
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  // Add product to cart
  const handleAddToCart = () => {
    if (!selectedVariant) {
      setFeedback({
        title: 'Select a Variant',
        message:
          'Please select a size before adding this product to your cart.',
        type: 'error',
      });
      return;
    }

    if (!selectedVariant.available) {
      setFeedback({
        title: 'Currently Unavailable',
        message:
          'This size is currently out of stock. Please select another size.',
        type: 'error',
      });
      return;
    }

    try {
      addToCart(product!, selectedVariant);

      setFeedback({
        title: 'Successfully Added!',
        message: `${product!.title} (${selectedVariant.size}) has been added to your cart.`,
        type: 'success',
      });
    } catch (err) {
      setFeedback({
        title: 'Something went wrong',
        message:
          'Unable to add this product to your cart. Please try again.',
        type: 'error',
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <AppText>Unable to load product.</AppText>
        <AppButton title="Try Again" onPress={loadProduct} />
      </SafeAreaView>
    );
  }

  // Product not found
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <AppText variant="h2">Product not found</AppText>
        <AppButton title="Go Back" onPress={navigation.goBack} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={navigation.goBack}
          style={styles.backButton}>
          <AppText variant="body">← Back</AppText>
        </Pressable>

        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.details}>
          <AppText variant="caption" color={colors.secondary}>
            {product.category}
          </AppText>

          <AppText variant="h2">{product.title}</AppText>

          <AppText variant="h3">
            {formatCurrency(
              selectedVariant?.price ??
                product.variants[0]?.price ??
                0,
              store,
            )}
          </AppText>

          <View style={styles.divider} />

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={setSelectedVariant}
          />

          <SubscriptionOption />

          {/* Customer Reviews */}
          <View style={styles.divider} />

          <AppText variant="h3">Customer Reviews</AppText>

          {reviewsLoading ? (
            <AppText>Loading reviews...</AppText>
          ) : reviewsError ? (
            <View>
              <AppText color={colors.error}>
                {reviewsError}
              </AppText>

              <AppButton
                title="Retry"
                variant="secondary"
                onPress={loadReviews}
              />
            </View>
          ) : reviews.length === 0 ? (
            <AppText>No reviews available yet.</AppText>
          ) : (
            reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <AppText variant="body">
                  {review.customerName} · ⭐ {review.rating}/5
                </AppText>

                <AppText variant="bodySmall">
                  {review.comment}
                </AppText>
              </View>
            ))
          )}

          {/* Add to Cart */}
          <View style={styles.addButton}>
            <AppButton
              title="Add to Cart"
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </ScrollView>

      {/* In-app Feedback Popup */}
      {feedback && (
        <View style={styles.feedbackOverlay}>
          <View style={styles.feedbackCard}>
            <AppText
              variant="h2"
              color={
                feedback.type === 'success'
                  ? colors.success
                  : colors.error
              }>
              {feedback.type === 'success' ? '✓' : '!'}
            </AppText>

            <AppText variant="h3">
              {feedback.title}
            </AppText>

            <AppText
              color={colors.secondary}
              >
              {feedback.message}
            </AppText>

            {feedback.type === 'success' ? (
              <>
                <AppButton
                  title="View Cart"
                  onPress={() => {
                    setFeedback(null);
                    navigation.navigate('Cart');
                  }}
                />

                <AppButton
                  title="Continue Shopping"
                  variant="secondary"
                  onPress={() => setFeedback(null)}
                />
              </>
            ) : (
              <AppButton
                title="OK"
                onPress={() => setFeedback(null)}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  backButton: {
    padding: spacing.lg,
  },

  image: {
    width: '100%',
    height: 400,
    backgroundColor: colors.surface,
  },

  details: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },

  addButton: {
    marginTop: spacing.lg,
  },

  reviewCard: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    gap: spacing.xs,
  },

  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    zIndex: 100,
    elevation: 100,
  },

  feedbackCard: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
