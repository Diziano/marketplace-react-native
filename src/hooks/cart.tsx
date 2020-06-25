import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsData = await AsyncStorage.getItem('@Marketplace:products');

      if (productsData) {
        setProducts(JSON.parse(productsData));
      }
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const newProducts = products.map(product => {
        return product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product;
      });

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@Marketplace:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = products
        .map(product => {
          return product.id === id
            ? {
                ...product,
                quantity: product.quantity > 0 ? product.quantity - 1 : 0,
              }
            : product;
        })
        .filter(product => product.quantity > 0);

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@Marketplace:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const exist = products.find(current => current.id === product.id);

      if (exist) {
        increment(product.id);
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);

        await AsyncStorage.setItem(
          '@Marketplace:products',
          JSON.stringify(products),
        );
      }
    },
    [increment, products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
