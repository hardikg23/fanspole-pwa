const state = () => ({
  teams_count: 0,
  join_paid_leagues_count: 0,
  paid_leagues: [],
  paid_league: null,
  current_user_members: [],
  paid_league_members: [],
  joined_paid_leagues: [],
  paid_leagues_prizes: []
})

const getters = {
  teams_count: state => {
    return state.teams_count;
  },
  join_paid_leagues_count: state => {
    return state.join_paid_leagues_count;
  },
  paid_leagues: state => {
    return state.paid_leagues;
  },
  paid_league: state => {
    return state.paid_league;
  },
  current_user_members: state => {
    return state.current_user_members;
  },
  paid_league_members: state => {
    return state.paid_league_members;
  },
  joined_paid_leagues: state => {
    return state.joined_paid_leagues;
  },
  paid_leagues_prizes: state => {
    return state.paid_leagues_prizes;
  }
}

const mutations = {
  SET_PAID_LEAGUES: (state, payload) => {
    if (payload['paid_leagues']) {
      payload['paid_leagues'].forEach(league => {
        state.paid_leagues.push(league);
      });
    }
    state.teams_count = payload['teams_count'];
    state.join_paid_leagues_count = payload['join_paid_leagues_count'];
  },
  RESET_PAID_LEAGUES: (state, payload) => {
    state.paid_leagues = [];
  },
  SET_PAID_LEAGUE: (state, payload) => {
    if (payload['current_user_member']) {
      payload['current_user_member'].forEach(member => {
        state.current_user_members.push(member);
      });
    }
    if (payload['paid_league_members']) {
      payload['paid_league_members'].forEach(member => {
        state.paid_league_members.push(member);
      });
    }
    if (payload['paid_league']) {
      state.paid_league = payload['paid_league']
    }
  },
  RESET_PAID_LEAGUE: (state, payload) => {
    state.current_user_members = [];
    state.paid_league_members = [];
    state.paid_league = null;
  },
  SET_JOINED_PAID_LEAGUES: (state, payload) => {
    if (payload['joined_paid_leagues']) {
      payload['joined_paid_leagues'].forEach(league => {
        state.joined_paid_leagues.push(league);
      });
    }
    if (payload['joined_paid_league_members']) {
      payload['joined_paid_league_members'].forEach(league => {
        state.joined_paid_leagues.push(league);
      });
    }
  },
  RESET_JOINED_PAID_LEAGUES: (state, payload) => {
    state.joined_paid_leagues = [];
  },
  SET_PRIZES: (state, payload) => {
    console.log(payload);
    if (payload['prizes']) {
      payload['prizes'].forEach(prize => {
        state.paid_leagues_prizes.push(prize);
      });
    }
  },
  RESET_PRIZES: (state, payload) => {
    state.paid_leagues_prizes = [];
  },
}

const actions = {
  async GET_PAID_LEAGUES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}/paid_leagues.json?fields=id,prize_amount,entry_fee,paid_league_members_count,members_limit,winner_count`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_PAID_LEAGUES', response.data);
        }
      })
      .catch(error => {
        if (error.response.status == 422){
          this.$router.push(`/matches/${payload}/my-joined-leagues`);
        }
      });
  },
  async GET_PAID_LEAGUE({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}.json?fields=id,rank,event_team{team_no,score},user{team_name,image,id}`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_PAID_LEAGUE');
          commit('SET_PAID_LEAGUE', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_JOINED_PAID_LEAGUES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/paid_leagues/joined_leagues.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_JOINED_PAID_LEAGUES', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_PRIZES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}/prizes?fields=id,rank_text,amount`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_PRIZES');
          commit('SET_PRIZES', response.data);
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