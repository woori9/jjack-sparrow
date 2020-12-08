import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegAddressScreen from '../screens/RegAddressScreen';
import MatchScreen from '../screens/MatchScreen';
import ChatScreen from '../screens/ChatScreen';
import CalenderScreen from '../screens/CalendarScreen';
import PetProfileScreen from '../screens/PetProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Navigation = () => {
  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();
  const AddressStack = createStackNavigator();
  //headerMode='none'
  const Tabs = createBottomTabNavigator();
  const HomeTabs = () => {
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Calendar" component={CalenderScreen} />
        <Tabs.Screen name="Match" component={MatchScreen} />
        <Tabs.Screen name="Chat" component={ChatScreen} />
      </Tabs.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();

  const HomeDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
        <Drawer.Screen name="PetProfile" component={PetProfileScreen} />
      </Drawer.Navigator>
    );
  };

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeTabs} />
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

  const user = useSelector(state => state.user);
  console.log("^^", user);
  const { userData } = user;

  return user.isLoggedIn ?
    (userData.address ? <HomeDrawer /> : <AddressStackNavigator />) :
    <AuthStackNavigator />
};

export default Navigation;
