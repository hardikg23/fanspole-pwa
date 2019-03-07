const state = () => ({
  players: []
})

const getters = {
  players: state => {
    return state.players;
  }
}

const mutations = {
  SET_PLAYERS: (state, payload) => {
    if (payload['players']) {
      payload['players'].forEach(player => {
        state.players.push(player);
      });
    }
  },
}

const actions = {
  async GET_PLAYERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}/players.json?fields=id,name,value,style,last_series_score,team{name_attr,jersey_photo}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_PLAYERS', response.data);
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