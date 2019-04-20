import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#1a237e', // a color that is not in the material colors palette
    championship: '#D50000',
    accent: '#7f7f7f',
    secondary: '#1D89D1',
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: '#D50000',
    success: colors.green.accent3
  }
})
