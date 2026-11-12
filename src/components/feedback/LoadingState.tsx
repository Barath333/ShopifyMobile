
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AppText from '../common/AppText';
import {colors, spacing} from '../../theme';

interface Props {
  message?: string;
}

const LoadingState = ({message = 'Loading...'}: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="bodySmall">{message}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
});

export default LoadingState;
