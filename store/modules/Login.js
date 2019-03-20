const state = () => ({
});

const getters = {
};

const mutations = {
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
