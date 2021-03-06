const state = () => ({
  series_phases: [],
  current_user_classic_team: [],
  classic_teams: [],
  transfer_windows: null,
  prizes: null
})

const getters = {
  series_phases: state => {
    return state.series_phases;
  },
  series_phase: (state) => (id) => {
    let series_phase = state.series_phases.find((phase) => {
      if(phase.id == id){
        return phase;
      }
    });
    return series_phase;
  },
  transfer_windows: state => {
    return state.transfer_windows;
  },
  prizes: state => {
    return state.prizes;
  },
  classic_teams: (state) => (phase_id) => {
    return state.classic_teams.filter((team) => {
      return parseInt(team.series_phase_id) == parseInt(phase_id)
    });
  },
  current_user_classic_team: (state) => (phase_id) => {
    let team = state.current_user_classic_team.find((team) => {
      if(parseInt(team.series_phase_id) == parseInt(phase_id)){
        return team;
      }
    });
    return team
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
      state.current_user_classic_team.push(payload['current_user_classic_team'])
    }
  },
  RESET_LEADERBOARD: (state, payload) => {
    state.classic_teams = [];
    state.current_user_classic_team = [];
  },
  SET_TRANSFER_WINDOW: (state, payload) => {
    let series_phase = state.series_phases.find((phase) => {
      if(phase.id == payload){
        return phase;
      }
    });
    state.transfer_windows = series_phase.transfer_windows
  },
  SET_PRIZES: (state, payload) => {
    let series_phase = state.series_phases.find((phase) => {
      if(phase.id == payload){
        return phase;
      }
    });
    state.prizes = series_phase.prizes
  },
}

const actions = {
  async GET_PHASES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases.json?fields=${payload.fields}`)
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
      .get(`/api/championship/series_phases/${payload.id}/leaderboard.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
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