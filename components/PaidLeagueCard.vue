<template>
  <v-container grid-list-md text-xs-center px-3 py-2>
    <nuxt-link :to="`/matches/${this.$route.params.id}/leagues/${league.id}`">
      <v-card md5 ripple class="box_shadow_common">
        <v-layout row wrap pa-2>
          <v-flex xs6>
            <div class="text-xs-left">
              <div class="font8 grey--text">Prize pool</div>
              <div class="headline font-weight-bold pt-1">&#8377;{{league.prize_amount}}</div>
            </div>
          </v-flex>
          <v-flex xs6>
            <div class="text-xs-right">
              <div class="font8 grey--text pr-1 pb-1">Entry</div>
              <nuxt-link :to="`/matches/${this.$route.params.id}/teams`">
                <v-btn depressed class='ma-0 white--text font-weight-bold font11' small color="green accent-4">&#8377;{{league.entry_fee}}</v-btn>
              </nuxt-link>
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
              <div class="font9 pl-2 fontw600 blue--text text--darken-1" @click="getLeaguePrizes.call(this, league.id)">
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
    </nuxt-link>

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
      }
    },
    computed: {
      valueDeterminate(){
        return this.league.paid_league_members_count/this.league.members_limit*100;
      },
      getPrizes() {
        return this.$store.getters['PaidLeagues/paid_leagues_prizes'];
      },
    },
    methods: {
      async getLeaguePrizes(id){
        this.prizeDialog = true;
        await this.$store.commit('PaidLeagues/RESET_PRIZES');
        await this.$store.dispatch('PaidLeagues/GET_PRIZES', {id: this.$route.params.id, league_id: id});  
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