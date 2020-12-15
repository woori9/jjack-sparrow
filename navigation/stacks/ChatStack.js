import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../screens/ChatScreen';
import ChannelListScreen from '../../screens/ChannelListScreen';
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import {
  View,
} from "react-native";

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name='Channel'
        component={ChannelListScreen}
      />
      <ChatStack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              width: 90,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
              <FontAwesome5 name="video" size={22} color={'gray'} />
              <MaterialIcons name="call" size={22} color={'gray'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'gray'} />
            </View>
          )
        })}
      />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
