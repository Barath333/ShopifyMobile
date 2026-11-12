
import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';

import AppText from '../common/AppText';
import {colors, spacing, radius} from '../../theme';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrease} style={styles.button}>
        <AppText variant="h3">−</AppText>
      </Pressable>

      <AppText variant="body">{quantity}</AppText>

      <Pressable onPress={onIncrease} style={styles.button}>
        <AppText variant="h3">+</AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuantitySelector;
