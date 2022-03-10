import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import moment from 'moment-timezone';

const ChatMessage = ({ messageInfo, userId, partnerName }) => {

  const isMyMessage = () => {
    return messageInfo.sendBy === userId;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }
      ]}>
        {!isMyMessage() && <Text style={styles.name}>{partnerName}</Text>}
        <Text style={styles.message}>{messageInfo.message}</Text>
        <Text style={styles.time}>{moment(messageInfo.createdAt).fromNow()}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: 'pink',
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {

  },
  time: {
    alignSelf: "flex-end",
    color: 'grey'
  }
});

export default ChatMessage;
