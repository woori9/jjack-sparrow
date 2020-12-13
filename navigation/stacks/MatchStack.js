import React from 'react';
import MatchScreen from '../../screens/MatchScreen';
import MapScreen from '../../screens/MapScreen';
import WaitingScreen from '../../screens/WaitingScreen';
import SuccessScreen from '../../screens/SuccessScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MatchStack = createStackNavigator();

const MatchStackScreen = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: getHeaderTitle(route) });
  }, [navigation, route]);

  const getHeaderTitle = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if(routeName) return false;
  };

  return (
    <MatchStack.Navigator>
      <MatchStack.Screen
        name='매칭 내역'
        component={MatchScreen}
        //component={SuccessScreen}
      />
      <MatchStack.Screen
        name='지도'
        component={MapScreen}
      />
      <MatchStack.Screen
        name='대기'
        component={WaitingScreen}
      />
      <MatchStack.Screen
        name='성공'
        component={SuccessScreen}
        options={{ headerShown: false }}

      />
    </MatchStack.Navigator>
  );
};

export default MatchStackScreen;
