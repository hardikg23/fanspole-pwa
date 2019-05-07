const state = () => ({
  user_credit: null
})

const getters = {
  user_credit: state => {
    return state.user_credit;
  }
}

const mutations = {
  SET_USER_CREDIT: (state, payload) => {
    if (payload['user_credit']) {
      state.user_credit = payload['user_credit'];
    }
  },
  RESET_USER_CREDIT: (state, payload) => {
    state.user_credit = null
  }
}

const actions = {
  async UPDATE_PAYTM({ commit, dispatch }, payload) {
    return await this.$axios
      .put(`/api/user_credits/verify_paytm.json`, payload)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_USER_CREDIT');
          commit('SET_USER_CREDIT', response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
  async UPDATE_PAYU_PAISA({ commit, dispatch }, payload) {
    return await this.$axios
      .put(`/api/user_credits/verify_payu_paisa.json`, payload)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_USER_CREDIT');
          commit('SET_USER_CREDIT', response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}