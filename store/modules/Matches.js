const state = () => ({
  matches: [],
  match: null
})

const getters = {
  matches: state => {
    return state.matches;
  },
  match: (state) => (id) => {
    let match = state.matches.find((match) => {
      if(match.id == id){
        return match;
      }
    });
    if(match != undefined){
      return match;
    }else{
      return state.match;
    }
  }
}

const mutations = {
  SET_MATCHES: (state, payload) => {
    if (payload['matches']) {
      payload['matches'].forEach(match => {
        state.matches.push(match);
      });
    }
  },
  RESET_MATCHES: (state) => {
    state.matches = [];
  },
  SET_MATCH: (state, payload) => {
    if (payload['match']) {
      state.match = payload['match'];
    }
  },
}

const actions = {
  async GET_MATCHES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches.json?fields=id,event_time_in_millis,series{name},team1,team2`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_MATCHES');
          commit('SET_MATCHES', response.data);
          commit('ApiHits/SET_ALL_MATCHES', null, { root: true });
        }
      })
      .catch(error => {
        return error;
    });
  },
  async GET_MATCH({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}.json?fields=id,event_time_in_millis,series{name},team1,team2`)
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