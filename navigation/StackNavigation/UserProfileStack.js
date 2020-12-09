import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../../screens/UserProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const ProfileStack = createStackNavigator();

const UserProfileStackScreen = ({ navigator, navigation }) => {
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

export default UserProfileStackScreen;
