const state = () => ({
  user_teams: []
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
  }
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
  RESET_USER_TEAMS: (state, payload) => {
    state.user_teams = [];
  }
}

const actions = {
  async GET_USER_TEAMS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/matches/${payload}/user_teams.json?fields=id,team_no,rank,budget,score,captain,last_updated_at_in_millis,team_players`)
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
      .get(`/api/matches/${payload.id}/user_teams/${payload.team_id}.json?fields=id,team_no,rank,budget,score,captain,last_updated_at_in_millis,team_players`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_USER_TEAM', response.data);
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