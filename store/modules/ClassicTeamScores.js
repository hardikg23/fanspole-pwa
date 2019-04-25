const state = () => ({
  classic_team_scores: [],
  classic_team_scores_result: null,
  classic_team_scores_history: [],
})

const getters = {
  classic_team_scores: (state) => (phase_id) => {
    return state.classic_team_scores.filter((team) => {
      return parseInt(team.series_phase_id) == parseInt(phase_id)
    });
  },
  classic_team_scores_result: state => {
    return state.classic_team_scores_result;
  },
  classic_team_scores_history: state => {
    return state.classic_team_scores_history;
  }
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
  },
  SET_CLASSIC_TEAM_SCORE: (state, payload) => {
    if (payload['classic_team_score']) {
      state.classic_team_scores_result = payload['classic_team_score']
    }
  },
  SET_HISTORY: (state, payload) => {
    state.classic_team_scores_history = [];
    if (payload['classic_team_scores']) {
      payload['classic_team_scores'].forEach(team => {
        state.classic_team_scores_history.push(team);
      });
    }
  },
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
  async GET_CLASSIC_TEAM_SCORE({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/classic_team_scores/${payload.id}.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_CLASSIC_TEAM_SCORE', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_HISTORY({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/classic_teams/${payload.id}/history.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_HISTORY', response.data);
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