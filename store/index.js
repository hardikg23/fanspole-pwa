import Vuex from 'vuex';

import Matches from './modules/Matches';
import Login from './modules/Login';
import Players from './modules/Players';
import PaidLeagues from './modules/PaidLeagues';

export default () => {
  return new Vuex.Store({
    modules: {
      Matches,
      Login,
      Players,
      PaidLeagues
    }
  });
};
