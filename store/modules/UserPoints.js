const state = () => ({
  users_points: [],
  current_user_point: null
})

const getters = {
  users_points: state => {
    return state.users_points;
  },
  current_user_point: state => {
    return state.current_user_point;
  }
}

const mutations = {
  SET_USER_POINTS: (state, payload) => {
    if (payload['users_points']) {
      payload['users_points'].forEach(points => {
        state.users_points.push(points);
      });
    }
  },
  SET_CURRENT_USER_POINTS: (state, payload) => {
    if (payload['current_user_point']) {
      state.current_user_point = payload['current_user_point']
    }
  },
  RESET_USER_POINTS: (state, payload) => {
    state.users_points = []
  },
  RESET_CURRENT_USER_POINTS: (state, payload) => {
    state.current_user_point = null
  }
}

const actions = {
  async GET_USER_POINTS({ commit, dispatch }, payload) {
    await this.$axios
      .get(`/api/series/${payload}/leaderboard?per_page=200&fields=id,total_score,rank,user{id,team_name,image}`)
      .then(response => {
        if (response.status == 200) {
          commit('RESET_USER_POINTS');
          commit('RESET_CURRENT_USER_POINTS');
          commit('SET_USER_POINTS', response.data);
          commit('SET_CURRENT_USER_POINTS', response.data);
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