const state = () => ({
  team_created: false,
  paid_leagues: []
})

const getters = {
  team_created: state => {
    return state.team_created;
  },
  paid_leagues: state => {
    return state.paid_leagues;
  }
}

const mutations = {
  SET_PAID_LEAGUES: (state, payload) => {
    if (payload['paid_leagues']) {
      payload['paid_leagues'].forEach(league => {
        state.paid_leagues.push(league);
      });
    }
    if(payload['team_created']){
      state.team_created = true;
    }
  },
  RESET_PAID_LEAGUES: (state, payload) => {
    state.paid_leagues = [];
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