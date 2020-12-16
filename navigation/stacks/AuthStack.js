import React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
