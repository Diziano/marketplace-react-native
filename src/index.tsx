import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <View style={{ backgroundColor: '#3e3e3e', flex: 1 }}>
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#3e3e3e" />
      <Routes />
    </AppContainer>
  </View>
);

export default App;
