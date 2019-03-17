let appEnv = process.env.NODE_ENV || 'development';
import { MasterKeys } from './config.js';

const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,600,700,800,900|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/common.css',
    '@/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify', '@/plugins/axios'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { parseJSON: true }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    baseUrl: MasterKeys[appEnv].apiEndPoint
  },

  proxy: {
    '/api': {
      target: MasterKeys[appEnv].apiEndPoint,
      pathRewrite: { '^/api/': '' },
      headers: { 'X-Fanspole-Client': MasterKeys[appEnv].clientId }
    },
    '/post_login': {
      target: MasterKeys[appEnv].apiOauthEndPoint,
      pathRewrite: { '^/post_login/': '' },
      headers: { 'X-Fanspole-Client': MasterKeys[appEnv].clientId }
    },
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
