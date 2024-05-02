export const state = () => ({
  attendances: [],
  next_page: '',
})

export const mutations = {
  set_list_attendance(state, list_attendance) {
    state.attendances = list_attendance
  },

  checkNextPage(state, next_page) {
    state.next_page = next_page;
  }
}

const getListAttendance = async function ({ commit, rootState }, page) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      student_id: `${rootState.child_id}`,
      type: 'all',
      page: page,
    },
  };
  await this.$axios.$get(`attendance-student/history-attendance`, config).then((res) => {
    commit('set_list_attendance', res.data.data);
    commit("checkNextPage", res.data.next_page_url);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getListAttendance
}
