const state = () => ({
  redemptions: [],
})

const getters = {
  redemptions: state => {
    return state.redemptions;
  }
}

const mutations = {
  SET_REDEMPTIONS: (state, payload) => {
    if (payload['redemptions']) {
      payload['redemptions'].forEach(redemption => {
        state.redemptions.push(redemption);
      });
    }
  }
}

const actions = {
  async GET_REDEMPTIONS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/redemptions.json?fields=id,amount,status,mobile_no,created_at_in_millis,redemption_type{name}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_REDEMPTIONS', response.data);
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