
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
} from 'react-native';

import AppText from '../components/common/AppText';
import ProductCard from '../components/product/ProductCard';
import {colors, spacing} from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useStoreConfig} from '../config/StoreContext';
import {getProducts} from '../services/productRepository';
import {useEffect, useState} from 'react';
import {Product} from '../types/product';
import StoreFeatureBanner from '../components/common/StoreFeatureBanner';



interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
   const store = useStoreConfig();
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
  loadProducts();
}, [store.id]);

async function loadProducts() {
  try {
    setLoading(true);
    setError(false);

    const result = await getProducts(store.id);

    setProducts(result);
  } catch (error) {
    console.log('Failed to load products:', error);
    setError(true);
  } finally {
    setLoading(false);
  }
}

if (error) {
  return (
    <View style={styles.container}>
      <Text>Unable to load products.</Text>

      <Pressable onPress={loadProducts}>
        <Text>Try Again</Text>
      </Pressable>
    </View>
  );
}

  return (

<>
    {loading ? (
  <ActivityIndicator size="large" />
) : (
  // Keep your existing product listing here
   <SafeAreaView style={[
    styles.container,
    {backgroundColor: store.theme.background},
  ]}>
      <View style={styles.header}>
        <View>
        <AppText variant="h2">{store.name}</AppText>

<AppText variant="caption" color={store.theme.secondary}>
  {store.tagline}
</AppText>
<StoreFeatureBanner />
        </View>

        <Pressable onPress={() => navigation.navigate('Cart')}>
          <AppText variant="body">Cart</AppText>
        </Pressable>
      </View>

      <View style={styles.heading}>
        <AppText variant="h2">New Arrivals</AppText>
        <AppText variant="bodySmall" color={colors.secondary}>
          Discover our latest collection
        </AppText>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
)}
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heading: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    gap: spacing.md,
  },
});

export default HomeScreen;
