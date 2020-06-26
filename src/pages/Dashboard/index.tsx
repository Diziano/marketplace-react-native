import React, { useState, useEffect, useCallback } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import { View, Image, Text } from 'react-native';

import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import api from '../../services/api';

import FloatingCart from '../../components/FloatingCart';

import {
  Container,
  CategoriesListContainer,
  CategoriesList,
  CategoryContainer,
  CategoryIcon,
  CategoryName,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles';

export interface Category {
  id: string;
  title: string;
  icon: {
    type: string;
    name: string;
  };
}

export interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/products', {
        params: {
          category_like: selectedCategory || undefined,
        },
      });

      setProducts(response.data);
    }

    loadProducts();
  }, [selectedCategory]);

  function handleAddToCart(item: Product): void {
    addToCart(item);
  }

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      selectedCategory === categoryId
        ? setSelectedCategory(undefined)
        : setSelectedCategory(categoryId);
    },
    [selectedCategory],
  );

  return (
    <Container>
      <CategoriesListContainer>
        <CategoriesList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={category => category.id.toString()}
          renderItem={({ item: category }) => (
            <CategoryContainer
              onPress={() => handleSelectCategory(category.id)}
            >
              <CategoryIcon selected={category.id === selectedCategory}>
                {category.icon.type === 'feather' && (
                  <Feather size={26} name={category.icon.name} color="#FFF" />
                )}

                {category.icon.type === 'fontawesome' && (
                  <FontAwesome
                    size={26}
                    name={category.icon.name}
                    color="#FFF"
                  />
                )}
              </CategoryIcon>

              <CategoryName selected={category.id === selectedCategory}>
                {category.title}
              </CategoryName>
            </CategoryContainer>
          )}
        />
      </CategoriesListContainer>

      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: Product }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}
                >
                  <FontAwesome size={20} name="plus" color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Dashboard;
