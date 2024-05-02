export const state = () => ({
  //initial state after login
  profile: {},
  school: {},

  // child states
  childs: [],
  child_detail: "",
  child_class: "",
  child_id: "",
});

export const getters = {
  selectedChild: (state) => {
    return state.child;
  },
};

export const mutations = {
  //initial data after login
  SET_PARENT_PROFILE(state, profile) {
    state.profile = profile;
  },
  set_school_data(state, school) {
    state.school = school;
  },

  // child data
  SET_LIST_CHILD(state, listChild) {
    state.childs = listChild;
  },
  set_child_id(state, child_id) {
    localStorage.setItem("child_id", child_id);
    state.child_id = child_id;
  },
  SET_CHILD_DETAIL(state, child_detail) {
    state.child_detail = child_detail;
  },
  SET_CHILD_CLASS(state, child_class) {
    state.child_class = child_class;
  },
};

const getListChild = async function ({ commit, state }) {
  const config = {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  };
  await this.$axios
    .$get("list-my-child", config)
    .then((res) => {
      commit("SET_LIST_CHILD", res.data);
      const child_id = localStorage.getItem("child_id");
      if (child_id === null) {
        commit("set_child_id", res.data[0].id);
        localStorage.setItem("child_id", res.data[0].id);
      } else {
        commit("set_child_id", child_id);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getParentProfile = async function ({ commit, state }) {
  const config = {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  };
  await this.$axios
    .$get("profile", config)
    .then((res) => {
      commit("SET_PARENT_PROFILE", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getChildDetail = async function ({ commit, state }) {
  const config = {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  };
  await this.$axios
    .$get(`my-child/${state.child_id}`, config)
    .then((res) => {
      commit("SET_CHILD_CLASS", res.data.classes);
      commit("SET_CHILD_DETAIL", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getChildClass = async function ({ commit, state }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  };
  await this.$axios
    .$get(`my-child/${state.child_id}`, config)
    .then((res) => {
      console.log(res.data.classes);
      commit("SET_CHILD_CLASS", res.data.classes);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const actions = {
  getParentProfile,
  getListChild,
  getChildDetail,
  getChildClass,
};
