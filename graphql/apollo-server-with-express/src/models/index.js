let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '2'
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '1'
  }
};
let users = {
  1: {
    id: '1',
    username: 'Coleman Imhoff',
    messageIds: [2],
  },
  2: {
    id: '2',
    username: 'Shaina Belton',
    messageIds: [1],
  },
};

export default {
  users,
  messages
};