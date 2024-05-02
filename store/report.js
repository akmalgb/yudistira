export const state = () => ({
  reports: [],
  report_id: '',
  next_page: "",
  report_detail: {},
})

export const mutations = {
  set_reports(state, reports) {
    state.reports = reports
  },
  set_next_page(state, next_page) {
    state.next_page = next_page;
  },
};

const getReports = async function ({ commit, rootState }, { page, limit }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      page: page,
      paginate: true,
      limit: limit
    }
  };
  await this.$axios.$get(`study-report/${rootState.child_id}`, config).then((res) => {
    commit('set_reports', res.data.data);
    commit("set_next_page", res.data.next_page_url);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getReports
}
