import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Category, Product as ProductProps } from './index';

interface CategoryIconProps {
  selected: boolean;
}

interface CategoryNameProps {
  selected: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #eaeaea;
`;

export const CategoriesListContainer = styled.View`
  height: 110px;
  padding-top: 20px;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<Category>,
)``;

export const CategoryContainer = styled(RectButton)`
  flex-direction: column;
  align-items: center;
  padding: 0 12px 0 16px;
  border-radius: 10px;
`;

export const CategoryIcon = styled.View<CategoryIconProps>`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${props => (props.selected ? '#9e9e9e' : '#3e3e3e')};
`;

export const CategoryName = styled.Text<CategoryNameProps>`
  margin-top: 5px;
  font-family: 'RobotoSlab-Medium';
  font-size: 12px;
  color: ${props => (props.selected ? '#9e9e9e' : '#3e3e3e')};
  font-weight: bold;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 10px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(
  FlatList as new () => FlatList<ProductProps>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;

export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #3e3e3e;
`;

export const ProductButton = styled.TouchableOpacity``;
