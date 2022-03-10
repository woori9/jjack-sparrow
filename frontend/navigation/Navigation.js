import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../screens/DrawerContent';
import { Ionicons } from '@expo/vector-icons';
import ReviewScreen from '../screens/ReviewScreen';
import MatchStackScreen from './stacks/MatchStack';
import { PetProfileStackScreen, UserProfileStackScreen } from './stacks/ProfileStack';
import AuthStackScreen from './stacks/AuthStack';
import AddressStackScreen from './stacks/AddressStack';
import ChatStackScreen from './stacks/ChatStack';
import CalenderStackScreen from './stacks/CalenderStack'
import { Image } from 'react-native';

const Navigation = () => {
  const Drawer = createDrawerNavigator();
  const Tabs = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const { isLoggedIn, address } = useSelector(state => state.initialSetting);

  const HomeStackScreen = ({ navigation }) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name='Home'
          component={HomeScreen}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerLeft: () => (
              <Ionicons
                style={{ marginLeft: 10 }}
                name='ios-menu'
                size={27}
                onPress={() => navigation.openDrawer()}>
              </Ionicons>),
            headerRight: () => (
              <Image source={require('../assets/lovebird.png')}
                style={{ flex: 1, alignSelf: 'flex-end', height: 40, width: 40, marginRight: 10 }}
              />
            )
          })}
        />
        <HomeStack.Screen
          name='전체 후기'
          component={ReviewScreen}
        />
      </HomeStack.Navigator>
    );
  };

  const HomeTabs = () => {
    return (
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name='ios-home' size={28} color="#52575D" />
          }} />
        <Tabs.Screen
          name="Calendar"
          component={CalenderStackScreen}
          options={{
            tabBarLabel: 'Calender',
            tabBarIcon: ({ color }) => <Ionicons name='ios-calendar' size={28} color="#52575D" />
          }}
        />
        <Tabs.Screen
          name="Match"
          component={MatchStackScreen}
          options={{
            tabBarLabel: 'Match',
            tabBarIcon: ({ color }) => <Ionicons name='md-people' size={28} color="#52575D" />
          }}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatStackScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name='ios-chatboxes' size={28} color="#52575D" />
          }} />
      </Tabs.Navigator>
    );
  };

  const HomeDrawer = () => {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={HomeTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />
        <Drawer.Screen
          name="UserProfile"
          component={UserProfileStackScreen}
        />
        <Drawer.Screen
          name="PetProfile"
          component={PetProfileStackScreen}
        />
      </Drawer.Navigator>
    );
  };

  const getHeaderTitle = route => {
    const routeName = getFocusedRouteNameFromRoute(route)

    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Calendar':
        return 'Calendar';
      case 'Match':
        return 'Match';
      case 'Chat':
        return 'Chat';
    };
  };

  return isLoggedIn ?
    (address ? <HomeDrawer /> : <AddressStackScreen />) :
    <AuthStackScreen />
};

export default Navigation;
