const state = () => ({
  classic_team_scores: []
})

const getters = {
  classic_team_scores: (state) => (phase_id) => {
    return state.classic_team_scores.filter((team) => {
      return parseInt(team.series_phase_id) == parseInt(phase_id)
    });
  },
}

const mutations = {
  SET_RESULTS: (state, payload) => {
    if (payload['classic_team_scores']) {
      payload['classic_team_scores'].forEach(team => {
        state.classic_team_scores.push(team);
      });
    }
  },
  RESET_RESULTS: (state, payload) => {
    state.classic_team_scores = [];
  }
}

const actions = {
  async GET_RESULTS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases/${payload.id}/results.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_RESULTS', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}