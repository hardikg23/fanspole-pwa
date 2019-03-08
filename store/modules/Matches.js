const state = () => ({
  matches: {
    daily_matches: []
  }
})

const getters = {
  daily_matches: state => {
    return state.matches.daily_matches;
  },
  daily_match: (state) => (id) => {
    let match = state.matches.daily_matches.find((match) => {
      if(match.id == id){
        return match;
      }
    });
    return match;
  }
}

const mutations = {
  SET_DAILY_MATCHES: (state, payload) => {
    if (payload['matches']) {
      payload['matches'].forEach(match => {
        state.matches.daily_matches.push(match);
      });
    }
  },
  SET_DAILY_MATCH: (state, payload) => {
    if (payload['match']) {
      state.matches.daily_matches.push(payload['match']);
    }
  },
}

const actions = {
  async GET_DAILY_MATCHES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches.json?fields=id,event_time,series{name},team1,team2`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_DAILY_MATCHES', response.data);
        }
      })
      .catch(error => {
        return error;
    });
  },
  async GET_DAILY_MATCH({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}json?fields=id,event_time,series{name},team1,team2`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_DAILY_MATCH', response.data);
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