<template>
  <section>
    <div class="white" style="min-height: 100vh;">
      <v-layout row wrap pa-2>
        <v-flex xs12 class="text-xs-center pa-2">
          <div class="grey--text text--darken-3 font-weight-bold font11">Welcome to Fanspole</div>
          <div class="grey--text text--lighten-1 font9 pa-2">Enter your Email to Start Your Fantasy Journey with Fanspole.</div>
          <div class="grey--text text--darken-3 font-weight-bold font11 pt-4">Sign in with Social</div>
          <div>
            <img src="~/assets/images/facebook-login.png" class="box_shadow">
            <img src="~/assets/images/google-login.png" class="box_shadow">
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
            Forgot password?
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
      <div class="footer text-xs-center white">
        <hr>
        <div class="pa-3">
          <span class="grey--text text--lighten-1">Haven't an account?</span> <nuxt-link :to="`${signup_path}`" class="font-weight-bold primary--text">Sign Up</nuxt-link>
        </div>
      </div>
    </template>
  </section>
</template>

<script type="text/javascript">
  import { SIGNUP } from '~/constants/routes.js';
  export default {
    mounted() {
      window.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          this.handleLoginFormSubmit();
        }
      });
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.$router.push('/');
      }
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
        this.loading = true
        await this.$store
          .dispatch('Login/LOGIN', postData)
          .then(() => {
            this.loading = false;
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
    data() {
      return {
        loading: false,
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
          (v) => (v && v.length >= 8) || 'Password is too short (minimum is 8 characters)'
        ],
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