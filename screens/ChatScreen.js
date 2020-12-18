import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacit, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { socket, chatSocket } from '../socket';
import { getChatting } from '../config/api';

const ChatScreen = ({ route }) => {
  const { _id } = useSelector(state => state.user.userData);
  // const { waitingMatch, successMatch } = useSelector(state => state.user);
  const { id, name } = route.params// handleCurrentMessage, handleCurrentDate
  const matchId = id;
  const partnerName = name;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageList = useRef(null);

  useEffect(() => {
    const getChatInfo = async () => {
      const chatInfo = await getChatting(matchId);
      setMessages([...chatInfo]);
    };

    getChatInfo();

    chatSocket.joinChatRoom(matchId);

    return () => socket.off('join chat room');
  }, []);

  // useEffect(() => {
  //   if (messages.length) {
  //     handleCurrentMessage(messages[messages.length - 1].message);
  //     handleCurrentDate(messages[messages.length - 1].createdAt);
  //   }
  // }, [messages]);

  useEffect(() => {
    socket.on('recieve message', newChat => {
      setMessages([...messages, newChat]);
    });

    return () => socket.off('recieve message');
  }, [messages]);


  const onPress = () => {
    if (!message) {
      console.warn('microphone')
    } else {
      chatSocket.sendMessage(matchId, _id, message);
      setMessage('');
    }
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        ref={messageList}
        onContentSizeChange={() => messageList.current.scrollToEnd()}
        keyExtractor={chat => chat._id}
        data={messages}
        renderItem={({ item }) => <ChatMessage messageInfo={item} userId={_id} partnerName={partnerName} />}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ width: '100%' }}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <FontAwesome5 name="laugh-beam" size={24} color="grey" />
            <TextInput
              placeholder={"Type a message"}
              style={styles.textInput}
              multiline
              value={message}
              onChangeText={setMessage}
            />
            <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
            {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
          </View>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
              {!message
                ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                : <MaterialIcons name="send" size={28} color="white" />}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: 'skyblue',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ChatScreen;
