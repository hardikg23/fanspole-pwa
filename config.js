const MasterKeys = {
  development: {
    apiOauthEndPoint: 'http://localhost:3000/oauth/token.json',
    apiEndPoint: 'http://localhost:3000/api/v3/',
    clientId: '94755f4859da968586e894f5f699c98efd77d4a9737a9f74faad0fac04210814',
    facebookAppId: '669362659769837',
    googleClientId: '264550764233-aqbbl4las10s5avh3tbg2cedkr0ahavp.apps.googleusercontent.com'
  },
  production: {
    apiOauthEndPoint: 'https://www.fanspole.com/oauth/token.json',
    apiEndPoint: 'https://www.fanspole.com/api/v3/',
    clientId: '94755f4859da968586e894f5f699c98efd77d4a9737a9f74faad0fac04210814',
    facebookAppId: '1396301354009463',
    googleClientId: '264550764233-lfqncmclbmvu7528f8p811tbmv81hjvn.apps.googleusercontent.com'
  }
};

export { MasterKeys };
