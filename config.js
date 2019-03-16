const MasterKeys = {
  development: {
    apiOauthEndPoint: 'http://localhost:3000/oauth/token',
    apiEndPoint: 'http://localhost:3000/api/v3/',
    clientId: '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb'

  },
  production: {
    apiOauthEndPoint: 'https://www.fanspole.com/oauth/token',
    apiEndPoint: 'https://www.fanspole.com/api/v3/',
    clientId: '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb'
  }
};

export { MasterKeys };
