const defaultSession = {
  user: {
    id: '',
    username: '',
    status: 2,
  },
  isLoggedIn: false,
};

const session = (state = defaultSession, { type, user }) => {
  switch (type) {
    case 'LOGIN':
      return {
        user,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return defaultSession;
    default:
      return state;
  }
};

export default session;
