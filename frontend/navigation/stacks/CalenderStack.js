import React from 'react';
import RegAddressScreen from '../../screens/RegAddressScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CalenderScreen from '../../screens/CalendarScreen';

const CalenderStack = createStackNavigator();

const CalenderStackScreen = () => {
  return (
    <CalenderStack.Navigator>
      <CalenderStack.Screen name='calander' component={CalenderScreen} />
    </CalenderStack.Navigator>
  );
};

export default CalenderStackScreen;
