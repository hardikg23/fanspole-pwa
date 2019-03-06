export default function({ $axios, __isRetryRequest, store, app, redirect }) {
  $axios.onRequest(config => {
    // if (config.url != '/post_login/') {
      config.headers['X-Fanspole-Client'] = '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb';
      config.headers['Authorization'] = 'Bearer 14b05095dead7e2e5da78d6182729f4f07ca4065f46a75bd4c29455797fc137c';
    // }
  });

  $axios.onResponseError(err => {
    const code = parseInt(err.response && err.response.status);

    let originalRequest = err.config;

    if (code == 401) {
      originalRequest.__isRetryRequest = true;

      let token = app.$cookies.get('rt');

      store
        .dispatch('Login/LOGIN', { grant_type: 'refresh_token', refresh_token: token })
        .then(res => {
          app.$cookies.set('at', store.getters['Login/userAuth'].access_token);
          app.$cookies.set('rt', store.getters['Login/userAuth'].refresh_token);
            
          store.dispatch('Login/GET_ME');

          return app.$axios(originalRequest);

        })
        .catch(error => {
          return error;
        });
    }

  });
}
