const MasterKeys = {
  development: {
    apiOauthEndPoint: 'http://localhost:3000/oauth/token',
    apiEndPoint: 'http://localhost:3000/api/v3/',
    clientId: '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb',
    facebookAppId: '669362659769837',
    googleClientId: '264550764233-aqbbl4las10s5avh3tbg2cedkr0ahavp.apps.googleusercontent.com'
  },
  production: {
    apiOauthEndPoint: 'https://www.fanspole.com/oauth/token',
    apiEndPoint: 'https://www.fanspole.com/api/v3/',
    clientId: '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb',
    facebookAppId: '1396301354009463',
    googleClientId: '264550764233-lfqncmclbmvu7528f8p811tbmv81hjvn.apps.googleusercontent.com'
  }
};

export { MasterKeys };
