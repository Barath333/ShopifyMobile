
import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';

import AppText from '../common/AppText';
import {ProductVariant} from '../../types/product';
import {colors, spacing, radius} from '../../theme';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
}

const VariantSelector = ({
  variants,
  selectedVariant,
  onSelect,
}: VariantSelectorProps) => {
  return (
    <View style={styles.container}>
      <AppText variant="h3">Select Size</AppText>

      <View style={styles.options}>
        {variants.map(variant => {
          const selected = selectedVariant?.id === variant.id;

          return (
            <Pressable
              key={variant.id}
              disabled={!variant.available}
              onPress={() => onSelect(variant)}
              style={[
                styles.option,
                selected && styles.selected,
                !variant.available && styles.unavailable,
              ]}>
              <AppText
                color={
                  !variant.available
                    ? colors.secondary
                    : selected
                      ? colors.white
                      : colors.textPrimary
                }>
                {variant.size}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <AppText variant="caption" color={colors.secondary}>
        Unavailable sizes cannot be selected.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  options: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  option: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unavailable: {
    backgroundColor: colors.surface,
    opacity: 0.4,
  },
});

export default VariantSelector;
