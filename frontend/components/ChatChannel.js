import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import moment from 'moment-timezone';
//import styles from "./style";

const ChatChannel = ({ navigation, item, userId }) => {
  const otherUser = userId === item.customer._id ? item.petsitter : item.customer;
  const { chat, _id } = item;
  const [currentMessage, setCurrentMessage] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  // console.log('CURREMT!!', currentMessage);
  // console.log('###', currentDate);

  useEffect(() => {
    if (chat.length) {
      setCurrentMessage(chat[chat.length - 1].message);
      setCurrentDate(chat[chat.length - 1].createdAt);
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Chat', {
        id: item._id, name: otherUser.username,
        // handleCurrentMessage: setCurrentMessage,
        // handleCurrentDate: setCurrentDate
      })}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: otherUser.picture }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.username}</Text>
            <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {currentMessage}
            </Text>
          </View>

        </View>

        <Text style={styles.time}>
          {chat.length && moment(currentDate).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey'
  },
});

export default ChatChannel;
