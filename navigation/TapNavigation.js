import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import CalenderScreen from '../screens/CalendarScreen';
import HomeStackScreen from './StackNavigation/HomeStack.js';
import WaitingScreen from '../screens/WaitingScreen';
import MatchStackScreen from './StackNavigation/MatchStack';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const HomeTabs = () => {
  let matching = false;
  const temp = () => matching ? <WaitingScreen /> : <MatchStackScreen />

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

export default HomeTabs;
