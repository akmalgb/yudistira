import createPersistedState from 'vuex-persistedstate'

import SecureLS from "secure-ls"
const ls = new SecureLS({ isCompression: false })

export default ({ store }) => {
  createPersistedState({
    key: "sidigs-parent",
    paths: [
      'auth',

      'school',
      'child_id',
      'child_detail',
      'child_class',

      'emoney',
      'emoney.history_id',
      'emoney.detail_emoney',
      'emoney.detail_history',
      'emoney.topup_data',

      'bill',

      'announcement',
      'announcement.announcement_id',
    ],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
  })(store)
}
