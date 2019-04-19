const state = () => ({
});

const getters = {

};

const mutations = {
  
};

const actions = {
  async FORGOT_PASSWORD({commit}, payload){
    return await this.$axios
      .post(`/api/users/forget_password.json`, payload)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
      }).catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
  async REGISTER({commit}, payload){
    return await this.$axios
      .post(`/api/users.json`, payload)
      .then((response) => {
        if (response.status == 201) {
          return response.data;
        }
      }).catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
