export const state = () => ({
  userInfo: {},
  token: "",
  credentials: {
    username: "",
    password: "",
  },
  message: ""
})

export const getters = {
  getAccessToken: (state) => state.token
};

export const mutations = {
  set_access_token(state, accessToken) {
    state.token = accessToken;
  },
  set_user_info(state, userInfo) {
    state.userInfo = userInfo;
  },
  reset_session(state) {
    state.token = "";
    state.credentials.username = "";
    state.credentials.password = "";
    state.userInfo = {};
    state.message = "";
  },
  reset_credentials(state) {
    state.credentials.username = "";
    state.credentials.password = "";
  },
  set_credentials(state, credentials) {
    state.credentials = credentials;
  },
  set_username(state, username) {
    state.credentials.username = username;
  },
  set_password(state, password) {
    state.credentials.password = password;
  },
  set_message(state, message) {
    state.message = message
  }
};

const login = async function ({ commit, state }, callback) {
  await this.$axios.$post("login", state.credentials).then((res) => {
    commit("set_access_token", res.data.access_token);
    commit("set_user_info", res.data.user);
    commit("set_school_data", res.data.school, { root: true });
    this.$cookies.set('token', state.token, {
      path: '/',
      maxAge: 60 * 60 * 24
    })
    callback({ isSuccess: true, response: res.message });
  }).catch((error) => {
    if(error.response.status == 422){
      commit("set_message", "Username atau password salah");
    } else {
      commit("set_message", error.response.data.message);
    }
    callback({ isSuccess: false, response: error.response.data.message});
  });
}

const logout = function ({ commit }) {
  commit("reset_session");
  localStorage.clear();
  this.$cookies.remove('token');
}

export const actions = {
  login,
  logout
}
