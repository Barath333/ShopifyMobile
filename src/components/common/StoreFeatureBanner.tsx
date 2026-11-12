import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppText from './AppText';
import {useStoreConfig} from '../../config/StoreContext';
import {spacing, radius} from '../../theme';

const StoreFeatureBanner = () => {
  const store = useStoreConfig();

  if (!store.features.loyalty) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: store.theme.surface},
      ]}>
      <AppText variant="h3">
        Rewards Program
      </AppText>

      <AppText variant="bodySmall">
        Earn rewards with every purchase at {store.name}.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: radius.md,
    marginVertical: spacing.md,
    gap: spacing.xs,
  },
});

export default StoreFeatureBanner;