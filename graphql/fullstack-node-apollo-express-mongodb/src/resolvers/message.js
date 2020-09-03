import { models } from "mongoose";

export default {
  Query: {
    message: async (_, { id }) => {
      try {
        return await models.Message.findById(id);
      } catch (error) {
        console.error(error);
      }
    },
    messages: async () => {
      try {
        return await models.Message.find();
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createMessage: async (_, { text }, { me }) => {
      const message = {
        text,
        userId: me.id,
      };

      try {
        return await models.Message.create(message);
      } catch (error) {
        console.error(error);
      }
    },
    deleteMessage: async (_, { id }) => {
      try {
        return await models.Message.deleteOne(id);
      } catch (error) {
        console.error(error);
      }
      return id, true;
    },
  },
  Message: {
    user: async (message) => {
      return await models.User.findById(message.userId);
    },
  },
};