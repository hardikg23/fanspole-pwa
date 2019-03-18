const state = () => ({
  created_team: {
    captain_id: null,
    selected_players_count: 0,
    selected_players: [],
    selected_players_hash: [],
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
    return state.created_team.selected_players_hash;
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
  PUSH_SELECTED_PLAYER: (state, id) => {
    state.created_team.selected_players.push(id);
  },
  POP_SELECTED_PLAYER: (state, id) => {
    state.created_team.selected_players.splice(state.created_team.selected_players.indexOf(id), 1);
  },
  PUSH_SELECTED_PLAYER_HASH: (state, payload) => {
    state.created_team.selected_players_hash.push(payload);
  },
  POP_SELECTED_PLAYER_HASH: (state, id) => {
    state.created_team.selected_players_hash.splice(state.created_team.selected_players.indexOf(id), 1);
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
    if((PURE_KEEPER > 1) || (BATSMAN < 4) || (PURE_KEEPER == 0 && KEEPER == 0) || (ALL_ROUNDER < 1) || (BOWLER < 2) || ((ALL_ROUNDER + BOWLER) < 5)){
      valid_team = false 
    }
    state.created_team.valid_team = valid_team;
  },
  UPDATE_DATA: (state) => {
    state.created_team.selected_players_count = state.created_team.selected_players.length;
    let budget = 0;
    let selected_bat = 0;
    let selected_wk = 0;
    let selected_ar = 0;
    let selected_bowl = 0;
    state.created_team.selected_players_hash.forEach(function(element) {
      budget = budget + parseFloat(element.value);
      switch(element.style) {
        case 1:
          selected_bat++
          break;
        case 3:
          selected_bat++
          selected_ar++
          break;
        case 5:
          selected_bat++
          selected_wk++
          break;
        case 7:
          selected_wk++
          break;
        case 9:
          selected_ar++
          break;
        case 11:
          selected_bowl++
          selected_ar++
          break;
        default:
          selected_bowl++
          break;
      }
    });
    state.created_team.budget = 100.0 - budget;
    state.created_team.selected_wk = selected_wk;
    state.created_team.selected_bat = selected_bat;
    state.created_team.selected_ar = selected_ar;
    state.created_team.selected_bowl = selected_bowl;
  }
}

const actions = {
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}