
import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {colors, typography} from '../../theme';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'button';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  children: React.ReactNode;
}

const AppText = ({
  variant = 'body',
  color = colors.textPrimary,
  style,
  children,
  ...rest
}: AppTextProps) => {
  return (
    <Text
      {...rest}
      style={[styles.base, typography[variant], {color}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

export default AppText;
