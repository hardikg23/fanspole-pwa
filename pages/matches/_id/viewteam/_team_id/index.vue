<template>
  <section>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <div v-if="!loading && getUserTeam != undefined">
      <div style="min-height: 100vh" class="grad1">
        <v-layout row wrap class="text-xs-center">
          <v-flex xs2 class='text-xs-left grey darken-3 pa-2'>
            <div v-if="getUserTeam.is_current_user_allowed_to_edit">
              <nuxt-link :to="`/matches/${this.$route.params.id}/edit-team/${this.$route.params.team_id}`">
                <v-icon class='white--text'>edit</v-icon>
              </nuxt-link>
            </div>
          </v-flex>
          <v-flex xs8 class="text-xs-center grey darken-3 white--text pa-2 font11 font-weight-bold">
            <div v-if="getUserTeam.user != undefined">
              {{getUserTeam.user.team_name}} (Team {{getUserTeam.team_no}})
            </div>
          </v-flex>
          <v-flex xs2 class='text-xs-right grey darken-3 white--text pa-2'>
            <div @click="closeTeamClick">
              <v-icon class='white--text'>close</v-icon>
            </div>
          </v-flex>
          <v-flex xs12 class="white--text font-weight-bold font22" style='opacity:0.4'>
            FANSPOLE
          </v-flex>
          <v-flex xs12>
            <TeamPlayers :players="getUserTeamPlayers.row1" :captain="getUserTeam.captain.id"></TeamPlayers>
          </v-flex>
          <v-flex xs12>
            <TeamPlayers :players="getUserTeamPlayers.row2" :captain="getUserTeam.captain.id"></TeamPlayers>
          </v-flex>
          <v-flex xs12>
            <TeamPlayers :players="getUserTeamPlayers.row3" :captain="getUserTeam.captain.id"></TeamPlayers>
          </v-flex>
        </v-layout>
      </div>
      <template>
        <div class="footer text-xs-left grey darken-3 pa-2" style="max-width: 550px;">
         <div class="white--text font-weight-bold">SCORE: {{getUserTeam.score}} PTS</div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        loading: true
      }
    },
    components: {
      TeamPlayers: () => import('~/components/TeamPlayers')
    },
    computed: {
      getUserTeam() {
        return this.$store.getters['UserTeams/user_team'](this.$route.params.team_id);
      },
      getUserTeamPlayers() {
        return this.$store.getters['UserTeams/user_team_row'];
      }
    },
    mounted: function() {
      this.getApiUserTeam();
    },
    methods: {
      async getApiUserTeam(){
        if (this.$store.getters['UserTeams/user_team'](this.$route.params.team_id) == undefined){
          await this.$store.dispatch('UserTeams/GET_USER_TEAM', this.$route.params).catch((error) => {
            this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: error.data.error,
                button: false
              });
            this.$router.push(`/matches/${this.$route.params.id}/teams`);
          });
        }
        this.loading = false
        await this.$store.commit('UserTeams/SET_USER_TEAM_ROW', this.$route.params.team_id); 
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
      closeTeamClick(){
        if (window.history.length > 2) {
          this.$router.go(-1);
        }else{
          this.$router.push('/');
        }
      }
    }
  }
</script>
<style scoped>
  .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
  }
  .grad1 {
    background-color: #689F38;
    background-image: linear-gradient(to bottom,  #9CCC65, #689F38, #33691E);
  }
</style>