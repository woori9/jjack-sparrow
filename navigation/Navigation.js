import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegAddressScreen from '../screens/RegAddressScreen';

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AddressStack = createStackNavigator();
//headerMode='none'

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const AddressStackNavigator = () => {
  return (
    <AddressStack.Navigator>
      <AddressStack.Screen name="RegAddress" component={RegAddressScreen} />
    </AddressStack.Navigator>
  );
};

const Navigation = () => {
  const user = useSelector(state => state.user);
  console.log("^^", user);
  const { userData } = user;

  return user.isLoggedIn ?
    (userData.address ? <HomeStackNavigator /> : <AddressStackNavigator />) :
    <AuthStackNavigator />
};

export default Navigation;
