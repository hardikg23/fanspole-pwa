const state = () => ({
  gangs: [],
  gang: null,
  members: []
})

const getters = {
  gangs: (state) => (series_id) => {
    return state.gangs.filter((gang) => {
      return parseInt(gang.series_id) == parseInt(series_id)
    });
  },
  gang: (state) => {
    return state.gang;
  },
  members: (state) => (gang_id) => {
    return state.members.filter((member) => {
      return parseInt(member.gang_id) == parseInt(gang_id)
    });
  },
}

const mutations = {
  SET_GANGS: (state, payload) => {
    if(payload.data['gangs']) {
      payload.data['gangs'].forEach(gang => {
        gang.series_id = parseInt(payload.series_id);
        state.gangs.push(gang);
      });
    }
  },
  GET_MEMBERS: (state, payload) => {
    if(payload.data['gang']) {
      state.gang = payload.data['gang'];
    }
    if(payload.data['members']) {
      payload.data['members'].forEach(member => {
        member.gang_id = parseInt(payload.gang_id);
        state.members.push(member);
      });
    }
  }
}

const actions = {
  async GET_GANGS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/series/${payload.id}/leagues/my_leagues.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'series_id': payload.id}
          commit('SET_GANGS', state_payload);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_MEMBERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/series/${payload.series_id}/leagues/${payload.gang_id}.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'gang_id': payload.gang_id}
          commit('GET_MEMBERS', state_payload);
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