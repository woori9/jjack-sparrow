import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegAddressScreen from '../screens/RegAddressScreen';
import MatchScreen from '../screens/MatchScreen';
import ChatScreen from '../screens/ChatScreen';
import CalenderScreen from '../screens/CalendarScreen';
import PetProfileScreen from '../screens/PetProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import DrawerContent from '../screens/DrawerContent';
import { Ionicons } from '@expo/vector-icons';
import ReviewScreen from '../screens/ReviewScreen';
import MapScreen from '../screens/MapScreen';
import WaitingScreen from '../screens/WaitingScreen';
import MatchSuccessScreen from '../screens/MatchSuccessScreen';

const Navigation = () => {
  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();
  const AddressStack = createStackNavigator();
  const MatchStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const { isLoggedIn, isWaiting, userData } = useSelector(state => state.user);

  const MatchStackScreen = ({ navigator, navigation }) => (
    <MatchStack.Navigator>
      <MatchStack.Screen
        name='매칭 내역'
        component={MatchScreen}
      />
      <MatchStack.Screen
        name='지도'
        component={MapScreen}
      />
      <MatchStack.Screen
        name='대기'
        component={WaitingScreen}
        options={{headerShown: false}}
      />
    </MatchStack.Navigator>
  );

  const temp = () => isWaiting ? <WaitingScreen /> : <MatchStackScreen />
  const HomeTabs = () => {
    return (
      <Tabs.Navigator shifting={true} initialRouteName="Home" >
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
            tabBarIcon: ({ color }) => <Ionicons name='calendar' size={28} color="green" />
          }} />
        <Tabs.Screen
          name="Match"
          component={temp}
          options={{
            tabBarLabel: 'Match',
            tabBarIcon: ({ color }) => <Ionicons name='people' size={28} color="green" />
          }} />
        <Tabs.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name='chatbubble-ellipses' size={28} color="green" />
          }} />
      </Tabs.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();
  const ProfileStack = createStackNavigator();
  const UserProfileStackScreen = ({ navigator, navigation }) => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='내 프로필'
        component={UserProfileScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name='ios-menu'
              size={25}
              onPress={() => navigation.openDrawer()}>
            </Ionicons>)
        }}
      />
    </ProfileStack.Navigator>
  );

  const PetProfileStackScreen = ({ navigator, navigation }) => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='반려동물 프로필'
        component={PetProfileScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name='ios-menu'
              size={25}
              onPress={() => navigation.openDrawer()}>
            </Ionicons>)
        }}
      />
    </ProfileStack.Navigator>
  );

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
    console.log("ROUTE", routeName);

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

  const HomeStackScreen = ({ navigation }) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name='홈'
          component={HomeScreen}
          options={{
            headerLeft: () => (
              <Ionicons
                name='ios-menu'
                size={25}
                onPress={() => navigation.openDrawer()}>
              </Ionicons>)
          }}
        />
        <HomeStack.Screen
          name='후기'
          component={ReviewScreen}
        />
      </HomeStack.Navigator>
    );
  };

  const AuthStackScreen = () => {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  };

  const AddressStackScreen = () => {
    return (
      <AddressStack.Navigator>
        <AddressStack.Screen name="RegAddress" component={RegAddressScreen} />
      </AddressStack.Navigator>
    );
  };

  return isLoggedIn ?
    (userData.address ? <HomeDrawer /> : <AddressStackScreen />) :
    <AuthStackScreen />
};

export default Navigation;
