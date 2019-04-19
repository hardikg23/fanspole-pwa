<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

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

    <v-container grid-list-md text-xs-center px-3 py-2>
      <div v-if="!link_sent">
        <v-layout row wrap pa-2>
          <v-flex xs12 class="text-xs-center grey--text pa-2">
            <div>We will send you link to your email address where you can reset your password.</div>
            <div class="red--text text--accent-4 pa-2">Link will be valid for 4 hours only.</div>
          </v-flex>
          <v-flex xs12 class="text-xs-left grey--text pa-2">
            Enter Your Email Address Below
          </v-flex>
          <v-flex xs12>
            <v-form lazy-validation ref="">
              <v-text-field
                  solo
                  v-model="email"
                  hide-details
                  prepend-inner-icon="email"
                  name="email"
                  label="Email"
                  type="text"
                  required
                />
            </v-form>
          </v-flex>
          <v-flex xs12 class="pa-0 mt-4">
            <v-btn @click="forgotPasswordClick()" large class="pa-0 ma-0  primary font-weight-bold" style="width:100%">SUBMIT</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div v-else>
        <v-layout row wrap pa-2 class="text-xs-center mt-4">
          <v-flex xs12 class="grey--text pa-2">
            <div>
              <v-icon class="primary--text" style="font-size: 3em">contact_mail</v-icon>
            </div>
            A link to reset your password has been sent to
          </v-flex>
          <v-flex xs12 class="font11 fontw600">
            {{this.email}}
          </v-flex>
          <v-flex xs12 class="font9 mt-3">
            Didn't receive the reset link?
          </v-flex>
          <v-flex xs12 class="font9 primary--text fontw600">
           <div @click="forgotPasswordClick()" class="cursor-p">Resend Link</div>
          </v-flex>
        </v-layout>
      </div>
    </v-container>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'FORGOT PASSWORD',
        email: '',
        loading: false,
        link_sent: false
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    },
    methods: {
      async forgotPasswordClick(){
        this.loading = true
        if(this.email.length > 5){
          await this.$store
            .dispatch('User/FORGOT_PASSWORD', {email: this.email})
            .then((res) => {
              this.link_sent = true;
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: res.message,
                button: false
              });
            })
            .catch((error) => {
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: error.data.error,
                button: false
              });
            });
        }else{
          this.$nuxt.$emit('snackbarError', {
            snackbar: true,
            message: "Enter valid email",
            button: false
          });
        }
        this.loading = false
      }
    }
  }
</script>
<style scoped>
</style>