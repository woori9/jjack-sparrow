import React from 'react';
import PetProfileScreen from '../../screens/PetProfileScreen';
import UserProfileScreen from '../../screens/UserProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const ProfileStack = createStackNavigator();

export const PetProfileStackScreen = ({ navigator, navigation }) => {
  return (
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
};

export const UserProfileStackScreen = ({ navigator, navigation }) => {
  return (
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
};

