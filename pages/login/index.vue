<template>
  <section>
    <div class="white" style="min-height: 100vh;">
      <v-layout row wrap pa-2>
        <v-flex xs12 class="text-xs-center pa-2">
          <div class="grey--text text--darken-3 font-weight-bold font11">Welcome to Fanspole</div>
          <div class="grey--text text--lighten-1 font9 pa-2">Enter your Email to Start Your Fantasy Journey with Fanspole.</div>
          <div class="grey--text text--darken-3 font-weight-bold font11 pt-4">Sign in with Social</div>
          <div>
            <img src="~/assets/images/facebook-login.png" @click="fbAuthUser" class="box_shadow">
            <img src="~/assets/images/google-login.png" id="customBtn" class="box_shadow">
          </div>
          <div>Or</div>
          <div>
            <v-form lazy-validation ref="loginDataForm">
              <v-text-field
                  solo
                  v-model="login.email"
                  prepend-inner-icon="email"
                  :rules="emailRules"
                  name="email"
                  label="Email"
                  type="text"
                  required
                />
              <v-text-field
                  solo
                  id="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :rules="passwordRules"
                  v-model="login.password"
                  prepend-inner-icon="lock"
                  name="password"
                  label="Password"
                  :type="show_password ? 'text' : 'password'"
                  required
                  @click:append="show_password = !show_password"
                />
            </v-form>
          </div>
          <div class="text-xs-right primary--text">
            <nuxt-link to="/login/forgot-password">Forgot password?</nuxt-link>
          </div>
          <div>
            <v-btn large style="width:80%" color='primary' :loading="loading" @click="handleLoginFormSubmit()">LOG IN</v-btn>
          </div>
          
          <div class="pt-5">
            <div class="pa-1">Get Fanspole App</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0s4AayiLNri23FQy-3n4ynvJqiF1-rAWcbSAGjH96TvXe_Wls" style="width:40%;">  
          </div>
        </v-flex>
      </v-layout>
    </div>

    <template>
      <div class="footer text-xs-center white max-w-550">
        <hr>
        <div class="pa-3">
          <span class="grey--text text--lighten-1">Haven't an account?</span> <nuxt-link :to="`${signup_path}`" class="font-weight-bold primary--text">Sign Up</nuxt-link>
        </div>
      </div>
    </template>
  </section>
</template>

<script type="text/javascript">
  import { HOME } from '~/constants/routes.js';
  import { SIGNUP } from '~/constants/routes.js';
  import { MasterKeys } from '~/config.js';
  export default {
    data() {
      return {
        loading: false,
        home_path: HOME,
        signup_path: SIGNUP,
        login: {
          email: '',
          password: ''
        },
        show_password: false,
        emailRules: [
          (v) => !!v || 'Email is required',
          (v) => (v && v.length >= 3) || 'Email is too short (minimum is 3 characters)'
        ],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => (v && v.length >= 6) || 'Password is too short (minimum is 6 characters)'
        ],
      }
    },
    computed: {
      gapiLoaded() {
        return this.$store.getters['Login/gapiLoaded'];
      },
      gapiError() {
        return this.$store.getters['Login/gapiError'];
      }
    },
    created() {
      if (process.browser) {
        let appEnv = process.env.NODE_ENV || 'development';
        const FBAPI = MasterKeys[appEnv].facebookAppId;
        window.fbAsyncInit = function() {
          FB.init({
            appId: FBAPI,
            cookie: true,
            status: true,
            xfbml: true,
            version: 'v3.2'
          });
        };

        (function(d, s, id) {
          let js,
            fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');

        // Loading Google Api
        return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://apis.google.com/js/platform.js';
          script.onload = () => {
            this.startApp();
          };
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
    },
    mounted() {
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.$router.push(this.home_path);
      }
      window.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      });
    },
    destroyed() {
      this.$nuxt.$off('snackbarError');
    },
    methods: {
      async handleLoginFormSubmit() {
        const postData = {
          grant_type: 'password',
          email: this.login.email,
          password: this.login.password
        };
        if (this.$refs.loginDataForm != undefined && this.$refs.loginDataForm.validate()) {
          this.loading = true
          await this.$store
            .dispatch('Login/LOGIN', postData)
            .then(() => {
              this.loading = false;
              let last_path = this.$store.getters['Common/last_visited_url']
              if(last_path != undefined){
                this.$router.push(last_path);  
              } else{
                this.$router.push('/');
              }
            })
            .catch((error) => {
              this.loading = false;
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: "Invalid email or password",
                button: false
              });
            });
        }
      },
      getUserData(response) {
        let accessToken = response.authResponse.accessToken;
        FB.api('/me?fields=id,name,email', (response) => {
          let FBData = {
            grant_type: 'password',
            email: response.email,
            provider: 'facebook',
            uid: response.id,
            access_token: accessToken,
            oauth_version: 2
          };
          
          this.$store.dispatch('Login/LOGIN', FBData)
          .then(() => {
              this.loading = false;
            })
          .catch((error) => {
            this.loading = false;
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: error.data.error,
              button: false
            });
          });
        });
      },
      fbAuthUser() {
        FB.login((response) => {
          if (response.authResponse) {
            this.getUserData(response);
          } else {
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: 'User cancelled login/did not fully authorize',
              button: false
            });
          }
        });
      },
      startApp() {
        let appEnv = process.env.NODE_ENV || 'development';
        const GAPI = MasterKeys[appEnv].googleClientId;
        if (gapi.load) {
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: GAPI,
              cookiepolicy: 'single_host_origin',
              scope: 'email'
            })
            this.auth2.then(
              function success() {
                $nuxt.$store.commit('Login/GAPI_SUPPORT', true)
                return true;
              },
              function error(err) {
                $nuxt.$store.commit('Login/GAPI_SUPPORT', false);
                $nuxt.$store.commit('Login/GAPI_ERROR', err)
              }
            );
            this.attachSignin(document.getElementById('customBtn'));
          })
        }
      },
      attachSignin(element) {
        this.auth2.attachClickHandler(
          element,
          {},
          (googleUser) => {
            let profile = googleUser.getBasicProfile();

            let GoogleData = {
              grant_type: 'password',
              email: profile.getEmail(),
              provider: 'open_id',
              uid: profile.getId(),
              access_token: googleUser.getAuthResponse().id_token,
              oauth_version: 2
            };

            this.$nuxt.$store
              .dispatch('Login/LOGIN', GoogleData)
              .then(() => {
                this.loading = false;
              })
              .catch((error) => {
                this.$nuxt.$emit('snackbarError', {
                  snackbar: true,
                  message: error.data.error,
                  button: false
                });
              });
          },
          (error) => {
            if (this.gapiLoaded) {
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: 'User cancelled login/did not fully authorize',
                button: false
              });
            } else {
              if (this.gapiError.error == "idpiframe_initialization_failed") {
                this.$nuxt.$emit('snackbarError', {
                  snackbar: true,
                  message: 'Please allow third-party cookies to log-in successfully with Google.',
                  button: false
                });
                throw new Error(this.gapiError.details)
              } else {
                this.$nuxt.$emit('snackbarError', {
                  snackbar: true,
                  message: this.gapiError.details,
                  button: false
                });
                throw new Error(this.gapiError.details)
              }
            }
          }
        );
      }
    }
  }
</script>

<style type="text/css" scoped>
  .box_shadow{
    width:50px;
    height:50px;
    padding: 5px;
    margin: 5px 10px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 1px 1px #E0E0E0;
    box-shadow: 0 0 1px 1px #E0E0E0;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>