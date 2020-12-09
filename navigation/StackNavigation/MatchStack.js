import React from 'react';
import MatchScreen from '../../screens/MatchScreen';
import MapScreen from '../../screens/MapScreen';
import { createStackNavigator } from '@react-navigation/stack';
import WaitingScreen from '../../screens/WaitingScreen';

const MatchStack = createStackNavigator();

const MatchStackScreen = ({ navigator, navigation }) => {

  return (
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
        options={{ headerShown: false }}
      />
    </MatchStack.Navigator>
  );
};

export default MatchStackScreen;
