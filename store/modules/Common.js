const state = () => ({
  last_visited_url: null,
});

const getters = {
  last_visited_url: state => {
    return state.last_visited_url;
  }
};

const mutations = {
  SET_LAST_VISITED_URL: (state, payload) => {
    state.last_visited_url = payload;
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
