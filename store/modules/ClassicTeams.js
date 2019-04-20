const state = () => ({
  classic_teams: [],
  classic_team_row: {}
})

const getters = {
  classic_team: (state) => (id) => {
    let classic_team = state.classic_teams.find((team) => {
      if(team.id == id){
        return team;
      }
    });
    return classic_team;
  },
  classic_team_row:  state => {
    return state.classic_team_row;
  },
}

const mutations = {
  SET_CLASSIC_TEAM: (state, payload) => {
    if (payload['classic_team']) {
      state.classic_teams.push(payload['classic_team']);      
    }
  },
  SET_CLASSIC_TEAM_ROW: (state, id) => {
    let classic_team = state.classic_teams.find((team) => {
      if(team.id == id){
        return team;
      }
    });
    if(classic_team != undefined){
      let row1 = classic_team.team_players.slice(0, 4);
      let row2 = classic_team.team_players.slice(4, 7);
      let row3 = classic_team.team_players.slice(7, 11);
      state.classic_team_row = {row1: row1, row2: row2, row3: row3}
    }
  },
}

const actions = {
  async GET_CLASSIC_TEAM({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/championship/classic_teams/${payload.team_id}.json?fields=id,team_players,score,captain,user{id,team_name}`)
      .then(response => {
        if (response.status == 200) {
          commit('SET_CLASSIC_TEAM', response.data);
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