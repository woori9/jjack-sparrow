const Chat = require('../models/chat');

const ChatService = {
  createChat: async chatData => {
    const newChat = await Chat.create(chatData);
    return newChat;
  }
};

module.exports = ChatService;
