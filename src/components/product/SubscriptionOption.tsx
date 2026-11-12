
import React, {useState} from 'react';
import {View, StyleSheet, Switch, Alert} from 'react-native';

import AppText from '../common/AppText';
import {useStoreConfig} from '../../config/StoreContext';
import {spacing, radius} from '../../theme';

const SubscriptionOption = () => {
  const store = useStoreConfig();
  const [enabled, setEnabled] = useState(false);

  if (!store.features.subscriptions) {
    return null;
  }

  const handleToggle = (value: boolean) => {
    setEnabled(value);

    if (value) {
      Alert.alert(
        'Subscription selected',
        'Subscribe and save! Subscription checkout is a demo feature.',
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: store.theme.surface},
      ]}>
      <View style={styles.content}>
        <AppText variant="h3">
          Subscribe & Save
        </AppText>

        <AppText variant="bodySmall">
          Get your favourite products delivered regularly.
        </AppText>

        <AppText variant="caption">
          Subscription checkout is for demonstration only.
        </AppText>
      </View>

      <Switch
        value={enabled}
        onValueChange={handleToggle}
        trackColor={{
          false: '#CCCCCC',
          true: store.theme.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
});

export default SubscriptionOption;
