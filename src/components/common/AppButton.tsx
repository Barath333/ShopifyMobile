
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useStoreConfig} from '../../config/StoreContext';
import {typography, spacing, radius} from '../../theme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}: AppButtonProps) => {
  const store = useStoreConfig();
  const isPrimary = variant === 'primary';

  const backgroundColor = isPrimary
    ? store.theme.primary
    : store.theme.background;

  const textColor = isPrimary
    ? '#FFFFFF'
    : store.theme.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderWidth: isPrimary ? 0 : 1,
          borderColor: store.theme.border,
        },
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, {color: textColor}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    ...typography.button,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
