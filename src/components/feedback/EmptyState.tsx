
import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../common/AppText';
import {spacing} from '../../theme';

interface Props {
  title: string;
  description?: string;
}

const EmptyState = ({title, description}: Props) => {
  return (
    <View style={styles.container}>
      <AppText variant="h3">{title}</AppText>

      {description ? (
        <AppText variant="bodySmall">
          {description}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
});

export default EmptyState;
