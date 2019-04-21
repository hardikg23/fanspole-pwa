const state = () => ({
  series_phases: [],
  current_user_classic_team: null,
  classic_teams: []
})

const getters = {
  series_phases: state => {
    return state.series_phases;
  },
  classic_teams: state => {
    return state.classic_teams;
  },
  current_user_classic_team: state => {
    return state.current_user_classic_team;
  }
}

const mutations = {
  SET_PHASES: (state, payload) => {
    if (payload['series_phases']) {
      payload['series_phases'].forEach(phase => {
        state.series_phases.push(phase);
      });
    }
  },
  RESET_PHASES: (state, payload) => {
    state.series_phases = [];
  },
  SET_LEADERBOARD: (state, payload) => {
    if (payload['classic_teams']) {
      payload['classic_teams'].forEach(team => {
        state.classic_teams.push(team);
      });
    }
    if (payload['current_user_classic_team']) {
      state.current_user_classic_team = payload['current_user_classic_team']
    }
  },
  RESET_LEADERBOARD: (state, payload) => {
    state.current_user_classic_team = null;
    state.classic_teams = [];
  }
}

const actions = {
  async GET_PHASES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_PHASES');
          commit('SET_PHASES', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_LEADERBOARD({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases/${payload.id}/leaderboard?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_LEADERBOARD');
          commit('SET_LEADERBOARD', response.data);
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