import Vuex from 'vuex';

import ApiHits from './modules/ApiHits';
import ClassicCreateTeam from './modules/ClassicCreateTeam';
import ClassicGangs from './modules/ClassicGangs';
import ClassicTeams from './modules/ClassicTeams';
import ClassicTeamScores from './modules/ClassicTeamScores';
import CreateTeam from './modules/CreateTeam';
import Common from './modules/Common';
import Matches from './modules/Matches';
import Me from './modules/Me';
import MobileNumber from './modules/MobileNumber';
import Notifications from './modules/Notifications';
import Login from './modules/Login';
import PaidLeagues from './modules/PaidLeagues';
import Payment from './modules/Payment';
import Players from './modules/Players';
import Redemptions from './modules/Redemptions';
import Series from './modules/Series';
import SeriesPhases from './modules/SeriesPhases';
import User from './modules/User';
import UserTeams from './modules/UserTeams';
import UserCredits from './modules/UserCredits';
import UserPoints from './modules/UserPoints';

export default () => {
  return new Vuex.Store({
    modules: {
      ApiHits,
      ClassicCreateTeam,
      ClassicGangs,
      ClassicTeams,
      ClassicTeamScores,
      CreateTeam,
      Common,
      Matches,
      Me,
      MobileNumber,
      Notifications,
      Login,
      PaidLeagues,
      Payment,
      Players,
      Redemptions,
      Series,
      SeriesPhases,
      User,
      UserTeams,
      UserCredits,
      UserPoints
    }
  });
};
