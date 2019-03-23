const state = () => ({
  series: [],
})

const getters = {
  series: state => {
    return state.series;
  },
  first_series: state => {
    return state.series[0];
  }
}

const mutations = {
  SET_ALL_SERIES: (state, payload) => {
    if (payload['series']) {
      payload['series'].forEach(s => {
        state.series.push(s);
      });
    }
  }
}

const actions = {
  async GET_ALL_SERIES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/series.json?fields=id,name`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_ALL_SERIES', response.data);
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