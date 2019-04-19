import Vuex from 'vuex';

import ApiHits from './modules/ApiHits';
import CreateTeam from './modules/CreateTeam';
import Matches from './modules/Matches';
import Me from './modules/Me';
import MobileNumber from './modules/MobileNumber';
import Notifications from './modules/Notifications';
import Login from './modules/Login';
import Players from './modules/Players';
import PaidLeagues from './modules/PaidLeagues';
import Redemptions from './modules/Redemptions';
import Series from './modules/Series';
import User from './modules/User';
import UserTeams from './modules/UserTeams';
import UserCredits from './modules/UserCredits';
import UserPoints from './modules/UserPoints';

export default () => {
  return new Vuex.Store({
    modules: {
      ApiHits,
      CreateTeam,
      Matches,
      Me,
      MobileNumber,
      Notifications,
      Login,
      Players,
      PaidLeagues,
      Redemptions,
      Series,
      User,
      UserTeams,
      UserCredits,
      UserPoints
    }
  });
};
