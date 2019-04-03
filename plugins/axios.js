export default function({ $axios, __isRetryRequest, store, app, redirect }) {
  $axios.onRequest(config => {
    if (config.url != '/post_login/') {
      config.headers['X-Fanspole-Client'] = '254b4f821a12144966c43444039dca21b97dde0be39b1fc1d2f573228dea6bbb';
      config.headers['Authorization'] = `Bearer ${app.$cookies.get('at')}`;;
    }
  });

  $axios.onResponseError(err => {
    const code = parseInt(err.response && err.response.status);
    let originalRequest = err.config;
    if (code == 401) {
      if (originalRequest.url.includes('/post_login/')) {
        app.$cookies.remove('at');
        app.$cookies.remove('rt');
        if(process.browser){
          localStorage.removeItem('me_display_name');
          localStorage.removeItem('me_team_name');
          localStorage.removeItem('me_image');
          localStorage.removeItem('me_cricket_level');
          localStorage.removeItem('me_current_balance');
        }
        redirect('/login');
      }else {
        originalRequest.__isRetryRequest = true;

        let token = app.$cookies.get('rt');
        
        return new Promise((resolve, reject) => {
          let req = $axios
            .post(`/post_login/`, { grant_type: 'refresh_token', refresh_token: token })
            .then((response) => {
              if (response.status == 200) {
                app.$cookies.remove('at');
                app.$cookies.remove('rt');
                app.$cookies.set('at', response.data.access_token, {
                  path: '/',
                  maxAge: 60 * 60 * 24 * 365
                });
                app.$cookies.set('rt', response.data.refresh_token, {
                  path: '/',
                  maxAge: 60 * 60 * 24 * 365
                });

                originalRequest.headers['Cache-Control'] =
                  'private, no-cache, no-store, must-revalidate';
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
                // originalRequest.headers['Authorization-Bearer'] = `Bearer ${response.data.access_token}`;
                if (process.client) {
                  store.dispatch('Me/GET_ME');
                }
              }
              resolve(req);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .then((res) => {
          return $axios(originalRequest);
        })
        .catch((e) => {
          throw e;
        });

      }
    }
    if (code == 422) {
      throw err;
    }
  });
}
