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

    <div v-if="!loading && getClassicTeam != undefined">
      <div style="min-height: 100vh" class="grad1">
        <v-layout row wrap class="text-xs-center">
          <v-flex xs2 class='text-xs-left grey darken-3 pa-2'>
            <div v-if="true">
              <nuxt-link :to="`/matches/${this.$route.params.id}/edit-team/${this.$route.params.team_id}`">
                <v-icon class='white--text'>edit</v-icon>
              </nuxt-link>
            </div>
          </v-flex>
          <v-flex xs8 class="text-xs-center grey darken-3 white--text pa-2 font11 font-weight-bold">
            <div v-if="getClassicTeam.user != undefined">
              {{getClassicTeam.user.team_name}}
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
            <TeamPlayers :players="getClassicTeamPlayers.row1" :captain="getClassicTeam.captain.id"></TeamPlayers>
          </v-flex>
          <v-flex xs12>
            <TeamPlayers :players="getClassicTeamPlayers.row2" :captain="getClassicTeam.captain.id"></TeamPlayers>
          </v-flex>
          <v-flex xs12>
            <TeamPlayers :players="getClassicTeamPlayers.row3" :captain="getClassicTeam.captain.id"></TeamPlayers>
          </v-flex>
        </v-layout>
      </div>
      <template>
        <div class="footer text-xs-left grey darken-3 pa-2" style="max-width: 550px;">
         <div class="white--text font-weight-bold">SCORE: {{getClassicTeam.score}} PTS</div>
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
      getClassicTeam() {
        return this.$store.getters['ClassicTeams/classic_team'](this.$route.params.team_id);
      },
      getClassicTeamPlayers() {
        return this.$store.getters['ClassicTeams/classic_team_row'];
      }
    },
    created: function() {
      this.getApiClassicTeam();
    },
    methods: {
      async getApiClassicTeam(){
        if (this.$store.getters['ClassicTeams/classic_team'](this.$route.params.team_id) == undefined){
          await this.$store.dispatch('ClassicTeams/GET_CLASSIC_TEAM', this.$route.params).catch((error) => {
            this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: error.data.error,
                button: false
              });
            this.$router.push(`/championship`);
          });
        }
        this.loading = false
        await this.$store.commit('ClassicTeams/SET_CLASSIC_TEAM_ROW', this.$route.params.team_id); 
      },
      closeTeamClick(){
        if (this.$store.getters['common/getBrowsed'] || window.history.length > 2) {
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
