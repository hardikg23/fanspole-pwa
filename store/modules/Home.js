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
      console.log("inside api 4" + state.matches);
    }
  },
}

const actions = {
  async GET_MATCHES({ commit, dispatch }, payload) {
    console.log("inside api 2" + process.env._AXIOS_BASE_URL_);
    await this.$axios
      .get(`/api/matches.json?fields=id,event_time,series{name},team1,team2`)
      .then(response => {
        console.log("inside api response" + response.data);
        if (response.status == 200) {
          console.log("inside api response.data" + response.data);
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