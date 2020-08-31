import { v4 as uuidv4 } from 'uuid';

export default {
  Query: {
    messages: (_, __, { models }) => {
      return Object.values(models.messages);
    },
    message: (_, { id }, { models }) => {
      return models.messages[id];
    }
  },
  Mutation: {
    createMessage: (_, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage: (_, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;
      if (!message) {
        return false;
      }
      models.messages = otherMessages;
      return true;
    }
  },
  Message: {
    user: (message, __, { models }) => {
      return models.users[message.userId];
    }
  }
};