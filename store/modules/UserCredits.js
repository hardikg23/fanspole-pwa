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
  }
}

const actions = {
  async GET_USER_CREDITS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/user_credits.json?fields=id,amount,status,service_provider,txnid,bonus,order_id,created_at_in_millis`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_USER_CREDITS', response.data);
        }
      })
      .catch(error => {
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