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
    console.log("inside api payload['matches']" + payload);
    if (payload['matches']) {
      payload['matches'].forEach(match => {
        console.log("inside api match" + match);
        state.matches.matches.push(match);
      });
      
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
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}