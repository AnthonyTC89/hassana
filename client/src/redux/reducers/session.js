const defaultSession = {
  username: '',
  isLoggedIn: false,
};

const session = (state = defaultSession, { type, username }) => {
  switch (type) {
    case 'LOGIN':
      return {
        username,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return defaultSession;
    default:
      return state;
  }
};

export default session;
