<template>
  <section>
    <v-toolbar color="primary">
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
  
    <div class="white">
      <v-text-field
          class="pa-2"
          solo
          disabled
          hide-details
          v-model="getUserName"
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
          v-model="getEmail"
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
          v-model="getFullName"
          hide-details
          type="text"
          outline
          required
          ></v-text-field>
        <v-text-field
          class="pa-2"
          label="Team name"
          v-model="getTeamName"
          hide-details
          type="text"
          outline
          required
          ></v-text-field>
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
      }
    },
    data() {
      return {
        title: 'MY INFO & SETTINGS',
        password: '********'
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>