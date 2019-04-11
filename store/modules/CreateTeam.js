const state = () => ({
  created_team: {
    captain_id: null,
    selected_players_count: 0,
    selected_players: [],
    selected_players_hash: [],
    balanced_wk: false,
    balanced_pure_wk: false,
    balanced_bat: false,
    balanced_ar: false,
    balanced_bowl: false,
    balanced_ar_and_bowl: false,
    selected_wk: 0,
    selected_bat: 0,
    selected_ar: 0,
    selected_bowl: 0,
    budget: 100.0,
    valid_team: false
  }
})

const getters = {
  captain_id: state => {
    return state.created_team.captain_id;
  },
  selected_players_count: state => {
    return state.created_team.selected_players_count;
  },
  selected_players: state => {
    return state.created_team.selected_players;
  },
  selected_players_hash: state => {
    return state.created_team.selected_players_hash.sort(function(a, b){return a.style - b.style});
  },
  balanced_wk: state => {
    return state.created_team.balanced_wk;
  },
  balanced_pure_wk: state => {
    return state.created_team.balanced_pure_wk;
  },
  balanced_bat: state => {
    return state.created_team.balanced_bat;
  },
  balanced_ar: state => {
    return state.created_team.balanced_ar;
  },
  balanced_bowl: state => {
    return state.created_team.balanced_bowl;
  },
  balanced_ar_and_bowl: state => {
    return state.created_team.balanced_ar_and_bowl;
  },
  selected_wk: state => {
    return state.created_team.selected_wk;
  },
  selected_bat: state => {
    return state.created_team.selected_bat;
  },
  selected_ar: state => {
    return state.created_team.selected_ar;
  },
  selected_bowl: state => {
    return state.created_team.selected_bowl;
  },
  budget: state => {
    return state.created_team.budget;
  },
  valid_team: state => {
    return state.created_team.valid_team;
  }
}

const mutations = {
  SET_CAPTAIN: (state, id) => {
    state.created_team.captain_id = id;
  },
  SET_CREATE_TEAM: (state, payload) => {
    state.created_team.captain_id = payload.user_team.captain.id;
    state.created_team.selected_players_hash = payload.user_team.team_players;
    state.created_team.valid_team = true;
    state.created_team.selected_players = []
    payload.user_team.team_players.forEach(player => {
      state.created_team.selected_players.push(parseInt(player.id));
    });
    state.created_team.selected_players_count = state.created_team.selected_players.length;
    let budget = 0;
    state.created_team.balanced_wk = true
    state.created_team.balanced_pure_wk = true
    state.created_team.balanced_bat = true
    state.created_team.balanced_ar = true
    state.created_team.balanced_bowl = true
    state.created_team.balanced_ar_and_bowl = true
    state.created_team.budget = 100.0 - budget;
  },
  PUSH_SELECTED_PLAYER: (state, id) => {
    state.created_team.selected_players.push(id);
  },
  PUSH_SELECTED_PLAYER_HASH: (state, payload) => {
    state.created_team.selected_players_hash.push(payload);
  },
  POP_SELECTED_PLAYER: (state, id) => {
    state.created_team.selected_players.splice(state.created_team.selected_players.indexOf(id), 1);
  },
  POP_SELECTED_PLAYER_HASH: (state, id) => {
    var players = []
    players = state.created_team.selected_players_hash.filter((player) => {
      if(player.id != id){ return player }
    });
    state.created_team.selected_players_hash = players;
  },
  VALIDATE_TEAM: (state) => {
    var valid_team = true;
    if(state.created_team.selected_players_count != 11){
      valid_team = false;
    }
    var array = []
    state.created_team.selected_players_hash.forEach(player => {
      array.push(parseInt(player.style));
    });
    array = array.sort(function(a, b){return a-b});
    var BATSMAN = 0;
    var PURE_KEEPER = 0;
    var KEEPER = 0;
    var ALL_ROUNDER = 0;
    var BOWLER = 0;
    for(var i=0;i<array.length;i++){
      if(array[i] == 1){ BATSMAN += 1; }
      else if(array[i] == 5){
        if (KEEPER == 1) 
          BATSMAN += 1;
        else
          KEEPER += 1; 
        }
      else if(array[i] == 7){ 
        PURE_KEEPER += 1;
        if(KEEPER >= 1){
          KEEPER --;
          BATSMAN ++;
        }
      }
      else if(array[i] == 9){ ALL_ROUNDER += 1;}
      else if(array[i] == 13){ BOWLER += 1; }
    }
    for(var i=0;i<array.length;i++){
      if(array[i] == 3){
        if (BATSMAN < 4)
          BATSMAN += 1;
        else
          ALL_ROUNDER += 1;
      }
      else if(array[i] == 11){
        if (ALL_ROUNDER >= 1)
          BOWLER += 1;
        else
          ALL_ROUNDER += 1; 
      }
    }

    state.created_team.balanced_wk = true
    state.created_team.balanced_pure_wk = true
    state.created_team.balanced_bat = true
    state.created_team.balanced_ar = true
    state.created_team.balanced_bowl = true
    state.created_team.balanced_ar_and_bowl = true
    if(PURE_KEEPER > 1){
      state.created_team.balanced_pure_wk = false
    }
    if(PURE_KEEPER == 0 && KEEPER == 0){
      state.created_team.balanced_wk = false
    }
    if(BATSMAN < 4){
      state.created_team.balanced_bat = false
    }
    if(ALL_ROUNDER < 1){
      state.created_team.balanced_ar = false
    }
    if(BOWLER < 1){
      state.created_team.balanced_bowl = false
    }
    if((ALL_ROUNDER + BOWLER) < 5){
      state.created_team.balanced_ar_and_bowl = false
    }
    if((PURE_KEEPER > 1) || (BATSMAN < 4) || (PURE_KEEPER == 0 && KEEPER == 0) || (ALL_ROUNDER < 1) || (BOWLER < 2) || ((ALL_ROUNDER + BOWLER) < 5)){
      valid_team = false 
    }
    state.created_team.valid_team = valid_team;
  },
  UPDATE_DATA: (state) => {
    state.created_team.selected_players_count = state.created_team.selected_players.length;
    let budget = 0;
    state.created_team.selected_players_hash.forEach(function(element) {
      budget = budget + parseFloat(element.value);
    });
    state.created_team.budget = 100.0 - budget;
  }
}

const actions = {
  async SAVE_TEAM({ commit }, payload) {
    return await this.$axios
      .post(`/api/matches/${payload.id}/user_teams`, {player_ids: payload.player_ids.join(','), captain: payload.captain})
      .then((response) => {
        if (response.status == 201 || response.status == 200) {
          this.$router.push(
            `/matches/${payload.id}/teams`
          );
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
  async EDIT_TEAM({ commit }, payload) {
    return await this.$axios
      .put(`/api/matches/${payload.id}/user_teams/${payload.team_id}`, {player_ids: payload.player_ids.join(','), captain: payload.captain})
      .then((response) => {
        if (response.status == 201 || response.status == 200) {
          this.$router.push(`/matches/${payload.id}/teams`);
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          throw error.response;
        }
        return error;
      });
  },
  async GET_TEAM({ commit }, payload) {
    return await this.$axios
      .get(`/api/matches/${payload.id}/user_teams/${payload.team_id}/edit?fields=id,team_no,budget,captain,team_players`)
      .then((response) => {
        if (response.status == 200) {
          commit('SET_CREATE_TEAM', response.data);
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