const TOKEN_KEY = 'Access-Token';
const FRESH_TOKEN = 'Fresh-token';
const USER_INFO = 'User-Info';

const localStore = {
  get: {
    token: () => {
      try {
        return JSON.parse(localStorage.getItem(TOKEN_KEY));
      } catch (error) {
        localStorage.setItem(TOKEN_KEY, '{}');
        return JSON.parse(localStorage.getItem(TOKEN_KEY));
      }
    },
    freshToken: () => {
      try {
        return JSON.parse(localStorage.getItem(FRESH_TOKEN));
      } catch (err) {
        localStorage.setItem(FRESH_TOKEN, '{}');
        return JSON.parse(localStorage.getItem(FRESH_TOKEN));
      }
    },
    userInfo: () => {
      try {
        return JSON.parse(localStorage.getItem(USER_INFO));
      } catch (err) {
        localStorage.setItem(USER_INFO, '{}');
        return JSON.parse(localStorage.getItem(USER_INFO));
      }
    }
  },
  set: {
    token: token => localStorage.setItem(TOKEN_KEY, JSON.stringify(token)),
    fresh: token => localStorage.setItem(FRESH_TOKEN, JSON.stringify(token)),
    userInfo: json => localStorage.setItem(USER_INFO, JSON.stringify(json))
  },
  remove: {
    token: () => localStorage.removeItem(TOKEN_KEY),
    fresh: () => localStorage.removeItem(FRESH_TOKEN),
    userInfo: () => localStorage.removeItem(USER_INFO)
  }
};
export default localStore;
