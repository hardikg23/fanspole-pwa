const state = () => ({
  series_phases: [],
})

const getters = {
  series_phases: state => {
    return state.series_phases;
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
  }
}

const actions = {
  async GET_PHASES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases?fields=id,name,current_user_classic_team`)
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}