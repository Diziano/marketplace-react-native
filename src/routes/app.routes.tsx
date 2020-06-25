import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image, Text } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        title: 'Marketplace',
        headerStyle: {
          backgroundColor: '#3E3E3E',
        },
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: 'bold',
        },
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        title: 'Marketplace - Cart',
        headerStyle: {
          backgroundColor: '#3E3E3E',
        },
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} color={'#FFF'} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
