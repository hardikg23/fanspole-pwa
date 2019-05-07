let appEnv = process.env.NODE_ENV || 'development';
import { MasterKeys } from './config.js';

const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Play Fantasy Cricket | Play Online Fantasy & win Cash Prizes",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: "Real Fantasy Cricket games online in India. Join Fantasy Sports @ FANSPOLE & play cricket games online to win cash daily. Play and earn points with family & friends while playing fun fantasy cricket games online." }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: 'https://www.fanspole.com/assets/head-7d59a3c7d10ba34190eed709544545a9.png' },
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
    '@/plugins/vuetify', 
    '@/plugins/axios', 
    { src: '@/plugins/ga', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    ['cookie-universal-nuxt', { parseJSON: true }]
  ],

  serverMiddleware: [
      { path: '/paytm/payment', handler: '~/server-middleware/postRequestHandler.js' },
      { path: '/payumoney/failure', handler: '~/server-middleware/postRequestHandler.js' },
      { path: '/payumoney/success', handler: '~/server-middleware/postRequestHandler.js' },
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    baseUrl: MasterKeys[appEnv].apiEndPoint
  },
  sentry: {
    public_key: "2c5212aa893f4b3cb1df21c33a6315ab",
    private_key: '',
    project_id: "1442703"
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
