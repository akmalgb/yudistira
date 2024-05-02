export const state = () => ({
  bill_id: "",
  bill_type: "",
  bill_status: "",

  home_bill: "",
  bills: [],

  bill_detail: {},
  bill_pending: {},
  bill_paid: {},
  bill_installments: [],

  payment_methods: [],
  payment_method: {},

  transfer_credentials: {
    student_id: "",
    bill_trx_id: "",
    payment_type: "bill",
    amount: "",
    notes: "",
  },

  image: "",
  message: "",
  snackbar_status: false,
});

export const getters = {};

export const mutations = {
  set_home_bill(state, homeBill) {
    state.home_bill = homeBill;
  },
  set_bill_id(state, billId) {
    state.bill_id = billId;
  },
  set_bill_type(state, billType) {
    state.bill_type = billType;
  },
  set_bill_status(state, billStatus) {
    state.bill_status = billStatus;
  },
  set_bills(state, bills) {
    state.bills = bills;
  },

  set_bill_detail(state, billDetail) {
    state.bill_detail = billDetail;
  },
  set_bill_pending(state, billPending) {
    state.bill_pending = billPending;
  },
  set_bill_paid(state, billPaid) {
    state.bill_paid = billPaid;
  },
  set_bill_installments(state, billInstallments) {
    state.bill_installments = billInstallments;
  },

  set_payment_methods(state, paymentMethods) {
    state.payment_methods = paymentMethods;
  },
  set_payment_method(state, paymentMethod) {
    state.payment_method = paymentMethod;
  },

  set_bill_student_id(state, student_id) {
    state.transfer_credentials.student_id = student_id;
  },

  set_bill_trx_id(state, bill_trx_id) {
    state.transfer_credentials.bill_trx_id = bill_trx_id;
  },
  set_transfer_amount(state, amount) {
    state.transfer_credentials.amount = amount;
  },
  set_transfer_notes(state, notes) {
    state.transfer_credentials.notes = notes;
  },

  set_bill_conf_image(state, image) {
    state.image = image;
  },
  set_bill_error_message(state, message) {
    state.message = message;
  },
  set_message(state, message) {
    state.message = message;
  },
  set_message(state, message){
    state.message = message
  },
  set_snackbar(state, status){
    state.snackbar_status = status;
  }
};

const getHomeBill = async function ({ commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/home-bill/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_home_bill", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getListBills = async function ({ state, commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      type: state.bill_type,
      status: state.bill_status,
    },
  };
  await this.$axios
    .$get(`bill/list-all-bill/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_bills", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getLastBills = async function ({ state, commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      type: state.bill_type,
      status: state.bill_status,
      limit: 5,
    },
  };
  await this.$axios
    .$get(`bill/list-all-bill/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_bills", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getBillDetail = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
    params: {
      bill_trx_id: state.bill_id,
    },
  };
  await this.$axios
    .$get(`bill/get-detail`, config)
    .then((res) => {
      commit("set_bill_detail", res.data);
      if (res.data.status == "installment") {
        commit("set_bill_installments", res.data.bill_installments);
      }
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const getPaymentMethods = async function ({ state, commit, rootState }) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`bill/payment-methods`, config)
    .then((res) => {
      commit("set_payment_methods", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const postBillTransfer = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.transfer_credentials;
  await this.$axios
    .$post(`bill/submit-transfer`, body, config)
    .then((res) => {
      commit("set_bill_pending", res.data);
      this.$cookies.set("bill_pending_data", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postBillEmoney = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.transfer_credentials;
  await this.$axios
    .$post(`bill/pay-with-emoney`, body, config)
    .then((res) => {
      commit("set_bill_detail", res.data);
      // this.$cookies.set('bill_pending_data', res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      commit("set_bill_error_message", error.response.data.message);
      callback({ isSuccess: false, response: error.response.data.message });
    });
};

const postBillVa = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.transfer_credentials;
  await this.$axios
    .$post(`bill/create-payment/${state.payment_method}`, body, config)
    .then((res) => {
      commit("set_bill_detail", res.data);
      // this.$cookies.set('bill_pending_data', res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postTransferConfirmation = async function (
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
  formData.append("bill_trx_id", state.bill_id);
  formData.append("evidence", state.image);
  await this.$axios
    .$post(`bill/transfer-confirmation`, formData, config)
    .then((res) => {
      commit("set_bill_paid", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postCancelTransfer = async function ({ state, rootState }, callback) {
  let formData = new FormData();
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  formData.append("bill_trx_id", state.bill_id);
  await this.$axios
    .$post(`bill/cancel-transfer`, formData, config)
    .then((res) => {
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

export const actions = {
  getHomeBill,
  getListBills,
  getLastBills,
  getBillDetail,
  getPaymentMethods,

  postBillTransfer,
  postBillEmoney,
  postBillVa,
  postCancelTransfer,
  postTransferConfirmation,
};
