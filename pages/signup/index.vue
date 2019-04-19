<template>
  <section>
    <div class="white" style="min-height: 100vh;">
      <v-dialog v-model="loading">
        <v-layout class="white">
          <v-flex xs12 class="text-xs-center pa-4">
            <v-progress-circular
              indeterminate
              :width="3"
              color="primary"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-dialog>

    <div v-if="!link_sent">
      <v-layout row wrap pa-2>
        <v-flex xs12 class="text-xs-center pa-2">
          <div class="grey--text text--darken-3 font-weight-bold font11">Welcome to Fanspole</div>
          <div class="grey--text text--lighten-1 font9 pa-2">
            By Clicking on Signup, I hereby confirm to be 18 years old & provide my acceptance to <span class="primary--text font-weight-bold">Terms & Conditions</span> and <span class="primary--text font-weight-bold">Privacy Policy of Fanspole</span>
          </div>
          <div class="grey--text text--darken-3 font-weight-bold font11 pt-4">Sign in with Social</div>
          <div>
            <img src="~/assets/images/facebook-login.png" class="box_shadow">
            <img src="~/assets/images/google-login.png" class="box_shadow">
          </div>
          <div>Or</div>
          <div>
            <v-form
              ref="form"
              v-model="valid"
              method="post"
              >
              <v-text-field
                class="pa-0"
                solo
                v-model="login.email"
                prepend-inner-icon="email"
                name="login"
                :rules="[(v) => !!v || 'Email is required']"
                label="Email"
                type="text"
                required
              />
              <v-text-field
                solo
                class="pa-0"
                id="password"
                :append-icon="show_password ? 'visibility' : 'visibility_off'"
                v-model="login.password"
                prepend-inner-icon="lock"
                :rules="[(v) => !!v || 'Password is required']"
                name="password"
                label="Password"
                :type="show_password ? 'text' : 'password'"
                required
                @click:append="show_password = !show_password"
              />
              <v-text-field
                solo
                v-model="login.refer_code"
                prepend-inner-icon="email"
                name="login"
                label="Referral Code (Optional)"
                type="text"
                required
              />
            </v-form>
          </div>
          <div class="text-xs-right primary--text">
            <nuxt-link to="/login/forgot-password">Forgot password?</nuxt-link>
          </div>
          <div>
            <v-btn large style="width:96%" color='primary' :loading="formLoading" @click="handleSubmit()">SIGN UP</v-btn>
          </div>
          
          <div class="pt-5">
            <div class="pa-1">Get Fanspole App</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0s4AayiLNri23FQy-3n4ynvJqiF1-rAWcbSAGjH96TvXe_Wls" style="width:40%;">  
          </div>
        </v-flex>
      </v-layout>
      </div>
      <div v-else>
        <v-layout row wrap pa-2 class="text-xs-center mt-4">
          <v-flex xs12 class="pa-2">
            <div>
              We have sent you the activation email to your email address you need to verify your email address first.
            </div>
            <div class="pt-4">
              <nuxt-link to="/matches" class="primary--text fontw600">Go To Home</nuxt-link>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>

    <template>
      <div class="footer text-xs-center white">
        <hr>
        <div class="pa-3">
          <span class="grey--text text--lighten-1">Already have an account?</span> <nuxt-link :to="`${login_path}`" class="font-weight-bold primary--text">Log In</nuxt-link>
        </div>
      </div>
    </template>
  </section>
</template>

<script type="text/javascript">
  import { LOGIN } from '~/constants/routes.js';
  export default {
    data() {
      return {
        login_path: LOGIN,
        login: {
          email: '',
          password: '',
          refer_code: ''
        },
        show_password: false,
        formLoading: false,
        loading: false,
        link_sent: false,
        valid: false
      }
    },
    mounted() {
      window.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      });
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.$router.push('/');
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append('email', this.login.email);
          formData.append('password', this.login.password);
          formData.append('ref_code', this.login.refer_code);

          await this.$store
            .dispatch('User/REGISTER', formData)
            .then((res) => {
              this.formLoading = false;
              this.link_sent = true;
            })
            .catch((error) => {
              this.showSnackBar = true;
              this.formLoading = false;
              this.$nuxt.$emit('snackbarError', {
                snackbar: this.showSnackBar,
                message: error.data.error,
                button: false
              });
            });
        }
        this.loading = false;
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