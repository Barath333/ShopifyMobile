
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import AppText from '../common/AppText';
import QuantitySelector from './QuantitySelector';

import {CartItem as CartItemType} from '../../store/cartStore';
import {colors, spacing, radius} from '../../theme';
import {useStoreConfig} from '../../config/StoreContext';
import {formatCurrency} from '../../utils/formatCurrency';

interface Props {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
    const store = useStoreConfig();
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.product.image}}
        style={styles.image}
      />

      <View style={styles.details}>
        <AppText variant="body" style={styles.title}>
          {item.product.title}
        </AppText>

        <AppText variant="caption" color={colors.secondary}>
          Size: {item.variant.size}
        </AppText>

   <AppText variant="body">
  {formatCurrency(item.variant.price, store)}
</AppText>

        <QuantitySelector
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </View>

      <Pressable onPress={onRemove}>
        <AppText variant="caption" color={colors.error}>
          Remove
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  image: {
    width: 105,
    height: 125,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  details: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    fontWeight: '600',
  },
});

export default CartItem;
