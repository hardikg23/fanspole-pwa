const state = () => ({
  players: [],
  series_players: []
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
}

const actions = {
  async GET_PLAYERS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}/players.json?fields=id,name,display_name,display_info,value,style,last_series_score,team{name_attr,jersey_photo,team_color}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'match_id': payload}
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}