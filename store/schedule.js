export const state = () => ({
  schedules: {},
  day: ''
})

export const mutations = {
  set_schedules(state, schedules) {
    state.schedules = schedules
  },
  set_day(state, day) {
    state.day = day
  },
}

const getSchedules = async function ({ commit, state, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      day: state.day,
    },
  };
  await this.$axios.$get(`schedule/get-by-day/${rootState.child_id}`, config).then((res) => {
    commit('set_schedules', res.data);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getSchedules
}
