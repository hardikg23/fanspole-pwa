const state = () => ({
  me: {
    username: '',
    email: '',
    full_name: '',
    team_name: '',
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
  async SAVE_SETTINGS({commit}, payload){
    return await this.$axios
      .put(`/api/me.json?fields=username,email,full_name,team_name,dob`, payload)
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
