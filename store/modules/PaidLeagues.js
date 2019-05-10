const state = () => ({
  teams_count: 0,
  join_paid_leagues_count: 0,
  paid_leagues: [],
  paid_league: null,
  current_user_members: [],
  paid_league_members: [],
  joined_paid_leagues: [],
  paid_leagues_prizes: [],
  joining_confirmation: null,
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
  current_user_members: (state) => (league_id) => {
    return state.current_user_members.filter((member) => {
      return parseInt(member.league_id) == parseInt(league_id)
    });
  },
  paid_league_members: (state) => (league_id) => {
    return state.paid_league_members.filter((member) => {
      return parseInt(member.league_id) == parseInt(league_id)
    });
  },
  joined_paid_leagues: state => {
    return state.joined_paid_leagues;
  },
  paid_leagues_prizes: (state) => (league_id) => {
    return state.paid_leagues_prizes.filter((prize) => {
      return parseInt(prize.league_id) == parseInt(league_id)
    });
  },
  joining_confirmation: state => {
    return state.joining_confirmation
  },
  add_funds_amount: state => {
    if(state.joining_confirmation != undefined && state.joining_confirmation.popup == "add_funds"){
      return (state.joining_confirmation.entry_fee - state.joining_confirmation.current_balance)
    }else{
      return 100;
    }
  },
  selected_team: state => {
    if(state.joining_confirmation != undefined){
      var user_teams = state.joining_confirmation.user_teams
      var team_id = 0
      var i;
      for (i = 0; i < user_teams.length; i++) { 
        if(!user_teams[i].joined){
          team_id = user_teams[i].id
          break;
        }
      }
      return team_id
    }
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
    if(payload.data['current_user_member']) {
      payload.data['current_user_member'].forEach(member => {
        member.league_id = parseInt(payload.league_id);
        state.current_user_members.push(member);
      });
    }
    if(payload.data['paid_league_members']) {
      payload.data['paid_league_members'].forEach(member => {
        member.league_id = parseInt(payload.league_id);
        state.paid_league_members.push(member);
      });
    }
    if (payload.data['paid_league']) {
      state.paid_league = payload.data['paid_league']
    }
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
    if(payload.data['prizes']) {
      payload.data['prizes'].forEach(prize => {
        prize.league_id = parseInt(payload.league_id);
        state.paid_leagues_prizes.push(prize);
      });
    }
  },
  SET_JOINING_CONFIRMATION: (state, payload) => {
    state.joining_confirmation = payload;
  },
  RESET_JOINING_CONFIRMATION: (state, payload) => {
    state.joining_confirmation = null;
  },
  JOINED_CONTEST: (state, payload) => {
    let i = state.paid_leagues.map(item => item.id).indexOf(payload['paid_league'].id)
    state.paid_leagues.splice(i, 1, payload['paid_league']);
    state.join_paid_leagues_count++
  },
  SORT_PAID_LEAGUES: (state, payload) => {
    if(payload.id == 1){
      if(!payload.desc){
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(a.prize_amount) - parseInt(b.prize_amount)});
      }else{
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(b.prize_amount) - parseInt(a.prize_amount)});
      }
    }else if(payload.id == 2){
      if(!payload.desc){
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(a.members_limit) - parseInt(b.members_limit)});
      }else{
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(b.members_limit) - parseInt(a.members_limit)});
      }
    }else if(payload.id == 3){
      if(!payload.desc){
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(a.entry_fee) - parseInt(b.entry_fee)});
      }else{
        state.paid_leagues = state.paid_leagues.sort(function(a, b){return parseInt(b.entry_fee) - parseInt(a.entry_fee)});
      }
    }
  },
}

const actions = {
  async GET_PAID_LEAGUES({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/paid_leagues.json?fields=${payload.fields}`)
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
      .get(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}.json?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'league_id': payload.league_id}
          commit('SET_PAID_LEAGUE', state_payload);
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
      .get(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}/prizes?fields=${payload.fields}`)
      .then(response => {
        if (response.status == 200) {
          let state_payload = {'data': response.data, 'league_id': payload.league_id}
          commit('SET_PRIZES', state_payload);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_JOINING_CONFIRMATION({ commit, dispatch }, payload) {
    await this.$axios
      .post(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}/joining_confirmation`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_JOINING_CONFIRMATION');
          commit('SET_JOINING_CONFIRMATION', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async JOIN_CONTEST({ commit, dispatch }, payload) {
    await this.$axios
      .post(`/api/matches/${payload.id}/paid_leagues/${payload.league_id}/join.json`, {team_id: payload.team_id, fields: "id,prize_amount,entry_fee,paid_league_members_count,league_tags,members_limit,winner_count"})
      .then(response => {
        if (response.status == 200) {
          commit('JOINED_CONTEST', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async CREATE_CONTEST({ commit, dispatch }, payload) {
    return await this.$axios
      .post(`/api/matches/${payload.id}/paid_leagues.json`, payload.formData)
      .then(response => {
        if (response.status == 201){
          return response.data;
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
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