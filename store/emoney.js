export const state = () => ({
  detail_emoney: "",
  account_number: "",

  history_emoney: [],
  history_id: "",
  detail_history: "",
  next_page: '',

  payment_method: {},

  topup_credentials: {
    amount: "",
    notes: "",
    payment_type: "topup-emoney",
    student_id: "",
  },

  topup_data: "",
  image: "",
  no_virtual_account_bni: "",
});

export const getters = {};

export const mutations = {
  set_account_number(state, account_number) {
    state.account_number = account_number;
  },
  set_detail_emoney(state, detail_emoney) {
    state.detail_emoney = detail_emoney;
  },

  set_history_emoney(state, history_emoney) {
    state.history_emoney = history_emoney;
  },
  set_history_id(state, history_id) {
    state.history_id = history_id;
  },
  set_detail_history(state, detail_history) {
    state.detail_history = detail_history;
  },

  set_topup_credentials(state, topup_credentials) {
    state.topup_credentials = topup_credentials;
  },

  set_amount(state, amount) {
    state.topup_credentials.amount = amount;
  },
  set_notes(state, notes) {
    state.topup_credentials.notes = notes;
  },

  set_topup_data(state, topup_data) {
    state.topup_data = topup_data;
  },
  set_conf_image(state, image) {
    state.image = image;
  },

  set_payment_method(state, paymentMethod) {
    state.payment_method = paymentMethod;
  },
  set_topup_student_id(state, student_id) {
    state.topup_credentials.student_id = student_id;
  },
  set_no_virtual_account_bni(state, virtualAccount) {
    state.no_virtual_account_bni = virtualAccount;
  },

  set_next_page(state, next_page) {
    state.next_page = next_page;
  }
};

const getAccountNumber = async function ({ commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/no-rekening/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_account_number", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDetailEmoney = async function ({ commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/detail-emoney/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_detail_emoney", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getHistoryEmoney = async function ({ commit, rootState }, page) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params : {
      page: page,
      paginate: true
    }
  };
  await this.$axios
    .$get(`bill/history-emoney/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_history_emoney", res.data.emoney.data);
      commit("set_next_page", res.data.emoney.next_page_url);
      // commit('set_history_id', res.data.emoney[0].id);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDetailHistory = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/detail-history-emoney/${state.history_id}`, config)
    .then((res) => {
      commit("set_detail_history", res.data);
      commit("set_topup_data", res.data);
      this.$cookies.set("topup_data", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getNoVirtualAccountBNI = async function ({ commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`va-bni/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_no_virtual_account_bni", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const postTopupTransfer = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.topup_credentials;
  await this.$axios
    .$post(`bill/topup-transfer/${rootState.child_id}`, body, config)
    .then((res) => {
      commit("set_topup_data", res.data);
      this.$cookies.set("topup_data", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postTopupVa = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.topup_credentials;
  await this.$axios
    .$post(`bill/create-payment/va-bni`, body, config)
    .then((res) => {
      commit("set_topup_data", res.data);
      commit("set_history_id", res.data.emoney_id);
      this.$cookies.set("topup_data", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postCancelTopup = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = {
    emoney_id: state.topup_data.id,
  };
  await this.$axios
    .$post(`bill/emoney-cancel-topup`, body, config)
    .then((res) => {
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postTopupConfirmation = async function (
  { state, commit, rootState },
  callback
) {
  let formData = new FormData();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  formData.append("emoney_id", state.topup_data.id);
  formData.append("evidence", state.image);
  await this.$axios
    .$post(`bill/emoney-topup-confirmation`, formData, config)
    .then((res) => {
      console.log(res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const DownloadKwitansi = async function ({ state, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    responseType: "blob",
  };
  await this.$axios
    .$get(
      `https://demo.sidigs.com/api/parent/bill/invoice-emoney/${state.history_id}`,
      config
    )
    .then((res) => {
      callback({ response: res });
    })
    .catch((error) => {
      alert(error);
    });
};

export const actions = {
  getAccountNumber,
  getHistoryEmoney,
  getDetailHistory,
  getDetailEmoney,
  getNoVirtualAccountBNI,

  postTopupTransfer,
  postTopupVa,
  postCancelTopup,
  postTopupConfirmation,

  DownloadKwitansi,
};
