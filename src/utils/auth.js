const { localStorage } = global.window;

const auth = {
  login(data) {
    const { user, isSuccess, accessToken } = data;
    localStorage.isSuccess = isSuccess;
    localStorage.token = accessToken;
    localStorage.user = JSON.stringify(user);
  },

  getToken() {
    return localStorage.token;
  },

  getUser() {
    return JSON.parse(localStorage.user);
  },

  isSuccess() {
    return localStorage.isSuccess;
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
