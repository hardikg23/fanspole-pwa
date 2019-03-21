const state = () => ({
  me: {
    username: '',
    email: '',
    full_name: '',
    team_name: '',
    image: '',
    cricket_level: {},
    next_level: {},
    stats: {},
    user_points: {},
    current_balance: 0,
    unused_balance: 0,
    winning_balance: 0,
    dob: '2001-01-01'
  }
});

const getters = {
  username: state => {
    return state.me.username;
  },
  email: state => {
    return state.me.email;
  },
  full_name: state => {
    return state.me.full_name;
  },
  team_name: state => {
    return state.me.team_name;
  },
  image: state => {
    return state.me.image;
  },
  cricket_level: state => {
    return state.me.cricket_level;
  },
  next_level: state => {
    return state.me.next_level;
  },
  stats: state => {
    return state.me.stats;
  },
  user_points: state => {
    return state.me.user_points;
  },
  current_balance: state => {
    return state.me.current_balance;
  },
  unused_balance: state => {
    return state.me.unused_balance;
  },
  winning_balance: state => {
    return state.me.winning_balance;
  },
  dob: state => {
    return state.me.dob;
  }
};

const mutations = {
  SET_BALANCE: (state, payload) => {
    state.me.current_balance = payload.user.current_balance
    state.me.unused_balance = payload.user.unused_balance
    state.me.winning_balance = payload.user.winning_balance
  },
  SET_SETTINGS: (state, payload) => {
    state.me.username = payload.user.username
    state.me.email = payload.user.email
    state.me.full_name = payload.user.full_name
    state.me.team_name = payload.user.team_name
    state.me.dob = payload.user.dob
  },
  SET_PROFILE: (state, payload) => {
    state.me.image = payload.user.image
    state.me.team_name = payload.user.team_name
    state.me.cricket_level = payload.user.cricket_level
    state.me.next_level = payload.user.next_level
    state.me.stats = payload.user.stats
    state.me.user_points = payload.user.user_points
  }
};

const actions = {
  async GET_ME({ commit }, payload) {
    return await this.$axios
      .get(`/api/me?fields=id,display_name,team_name,cricket_level,image,current_balance`)
      .then((response) => {
        if (response.status == 200) {
          if(process.browser){
            localStorage.setItem('me_display_name', response.data.user.display_name);
            localStorage.setItem('me_team_name', response.data.user.team_name);
            localStorage.setItem('me_image', response.data.user.image);
            localStorage.setItem('me_cricket_level', response.data.user.cricket_level.level);
            localStorage.setItem('me_current_balance', response.data.user.current_balance);
          }
        }
      });
  },
  async GET_BALANCE({ commit }, payload) {
    return await this.$axios
      .get(`/api/me.json?fields=current_balance,unused_balance,winning_balance`)
      .then((response) => {
        if (response.status == 200) {
          if(process.browser){
            localStorage.setItem('me_current_balance', response.data.user.current_balance);
          }
          commit('SET_BALANCE', response.data);
        }
      });
  },
  async GET_SETTINGS({ commit }, payload) {
    return await this.$axios
      .get(`/api/me.json?fields=username,email,full_name,team_name,dob`)
      .then((response) => {
        commit('SET_SETTINGS', response.data);
      });
  },
  async GET_PROFILE({ commit }, payload) {
    return await this.$axios
      .get(`/api/me.json?fields=team_name,cricket_level,next_level,image,stats,user_points{rank,series,total_score}`)
      .then((response) => {
        commit('SET_PROFILE', response.data);
      });
  },
  async SAVE_SETTINGS({commit}, payload){
    return await this.$axios
      .put(`/api/me.json?fields=`, payload)
      .then((response) => {
        commit('SET_SETTINGS', response.data);
      }).catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
