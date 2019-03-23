<template>
  <section>
    <v-toolbar color="primary">
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
  
    <div class="white">
      <v-form
        ref="form"
        v-model="valid"
        method="post"
        >
        <v-text-field
            class="pa-2"
            solo
            disabled
            hide-details
            v-model="username"
            prepend-inner-icon="alternate_email"
            label="User Name"
            type="text"
            required
          />
        <v-text-field
            class="pa-2"
            solo
            disabled
            hide-details
            v-model="email"
            prepend-inner-icon="email"
            label="Email"
            type="text"
            required
          />
        <v-text-field
            class="pa-2"
            solo
            disabled
            hide-details
            type="password"
            v-model="password"
            prepend-inner-icon="lock"
            label="Password"
            required
          />
        <v-text-field
          class="pa-2"
          label="Full name"
          v-model="full_name"
          :rules="[(v) => !!v || 'Full Name is required']"
          hide-details
          type="text"
          outline
          required
          ></v-text-field>
        <v-text-field
          class="pa-2"
          label="Team name"
          v-model="team_name"
          :rules="[(v) => !!v || 'Team Name is required']"
          hide-details
          type="text"
          outline
          required
          ></v-text-field>
        <v-content>
          <v-dialog
            ref="dialog"
            v-model="dobmodal"
            :return-value.sync="dob"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="dob"
              class="pa-2"
              label="Select Date Of Birth"
              append-icon="event"
              color="primary"
              readonly
            />
            <v-date-picker
              v-model="dob"
              color="primary">
              <v-spacer/>
              <v-btn
                flat
                @click="dobmodal = false">Cancel</v-btn>
              <v-btn
                flat
                class="primary--text"
                @click="$refs.dialog.save(dob)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-content>
      </v-form>
      <div>
        <v-btn large style="width:96%" color='primary' :loading="loading" @click="handleProfileSubmit()">UPDATE PROFILE</v-btn>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
  export default {
    async asyncData({store, params}) {
      await store.dispatch('Me/GET_SETTINGS');
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
      getUserName(){
        return this.$store.getters['Me/username'];
      },
      getEmail(){
        return this.$store.getters['Me/email'];
      },
      getFullName(){
        return this.$store.getters['Me/full_name'];
      },
      getTeamName(){
        return this.$store.getters['Me/team_name'];
      },
      getDOB(){
        return this.$store.getters['Me/dob'];
      }
    },
    data() {
      return {
        title: 'MY INFO & SETTINGS',
        username: '',
        email: '',
        password: '********',
        full_name: '',
        team_name: '',
        dob: '',
        dobmodal: false,
        loading: false,
        valid: false
      }
    },
    mounted() {
      this.username = this.getUserName
      this.email = this.getEmail
      this.full_name = this.getFullName
      this.team_name = this.getTeamName
      this.dob = this.getDOB
    },
    methods: {
      async handleProfileSubmit() {
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append('full_name', this.full_name);
          formData.append('team_name', this.team_name);
          formData.append('dob', this.dob);
          
          await this.$store
            .dispatch('Me/SAVE_SETTINGS', formData)
            .then((res) => {
              this.loading = false;
              this.showSnackBar = true;
              this.$nuxt.$emit('snackbarError', {
                snackbar: this.showSnackBar,
                message: "Profile Updated",
                button: false
              });
            })
            .catch((error) => {
              this.showSnackBar = true;
              this.loading = false;
              this.$nuxt.$emit('snackbarError', {
                snackbar: this.showSnackBar,
                message: error.data.error,
                button: false
              });
            });
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>