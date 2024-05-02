export const state = () => ({
  pickup_body: {
    pickup_by: "Orang Tua",
    description: "",
    date_expired: "",
  },
  pickup_status: {},
  pickup_qr: {},
  new_qr: false,
});

export const getters = {};

export const mutations = {
  set_description(state, description) {
    state.pickup_body.description = description;
  },
  set_pickup_by(state, pickup_by) {
    state.pickup_body.pickup_by = pickup_by;
  },
  set_date_expired(state, date_expired) {
    state.pickup_body.date_expired = date_expired;
  },
  set_pickup_status(state, pickup_status) {
    state.pickup_status = pickup_status;
  },
  set_pickup_qr(state, pickup_qr) {
    state.pickup_qr = pickup_qr;
  },
  set_new_qr(state, new_qr) {
    state.new_qr = new_qr;
  },
};

const postStoreSelfPickup = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.pickup_body;
  await this.$axios
    .$post(`digital-pickup-qr/store/pickup/${rootState.child_id}`, body, config)
    .then((res) => {
      commit("set_pickup_status", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const postStoreQR = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  const body = state.pickup_body;
  await this.$axios
    .$post(`digital-pickup-qr/store/qr/${rootState.child_id}`, body, config)
    .then((res) => {
      commit("set_pickup_qr", res.data);
      callback({ isSuccess: true, response: res });
    })
    .catch((error) => {
      callback({ isSuccess: false, response: error });
    });
};

const getStatusPickup = async function (
  { state, commit, rootState },
  callback
) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`digital-pickup-qr/getStatus/${rootState.child_id}`, config)
    .then((res) => {
      commit("set_pickup_status", res.data);
    })
    .catch((error) => {
      commit("set_pickup_status", {});
      console.log(error);
    });
};

const getQRPickup = async function ({ state, commit, rootState }, callback) {
  const config = {
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
    },
  };
  await this.$axios
    .$get(`digital-pickup-qr/getQR/${rootState.child_id}`, config)
    .then((res) => {
      if (res.data != null) commit("set_pickup_qr", res.data);
    })
    .catch((error) => {
      commit("set_pickup_qr", {});
      console.log(error);
    });
};

export const actions = {
  postStoreSelfPickup,
  postStoreQR,
  getStatusPickup,
  getQRPickup,
};
