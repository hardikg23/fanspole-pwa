const state = () => ({
  players: [],
  series_players: [],
  phase_players: [],
  phase_filters: [],
  applied_filter: null,
})

const getters = {
  players: (state) => (match_id) => {
    return state.players.filter((player) => {
      return parseInt(player.match_id) == parseInt(match_id)
    });
  },
  series_players: (state) => {
    return state.series_players
  },
  get_wk_players: (state) => (match_id) => {
    return state.players.filter((player) => {
      return (parseInt(player.match_id) == parseInt(match_id)) && (player.style === 5 || player.style === 7);
    });
  },
  get_bat_players: (state) => (match_id) => {
    return state.players.filter((player) => {
      return (parseInt(player.match_id) == parseInt(match_id)) && (player.style === 1 || player.style === 3 || player.style === 5);
    });
  },
  get_ar_players: (state) => (match_id) => {
    return state.players.filter((player) => {
      return (parseInt(player.match_id) == parseInt(match_id)) && (player.style === 3 || player.style === 9 || player.style === 11);
    });
  },
  get_bowl_players: (state) => (match_id) => {
    return state.players.filter((player) => {
      return (parseInt(player.match_id) == parseInt(match_id)) && (player.style === 11 || player.style === 13);
    });
  },

  phase_players: (state) => (phase_id) => {
    return state.phase_players.filter((player) => {
      return parseInt(player.phase_id) == parseInt(phase_id)
    });
  },
  phase_filters: (state) => (phase_id) => {
    return state.phase_filters.filter((filter) => {
      return parseInt(filter.phase_id) == parseInt(phase_id)
    });
  },
  applied_filter: (state) => (phase_id) => {
    if(state.applied_filter == undefined){
      let filters = state.phase_filters.filter((f) => {
        return parseInt(f.phase_id) == parseInt(phase_id)
      });
      return filters[0]
    }else{
      return state.applied_filter;
    }
  },
  get_phase_wk_players: (state) => (phase_id) => {
    return state.phase_players.filter((player) => {
      return (parseInt(player.phase_id) == parseInt(phase_id)) && (player.style === 5 || player.style === 7);
    });
  },
  get_phase_bat_players: (state) => (phase_id) => {
    return state.phase_players.filter((player) => {
      return (parseInt(player.phase_id) == parseInt(phase_id)) && (player.style === 1 || player.style === 3 || player.style === 5);
    });
  },
  get_phase_ar_players: (state) => (phase_id) => {
    return state.phase_players.filter((player) => {
      return (parseInt(player.phase_id) == parseInt(phase_id)) && (player.style === 3 || player.style === 9 || player.style === 11);
    });
  },
  get_phase_bowl_players: (state) => (phase_id) => {
    return state.phase_players.filter((player) => {
      return (parseInt(player.phase_id) == parseInt(phase_id)) && (player.style === 11 || player.style === 13);
    });
  }
}

const mutations = {
  SET_PLAYERS: (state, payload) => {
    if(payload.data['players']) {
      payload.data['players'].forEach(player => {
        player.match_id = parseInt(payload.match_id);
        state.players.push(player);
      });
    }
  },
  SET_SERIES_PLAYERS: (state, payload) => {
    if (payload['players']) {
      payload['players'].forEach(player => {
        state.series_players.push(player);
      });
    }
  },
  RESET_SERIES_PLAYERS: (state, payload) => {
    state.series_players = []
  },
  SET_PHASE_PLAYERS: (state, payload) => {
    if(payload.data['players']) {
      payload.data['players'].forEach(player => {
        player.phase_id = parseInt(payload.phase_id);
        state.phase_players.push(player);
      });
    }
    if(payload.data['filters']) {
      payload.data['filters'].forEach(filter => {
        filter.phase_id = parseInt(payload.phase_id);
        state.phase_filters.push(filter);
      });
    }
  },
  SET_APPLIED_FILTER: (state, payload) => {
    state.applied_filter = payload;
  }
}

const actions = {
  async GET_PLAYERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/players.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'match_id': payload.id}
          commit('SET_PLAYERS', state_payload);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_SERIES_PLAYERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/series/${payload}/players.json?per_page=200&fields=id,name,value,style,last_series_score,team{name_attr,jersey_photo,team_color}`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_SERIES_PLAYERS', response.data);
          commit('SET_SERIES_PLAYERS', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_PHASE_PLAYERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/series_phases/${payload.id}/players.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'phase_id': payload.id}
          commit('SET_PHASE_PLAYERS', state_payload);
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