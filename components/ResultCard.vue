<template>
  <v-container grid-list-md px-3 py-2>
    <v-card md5 class='pa-0 box_shadow_common'>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs6 class='text-xs-left pa-2 font9'>
          Match {{team.match.match_no}} ({{team.match.match_stage}})
        </v-flex>
        <v-flex xs6 class='text-xs-right pa-2 font9'>
          {{team.match.team1.name_attr}} vs {{team.match.team2.name_attr}}
        </v-flex>
      </v-layout>
      <v-layout row wrap class='text-xs-center pa-1 font9'>
        <v-flex xs4>
          <div>Score</div>
          <div class="font11 fontw600 pa-2">{{to_number_format(team.score)}}</div>
        </v-flex>
        <v-flex xs4>
          <div>Captain</div>
          <div class="font11 fontw600 pa-2">{{team.captain.name}}</div>
        </v-flex>
        <v-flex xs4>
          <div>Subs</div>
          <div class="font11 fontw600 pa-2">
            <span class="red--text text--accent-4">{{team.paid_sub_used}}</span>
            /
            <span class="green--text text--accent-4">{{team.free_sub_used}}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs12 class='text-xs-center text-uppercase'>
          <div>
            <v-btn flat small class="pa-0 ma-0 championship--text fontw600 font8" @click="getScoreClick.call(this, team.id)">score</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="scoreDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-card-title class="headline championship white--text pa-2"><div class="font7 font-weight-bold">SCORE</div></v-card-title>
        <v-card class="mb-4">
          <v-layout row wrap class="font8 pa-1 championship font-weight-bold white--text text-uppercase">
            <v-flex xs6 class="text-xs-center">
              Players
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              Score
            </v-flex>
          </v-layout>
          <div v-if="getClassisTeamScore != undefined && getClassisTeamScore.players_scores.length > 0">
            <v-layout class="font9" row wrap v-for="player in getClassisTeamScore.players_scores">
              <v-flex xs6 class="text-xs-center borderb pa-2">
                <span>{{player.name}}</span><span v-if="getClassisTeamScore.captain.id == player.id"> (c)</span>
              </v-flex>
              <v-flex xs6 class="text-xs-center borderb pa-2">
                {{getClassisTeamScore.captain.id == player.id ? player.score*2 : player.score}}
              </v-flex>
            </v-layout>
          </div>
          <div v-else>
            <div class="pa-4 grey--text text-xs-center font8">
              No players for this match
            </div>
          </div>
        </v-card>
        <v-card>
          <v-layout row wrap class="font8 pa-1 font-weight-bold text-uppercase">
            <v-flex xs6 class="borderb pa-1 text-xs-center red--text text--accent-4">
              Player out
            </v-flex>
            <v-flex xs6 class="borderb pa-1 text-xs-center green--text text--accent-4">
              Player in
            </v-flex>
          </v-layout>
          <div v-if="getClassisTeamScore != undefined && getClassisTeamScore.player_out.length > 0">
            <v-layout class="font9" row wrap>
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
          </div>
          <div v-else>
            <div class="pa-4 grey--text text-xs-center font8">
              No Transfers
            </div>
          </div>
        </v-card>
        <template>
          <div class="footer text-xs-center championship pa-2 white--text cursor-p" @click="scoreDialog = false" style="max-width: 550px;">
            CLOSE
          </div>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script type="text/javascript">
  export default {
    props: {
      team: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        scoreDialog: false,
      }
    },
    computed: {
      getClassisTeamScore(){
        return this.$store.getters['ClassicTeamScores/classic_team_scores_result'];
      }
    },
    methods: {
      async getScoreClick(id){
        await this.$store.dispatch('ClassicTeamScores/GET_CLASSIC_TEAM_SCORE', {id: id, fields: 'id,captain,player_in,player_out,players_scores'});
        this.scoreDialog = true
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
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
  .container{
    padding: 8px;
  }
  .box_shadow{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 2px 1px #000;
    box-shadow: 0 0 2px 1px #000;
  }
</style>