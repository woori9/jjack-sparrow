import React from 'react';
import RegAddressScreen from '../../screens/RegAddressScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AddressStack = createStackNavigator();

const AddressStackScreen = () => {
  return (
    <AddressStack.Navigator>
      <AddressStack.Screen name='주소 등록' component={RegAddressScreen} />
    </AddressStack.Navigator>
  );
};

export default AddressStackScreen;
