import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback
} from "react-native";
import { updateLastMessage } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-timezone';
//import styles from "./style";

const ChatChannel = ({ navigation, item, userId }) => {
  const otherUsername = userId === item.customer._id ? item.petsitter.username : item.customer.username;
  const { chat, _id } = item;
  console.log('chat', chat.length)
  //useDispatch(updateLastMessage(_id, chat[chat.length - 1].message));

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Chat', {
        id: item._id, name: otherUsername
      })}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: 'https://jjack.s3.ap-northeast-2.amazonaws.com/1F57B15E-ED29-4F1D-898C-2151CD64E6E4.jpg' }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUsername}</Text>
            <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {chat.length
                ? `${chat[chat.length - 1].message}`
                : ""}
            </Text>
          </View>

        </View>

        <Text style={styles.time}>
          {chat.length && moment(chat[chat.length - 1].createdAt).format("DD/MM/YYYY")}
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
