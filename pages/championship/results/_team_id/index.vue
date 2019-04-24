<template>
  <section>
    <v-toolbar color="championship">
      <BackChampionship :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="championship"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <div v-if="!loading">
      <v-card class="box_shadow_common ma-3">
        <v-layout row wrap class="font8 pa-1 championship font-weight-bold white--text text-uppercase">
          <v-flex xs6 class="text-xs-center">
            Players
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            Score
          </v-flex>
        </v-layout>
        <v-layout row wrap v-for="player in getClassisTeamScore.players_scores">
          <v-flex xs6 class="text-xs-center borderb pa-2">
            <span>{{player.name}}</span><span v-if="getClassisTeamScore.captain.id == player.id"> (c)</span>
          </v-flex>
          <v-flex xs6 class="text-xs-center borderb pa-2">
            {{getClassisTeamScore.captain.id == player.id ? player.score*2 : player.score}}
          </v-flex>
        </v-layout>
      </v-card>

      <v-card class="box_shadow_common ma-3">
        <v-layout row wrap class="font8 pa-1 font-weight-bold text-uppercase">
          <v-flex xs6 class="borderb pa-1 text-xs-center red--text text--accent-4">
            Player out
          </v-flex>
          <v-flex xs6 class="borderb pa-1 text-xs-center green--text text--accent-4">
            Player in
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 class="text-xs-center">
            <div class="borderb pa-2" v-for="player in getClassisTeamScore.player_out">
              {{player.name}}
            </div>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <div class="borderb pa-2" v-for="player in getClassisTeamScore.player_in">
              {{player.name}}
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "SCORE",
        loading: true
      }
    },
    components: {
      BackChampionship: () => import('~/components/BackChampionship'),
    },
    computed: {
      getClassisTeamScore(){
        return this.$store.getters['ClassicTeamScores/classic_team_scores_result'];
      }
    },
    mounted: function() {
      this.getApiClassicTeamScore();
    },
    methods: {
      async getApiClassicTeamScore(){
        await this.$store.dispatch('ClassicTeamScores/GET_CLASSIC_TEAM_SCORE', {id: this.$route.params.team_id, fields: 'id,captain,player_in,player_out,players_scores'}).catch((error) => {
          this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: error.data.error,
              button: false
            });
          this.$router.push(`/championship`);
        });
        this.loading = false
      }
    }
  }
</script>