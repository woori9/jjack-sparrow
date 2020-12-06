import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
      {/* <View style={styles.container}>
        <Text>default App!!</Text>
      </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
