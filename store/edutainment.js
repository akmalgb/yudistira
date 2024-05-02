export const state = () => ({
  edutainmentAll: [],
  edutainmentSchool: [],
  edutainmentSidigs: [],
  pageAll : 1 ,
  pageSchool : 1,
  pageSidigs :1,
})

export const mutations = {
  set_list_all(state, edutainment) {
    state.edutainmentAll = edutainment;
  },
  set_list_school(state, edutainment) {
    state.edutainmentSchool = edutainment;
  },
  set_list_sidigs(state, edutainment) {
    state.edutainmentSidigs = edutainment;
  },
  set_page_all(state, page){
    state.pageAll = page
  },
  set_page_school(state, page){
    state.pageSchool = page
  },
  set_page_sidigs(state, page){
    state.pageSidigs  = page
  },
}

const getListEduAll = async function ({ commit, state, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      page: state.pageAll,
      type: 'all'
    },
  };
  await this.$axios.$get(`magazines`, config).then((res) => {
    commit('set_list_all', res.data);
  }).catch((error) => {
    console.log(error);
  });
}

const getListEduSchool = async function ({ commit, state, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      page: state.pageSchool,
      type: 'school'
    },
  };
  await this.$axios.$get(`magazines`, config).then((res) => {
    commit('set_list_school', res.data);
  }).catch((error) => {
    console.log(error);
  });
}

const getListEduSidigs = async function ({ commit, state, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      page: state.pageSchool,
      type: 'sidigs'
    },
  };
  await this.$axios.$get(`magazines`, config).then((res) => {
    commit('set_list_sidigs', res.data);
  }).catch((error) => {
    console.log(error);
  });
}
export const actions = {
  getListEduAll,
  getListEduSchool,
  getListEduSidigs,
}
