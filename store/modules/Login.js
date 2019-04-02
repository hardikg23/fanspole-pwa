const state = () => ({
  gapiLoaded: null,
  gapiErr: {}
});

const getters = {
  gapiLoaded: (state) => {
    return state.gapiLoaded;
  },
  gapiError: (state) => {
    return state.gapiErr;
  }
};

const mutations = {
  GAPI_SUPPORT: (state, payload) => {
    state.gapiLoaded = payload;     
  },
  GAPI_ERROR: (state, payload) => {
    state.gapiErr = payload;     
  }
};

const actions = {
  async LOGIN({ commit, dispatch }, payload) {
    return await this.$axios
      .post(`/post_login/`, payload)
      .then((response) => {
        if (response.status == 200) {
          this.$cookies.set('at', response.data.access_token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365
          });
          this.$cookies.set('rt', response.data.refresh_token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365
          });
          dispatch('Me/GET_ME', null, { root: true });
          this.$router.push('/');
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          throw error.response;
        }
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
