import { models } from "mongoose";

export default  {
  Query: {
    me: async (_, __, { me }) => {
      try {
        return await models.User.findById(me.id);
      } catch (error) {
        console.error(error);
      }
    },
    user: async (_, { id }) => {
      try {
        return await models.User.findById(id);
      } catch (error) {
        console.error(error);
      }
    },
    users: async () => {
      try {
        return await models.User.find();
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { username }) =>  {
      try {
        const user = new models.User({
          username: username,
        });
        return await user.save();
      } catch (error) {
        console.error(error);
      }
    },
  },
  User: {
    messages: async (user, _, { models }) => {
      return await models.Message.find({ userId: user.id });
    },
  },
};