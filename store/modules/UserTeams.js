const state = () => ({
  user_teams: [],
  user_team_row: {}
})

const getters = {
  user_teams: state => {
    return state.user_teams;
  },
  user_team: (state) => (id) => {
    let user_team = state.user_teams.find((team) => {
      if(team.id == id){
        return team;
      }
    });
    return user_team;
  },
  user_team_row:  state => {
    return state.user_team_row;
  },
}

const mutations = {
  SET_USER_TEAMS: (state, payload) => {
    if (payload['user_teams']) {
      payload['user_teams'].forEach(team => {
        state.user_teams.push(team);
      });
    }
  },
  SET_USER_TEAM: (state, payload) => {
    if (payload['user_team']) {
      state.user_teams.push(payload['user_team']);
    }
  },
  SET_USER_TEAM_ROW: (state, id) => {
    let user_team = state.user_teams.find((team) => {
      if(team.id == id){
        return team;
      }
    });
    if(user_team != undefined){
      let row1 = user_team.team_players.slice(0, 4);
      let row2 = user_team.team_players.slice(4, 7);
      let row3 = user_team.team_players.slice(7, 11);
      state.user_team_row = {row1: row1, row2: row2, row3: row3}
    }
  },
  RESET_USER_TEAMS: (state, payload) => {
    state.user_teams = [];
  }
}

const actions = {
  async GET_USER_TEAMS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}/user_teams.json?fields=id,team_no,rank,budget,score,captain,last_updated_at_in_millis,team_players,is_current_user_allowed_to_edit,user{id,team_name}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_USER_TEAMS', response.data);
        }
      })
      .catch(error => {
        return error;
      });
  },
  async GET_USER_TEAM({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload.id}/user_teams/${payload.team_id}.json?fields=id,team_no,rank,budget,score,captain,last_updated_at_in_millis,team_players,is_current_user_allowed_to_edit,user{id,team_name}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_USER_TEAM', response.data);
        }
      })
      .catch(error => {
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