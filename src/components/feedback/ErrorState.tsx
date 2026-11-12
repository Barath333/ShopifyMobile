
import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import {colors, spacing} from '../../theme';

interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({message, onRetry}: Props) => {
  return (
    <View style={styles.container}>
      <AppText variant="h3" color={colors.error}>
        Something went wrong
      </AppText>

      <AppText variant="bodySmall">
        {message}
      </AppText>

      <AppButton
        title="Try Again"
        variant="primary"
        onPress={onRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
});

export default ErrorState;
