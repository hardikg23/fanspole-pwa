const state = () => ({
  notifications: [],
})

const getters = {
  notifications: state => {
    return state.notifications;
  }
}

const mutations = {
  SET_NOTIFICATIONS: (state, payload) => {
    if (payload['notifications']) {
      payload['notifications'].forEach(notification => {
        state.notifications.push(notification);
      });
    }
  }
}

const actions = {
  async GET_NOTIFICATIONS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/notifications.json?fields=id,body,created_at_in_millis`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_NOTIFICATIONS', response.data);
          commit('ApiHits/SET_ALL_NOTIFICATIONS', null, { root: true });
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