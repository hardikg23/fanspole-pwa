const state = () => ({
  user_credits: [],
})

const getters = {
  user_credits: state => {
    return state.user_credits;
  }
}

const mutations = {
  SET_USER_CREDITS: (state, payload) => {
    if (payload['user_credits']) {
      payload['user_credits'].forEach(credit => {
        state.user_credits.push(credit);
      });
    }
  },
  RESET_USER_CREDITS: (state, payload) => {
    state.user_credits = []
  }
}

const actions = {
  async GET_USER_CREDITS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/user_credits.json?fields=id,amount,status,service_provider,txnid,bonus,order_id,created_at_in_millis`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_USER_CREDITS');
          commit('SET_USER_CREDITS', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async CREATE_USER_CREDITS({ commit, dispatch }, payload) {
    return await this.$axios
      .post(`/api/user_credits.json?fields=id,payment_data,service_provider`, payload)
      .then(response => {
        if (response.status == 201){
          return response.data
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