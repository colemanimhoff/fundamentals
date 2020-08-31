export default {
  Query: {
    users: (_, __, { models }) => {
      return Object.values(models.users);
    },
    user: (_, { id }, { models }) => {
      return models.users[id];
    },
    me: (_, __, { me }) => {
      return me;
    }
  },
  User: {
    messages: (user, _, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id);
    }
  }
};