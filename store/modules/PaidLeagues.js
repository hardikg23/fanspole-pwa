const state = () => ({
  teams_count: 0,
  join_paid_leagues_count: 0,
  paid_leagues: []
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