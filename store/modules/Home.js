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
    console.log("inside api payload" + payload);
    if (payload['matches']) {
      payload['matches'].forEach(match => {
        state.matches.matches.push(match);
      });
      console.log("inside api 4" + state.matches);
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
        console.log("inside api error store/HOME.js");
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