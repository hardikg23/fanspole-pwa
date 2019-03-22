import Vuex from 'vuex';

import ApiHits from './modules/ApiHits';
import CreateTeam from './modules/CreateTeam';
import Matches from './modules/Matches';
import Me from './modules/Me';
import Login from './modules/Login';
import Players from './modules/Players';
import PaidLeagues from './modules/PaidLeagues';
import UserTeams from './modules/UserTeams';
import UserCredits from './modules/UserCredits';

export default () => {
  return new Vuex.Store({
    modules: {
      ApiHits,
      CreateTeam,
      Matches,
      Me,
      Login,
      Players,
      PaidLeagues,
      UserTeams,
      UserCredits
    }
  });
};
