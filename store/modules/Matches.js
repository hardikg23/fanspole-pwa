const state = () => ({
  matches: {
    matches: []
  }
})

const getters = {
  matches: state => {
    return state.matches;
  }
}

const mutations = {
  SET_MATCHES: (state, payload) => {
    if (payload['matches']) {
      payload['matches'].forEach(match => {
        state.matches.matches.push(match);
      });
    }
  },
  SET_MATCH: (state, payload) => {
    if (payload['match']) {
      state.matches.matches.push(payload['match']);
    }
  },
}

const actions = {
  async GET_MATCHES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches.json?fields=id,event_time,series{name},team1,team2`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_MATCHES', response.data);
        }
      })
      .catch(error => {
        return error;
    });
  },
  async GET_MATCH({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}json?fields=id,event_time,team1,team2`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_MATCH', response.data);
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