
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import CartItem from '../components/cart/CartItem';

import {useCartStore} from '../store/cartStore';
import {colors, spacing} from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStoreConfig } from '../config/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const CartScreen = ({navigation}: Props) => {
    const store = useStoreConfig();
  const items = useCartStore(state => state.items);
  const increaseQuantity = useCartStore(
    state => state.increaseQuantity,
  );
  const decreaseQuantity = useCartStore(
    state => state.decreaseQuantity,
  );
  const removeItem = useCartStore(state => state.removeItem);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.variant.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'This is a demo checkout. In production, checkout will be handled through Shopify.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppText variant="h2">My Cart</AppText>
        <AppText
          variant="body"
          color={colors.secondary}
          onPress={navigation.goBack}>
          Continue Shopping
        </AppText>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText variant="h2">Your cart is empty</AppText>

          <AppText
            variant="body"
            color={colors.secondary}>
            Looks like you haven't added anything yet.
          </AppText>

          <AppButton
            title="Start Shopping"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.variant.id}
            contentContainerStyle={styles.list}
            renderItem={({item}) => (
              <CartItem
                item={item}
                onIncrease={() =>
                  increaseQuantity(item.variant.id)
                }
                onDecrease={() =>
                  decreaseQuantity(item.variant.id)
                }
                onRemove={() =>
                  removeItem(item.variant.id)
                }
              />
            )}
          />

          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <AppText variant="h3">Subtotal</AppText>

             <AppText variant="h3">
  {formatCurrency(subtotal, store)}
</AppText>
            </View>

            <AppText
              variant="caption"
              color={colors.secondary}>
              Shipping and taxes calculated at checkout.
            </AppText>

            <AppButton
              title="Proceed to Checkout"
              onPress={handleCheckout}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  summary: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
});

export default CartScreen;
