export const state = () => ({
  announcements: [],
  announcement_id: '',
  announcement_detail: {},
  next_page: '',
})

export const mutations = {
  set_list_announcements(state, announcements) {
    state.announcements = announcements;
  },
  set_announcement_id(state, announcement_id) {
    state.announcement_id = announcement_id;
  },
  set_announcement_detail(state, announcement) {
    state.announcement_detail = announcement;
  },
  set_next_page(state, next_page){
   state.next_page = next_page;
  }
};

const getListAnnouncement = async function ({ commit, rootState }, page) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: 
    {
      page: page,
      paginate: true,
    }
  };
  await this.$axios.$get(`announcement/list`, config).then((res) => {
    commit('set_list_announcements', res.data.data);
    commit("set_next_page", res.data.next_page_url);
  }).catch((error) => {
    console.log(error);
  });
}

export const actions = {
  getListAnnouncement,
}
