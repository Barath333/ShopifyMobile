
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import {colors, spacing} from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useStoreConfig} from '../config/StoreContext';

interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
    const store = useStoreConfig();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.brand}>
          <AppText variant="h2">{store.name}</AppText>

<AppText variant="caption" color={store.theme.secondary}>
  {store.tagline}
</AppText>
        </View>

        <View style={styles.introduction}>
          <AppText variant="h1">
            YOUR JOURNEY. YOUR STYLE.
          </AppText>

          <AppText
            variant="body"
            color={colors.secondary}
            style={styles.description}>
            Discover performance clothing and gear designed
            to help you reach your goals.
          </AppText>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Get Started"
            onPress={() => navigation.navigate('Home')}
          />

          <AppText
            variant="bodySmall"
            color={colors.secondary}
            style={styles.skip}
            onPress={() => navigation.navigate('Home')}>
            Skip
          </AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    gap: spacing.xs,
  },
  introduction: {
    gap: spacing.md,
  },
  description: {
    lineHeight: 24,
  },
  actions: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  skip: {
    textAlign: 'center',
    padding: spacing.sm,
  },
});

export default WelcomeScreen;
