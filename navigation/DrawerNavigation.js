import React from 'react';
import DrawerContent from '../screens/DrawerContent';
import HomeTabs from './TapNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserProfileStackScreen from './StackNavigation/UserProfileStack';
import PetProfileStackScreen from './StackNavigation/PetProfileStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
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

export default HomeDrawer;
