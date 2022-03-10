import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import ReviewScreen from '../../screens/ReviewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();

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

export default HomeStackScreen;
