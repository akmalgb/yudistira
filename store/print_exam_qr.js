export const state = () => ({
  exam_qr: {},
});

export const getters = {};

export const mutations = {
  set_exam_qr(state, new_qr) {
    state.exam_qr = new_qr;
  },
};

const getQRExam = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/qr-exam/${rootState.child_id}`, config)
    .then((res) => {
      if (res.data != null) commit("set_exam_qr", res.data);
    })
    .catch((error) => {
      commit("set_exam_qr", false);
      console.log(error);
    });
};

export const actions = {
  getQRExam,
};
