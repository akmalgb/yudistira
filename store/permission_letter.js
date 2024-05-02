export const state = () => ({
  permission_letters: [],
  next_page: '',
  // permission_credentials: {
  //   student_id: '',
  //   status: '',
  //   evidence: '',
  //   notes: '',
  //   start_date: '',
  //   end_date: '',
  // }
})

export const mutations = {
  set_permission_letters(state, permission_letters) {
    state.permission_letters = permission_letters
  },
  set_student_id(state, student_id) {
    state.permission_credentials.student_id = student_id
  },
  checkNextPage(state, next_page) {
    state.next_page = next_page;
  }
}

const getListPermissions = async function ({ commit, state, rootState }, page) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      student_id: rootState.child_id,
      type: 'permit',
      page: page,
    }
  };
  await this.$axios.$get(`attendance-student/history-attendance`, config).then((res) => {
    commit('set_permission_letters', res.data.data);
    commit("checkNextPage", res.data.next_page_url);
  }).catch((error) => {
    console.log(error);
  });
}

const postPermissionLetter = async function ({ commit, state, rootState }, permission_credentials) {
  const formData = new FormData();

  for (let [key, value] of Object.entries(permission_credentials)) {
    formData.append(key, value);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  // const body = state.permission_credentials;
  await this.$axios.$post(`attendance-student/submit-attendance`, formData, config).then((res) => {
    console.log(res.data);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getListPermissions,
  postPermissionLetter,
}
