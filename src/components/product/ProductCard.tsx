
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import AppText from '../common/AppText';
import {Product} from '../../types/product';
import {colors, spacing, radius} from '../../theme';
import {useStoreConfig} from '../../config/StoreContext';
import {formatCurrency} from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard = ({product, onPress}: ProductCardProps) => {
    const store = useStoreConfig();
const price = product.variants[0]?.price ?? 0;


  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{uri: product.image}} style={styles.image} />

      <View style={styles.details}>
        <AppText variant="body" style={styles.title}>
          {product.title}
        </AppText>

        <AppText variant="caption" color={colors.secondary}>
          {product.category}
        </AppText>

       <AppText variant="body" style={styles.price}>
  {formatCurrency(price, store)}
</AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: 210,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
  details: {
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    fontWeight: '600',
  },
  price: {
    fontWeight: '700',
  },
});

export default ProductCard;
