import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ChatChannel from '../components/ChatChannel';

const ChannelListScreen = ({ navigation }) => {
  const { userData, successMatch, pastMatch } = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={match => match._id}
        data={[...successMatch, ...pastMatch]}
        renderItem={({ item }) => <ChatChannel navigation={navigation} item={item} userId={userData._id}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChannelListScreen;
