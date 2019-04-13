const state = () => ({
})

const getters = {

}

const mutations = {

}

const actions = {
  async SEND_OPT({ commit, dispatch }, payload) {
    return await this.$axios
      .post(`/api/mobile_numbers.json`, {mobile_number: payload.mobile_number})
      .then((response) => {
        if (response.status == 200 || response.status == 201){
          return response.data;
        }
      })
      .catch(error => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
  async VERIFY_OPT({commit}, payload){
    return await this.$axios
      .post(`/api/mobile_numbers/verify_otp.json`, {mobile_number: payload.mobile_number, otp: payload.otp})
      .then((response) => {
        if (response.status == 200){
          commit('Me/APPROVED_MOBILE', null, { root: true });
        }
      }).catch((error) => {
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