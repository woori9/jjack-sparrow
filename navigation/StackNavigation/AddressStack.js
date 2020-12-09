import React from 'react';
import RegAddressScreen from '../../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AddressStack = createStackNavigator();

const AddressStackScreen = () => {
  return (
    <AddressStack.Navigator>
      <AddressStack.Screen name="RegAddress" component={RegAddressScreen} />
    </AddressStack.Navigator>
  );
};

export default AddressStackScreen;
