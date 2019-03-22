<template>
  <v-container grid-list-md text-xs-center pa-2>
    <v-card md5 class='pa-0'>
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
            <v-btn class='ma-0' small color="primary">&#8377;{{league.entry_fee}}</v-btn>
          </div>
        </v-flex>

        <v-flex xs12 pa-0 style="height:20px;">
          <v-progress-linear height="5" v-model="valueDeterminate"></v-progress-linear>
        </v-flex>

        <v-flex xs6>
          <div class="text-xs-left">
            <div class="font9" color='primary'>{{this.league.members_limit - this.league.paid_league_members_count}} spots left</div>
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="text-xs-right">
            <div class="font9 grey--text">{{this.league.members_limit}} spots</div>
          </div>
        </v-flex>
      </v-layout>  

      <v-layout row grey lighten-4 ma-0>
        <v-flex xs6>
          <div class="text-xs-left">
            <div class="font9"><v-icon>rowing</v-icon>Winnings</div>
          </div>
        </v-flex>
        <v-flex xs6 mr-1>
          <div class="text-xs-right mt-1">
            <div class="font9 grey--text"><span class="border">S</span></div>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
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
    computed: {
      valueDeterminate(){
        return this.league.paid_league_members_count/this.league.members_limit*100;
      }
    }
  }
</script>

<style scoped>
  .border{border: 1px solid #BDBDBD;padding: 2px 5px;}
</style>