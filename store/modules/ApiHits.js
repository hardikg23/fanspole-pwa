const state = () => ({
  all_matches: null
});

const getters = {
  all_matches: state => {
    return state.all_matches;
  }
};

const mutations = {
  SET_ALL_MATCHES: (state, payload) => {
    state.all_matches = new Date().getTime();
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
