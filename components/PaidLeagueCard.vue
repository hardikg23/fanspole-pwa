<template>
  <v-container grid-list-md text-xs-center px-3 py-2>
    <v-card md5 ripple class="box_shadow_common">
      
        <v-layout row wrap pa-2 @click="cardClick.call(this, league.id)">
          <v-flex xs6>
            <div class="text-xs-left">
              <div class="font8 grey--text">Prize pool</div>
              <div class="font18 fontw600 pt-1">&#8377;{{league.prize_amount}}</div>
            </div>
          </v-flex>
          <v-flex xs6>
            <div class="text-xs-right">
              <div class="font8 grey--text pr-1 pb-1">Entry</div>
              <v-btn v-on:click.stop="joinLeagueClick.call(this, league.id)" depressed class='ma-0 white--text font-weight-bold font11' small color="green accent-4">&#8377;{{league.entry_fee}}</v-btn>
            </div>
          </v-flex>

          <v-flex xs12 pa-0 style="height:20px;">
            <v-progress-linear class="progress" background-color="grey lighten-3" color="red darken-1" height="6" v-model="valueDeterminate"></v-progress-linear>
          </v-flex>

          <v-flex xs6>
            <div class="text-xs-left">
              <div class="font9 fontw600 red--text text--accent-4" color=''>{{this.league.members_limit - this.league.paid_league_members_count}} spots left</div>
            </div>
          </v-flex>
          <v-flex xs6>
            <div class="text-xs-right">
              <div class="font9 grey--text">{{league.members_limit}} spots</div>
            </div>
          </v-flex>
        </v-layout>  

      <v-layout row grey lighten-4 ma-0>
        <v-flex xs6>
          <div class="text-xs-left">
            <div class="font9 pl-2 fontw600 blue--text text--darken-1 cursor-p" @click="getLeaguePrizes.call(this, league.id)">
              {{league.winner_count == 1 ? "1 Winner" : league.winner_count + " Winners"}}
            </div>
          </div>
        </v-flex>
        <v-flex xs6 mr-1>
          <div class="text-xs-right mt-1">
            <div class="font9 grey--text"><span class="border">S</span></div>
          </div>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="prizeDialog" height=30>
      <v-card>
        <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold">WINNING BREAKUP</div></v-card-title>
        <v-layout row wrap pa-2>
          <v-flex xs12>
            <div class="text-xs-center">
              <div class="font8 grey--text">Prize Pool</div>
              <div class="font15 font-weight-bold  pt-1">&#8377;{{league.prize_amount}}</div>
            </div>
          </v-flex>
        </v-layout>
        <v-layout class="borderb font9" row wrap pa-2 v-for="prize in getPrizes" :key="prize.id">
          <v-flex xs6>
            <div class="text-xs-left pl-2">{{prize.rank_text}}</div>
          </v-flex>
          <v-flex xs6>
            <div class="text-xs-right pr-2">&#8377; {{prize.amount}}</div>
          </v-flex>
        </v-layout>
        <div class="pa-2 font8 grey--text">
          Note: The actual prize money may be different than the prize money mentioned above if there is a tie for any of the winnings positions. Check FAQs for further details.
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="prizeDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="leaderDialog">
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
    
    <v-dialog v-model="joinLeagueDialog">
      <div v-if="getJoiningConfirmation != undefined">
        <v-card>
          <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold text-uppercase">Confirmation</div></v-card-title>
          <v-layout row wrap pa-2>
            <v-flex xs12>
              <div class="font9">Unused + Winning Balance = &#8377;{{to_number_format(getJoiningConfirmation.current_balance)}}</div>
            </v-flex>
            <v-flex xs6 class="pa-3 borderb">
              <div class="font9">Entry</div>
            </v-flex>
            <v-flex xs6 class="pa-3 text-xs-right borderb">
              <div class="">&#8377;{{to_number_format(getJoiningConfirmation.entry_fee)}}</div>
            </v-flex>
            <v-flex xs6 class="pl-3 pt-2">
              <div class="fontw600 green--text text--accent-4">Pay</div>
            </v-flex>
            <v-flex xs6 class="pr-3 pt-2 text-xs-right">
              <div class="fontw600 green--text text--accent-4">&#8377;{{to_number_format(getJoiningConfirmation.entry_fee)}}</div>
            </v-flex>
            <v-flex xs12 class="pa-3 font7 grey--text text-xs-center">
              By joining this contest, you accept Fanspole's T&amp;C and conﬁrm that you are not a resident of Assam, Odisha, Telangana, Nagaland or Sikkim.
            </v-flex>
            <v-flex xs12 class="text-xs-center">
              <v-btn depressed class='ma-0 white--text font-weight-bold font11' color="green accent-4">JOIN CONTEST</v-btn>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="joinLeagueDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

  </v-container>
</template>


<script type="text/javascript">
  export default {
    props: {
      league: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        prizeDialog: false,
        joinLeagueDialog: false,
        leaderDialog: false
      }
    },
    computed: {
      valueDeterminate(){
        return this.league.paid_league_members_count/this.league.members_limit*100;
      },
      getPrizes() {
        return this.$store.getters['PaidLeagues/paid_leagues_prizes'];
      },
      getJoiningConfirmation() {
        return this.$store.getters['PaidLeagues/joining_confirmation'];
      }
    },
    methods: {
      async getLeaguePrizes(id){
        this.leaderDialog = true;
        await this.$store.commit('PaidLeagues/RESET_PRIZES');
        await this.$store.dispatch('PaidLeagues/GET_PRIZES', {id: this.$route.params.id, league_id: id});
        this.leaderDialog = false;
        this.prizeDialog = true;
      },
      cardClick(id){
        this.$router.push(`/matches/${this.$route.params.id}/leagues/${id}`);
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
      async joinLeagueClick(id){
        var team_count = this.$store.getters['PaidLeagues/teams_count'];
        if(team_count == 0){
          this.$router.push(`/matches/${this.$route.params.id}/create-team`);
          return;
        }else{
          this.leaderDialog = true
          await this.$store.commit('PaidLeagues/RESET_JOINING_CONFIRMATION');
          await this.$store.dispatch('PaidLeagues/GET_JOINING_CONFIRMATION', {id: this.$route.params.id, league_id: id});
          this.leaderDialog = false
          this.joinLeagueDialog = this.$store.getters['PaidLeagues/join_league_popup'];
        }
      }
    }
  }
</script>

<style scoped>
  .progress{
    z-index:0;
  }
  .border{border: 1px solid #BDBDBD;padding: 2px 5px;}
</style>