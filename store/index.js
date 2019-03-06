import Vuex from 'vuex';

import Home from './modules/Home';
import PaidLeagues from './modules/PaidLeagues';

export default () => {
  return new Vuex.Store({
    modules: {
      Home,
      PaidLeagues
    }
  });
};
