export const state = () => ({
  tahfidzes: [],
  next_page: ""
})

export const mutations = {
  set_tahfidzes(state, tahfidzes) {
    state.tahfidzes = tahfidzes
  },
  set_next_page(state, next_page) {
    state.next_page = next_page;
  }
}

const getAllTahfidz = async function ({ commit, rootState }, page) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params : {
      page: page,
      paginate: true,
    }
  };
  await this.$axios.$get(`tahfidz/get-all/${rootState.child_id}`, config).then((res) => {
    commit('set_tahfidzes', res.data.data);
    commit("set_next_page", res.data.next_page_url);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getAllTahfidz
}
