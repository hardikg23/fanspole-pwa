const state = () => ({
  all_matches: null,
  all_finised_matches: null,
  all_notifications: null
});

const getters = {
  all_matches: state => {
    return state.all_matches;
  },
  all_finised_matches: state => {
    return state.all_finised_matches;
  },
  all_notifications: state => {
    return state.all_notifications;
  }
};

const mutations = {
  SET_ALL_MATCHES: (state, payload) => {
    state.all_matches = new Date().getTime();
  },
  SET_ALL_FINISHED_MATCHES: (state, payload) => {
    state.all_finised_matches = new Date().getTime();
  },
  SET_ALL_NOTIFICATIONS: (state, payload) => {
    state.all_notifications = new Date().getTime();
  }
};

const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
