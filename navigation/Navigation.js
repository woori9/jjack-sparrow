import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import CalenderScreen from '../screens/CalendarScreen';
import DrawerContent from '../screens/DrawerContent';
import { Ionicons } from '@expo/vector-icons';
import ReviewScreen from '../screens/ReviewScreen';
import MatchStackScreen from './stacks/MatchStack';
import { PetProfileStackScreen, UserProfileStackScreen } from './stacks/ProfileStack';
import AuthStackScreen from './stacks/AuthStack';
import AddressStackScreen from './stacks/AddressStack';

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
                name='ios-menu'
                size={25}
                onPress={() => navigation.openDrawer()}>
              </Ionicons>)
          })}
        />
        <HomeStack.Screen
          name='후기'
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
            tabBarIcon: ({ color }) => <Ionicons name='ios-home' size={28} color="green" />
          }} />
        <Tabs.Screen
          name="Calendar"
          component={CalenderScreen}
          options={{
            tabBarLabel: 'Calender',
            tabBarIcon: ({ color }) => <Ionicons name='ios-calendar' size={28} color="green" />
          }}
        />
        <Tabs.Screen
          name="Match"
          component={MatchStackScreen}
          options={{
            tabBarLabel: 'Match',
            tabBarIcon: ({ color }) => <Ionicons name='md-people' size={28} color="green" />
          }}
          // options={({ route }) => ({
          //   tabBarLabel: 'Match',
          //   tabBarIcon: ({ color }) => <Ionicons name='md-people' size={28} color="green" />,
          //   headerTitle: getHeaderTitle(route)
          // })}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name='ios-chatboxes' size={28} color="green" />
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
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

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
