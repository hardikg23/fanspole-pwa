<template>
  <v-container grid-list-md text-xs-center pa-3>
    <v-card md5 class='pa-0' raised ripple>
      <v-layout row wrap pa-2>
        <v-flex xs4 class="text-xs-center borderb">
          <div class="font7 grey--text text-uppercase">Prize pool</div>
          <div class="fontw600 font9">&#8377;{{member.paid_league.prize_amount}}</div>
        </v-flex>
        <v-flex xs4 class="text-xs-center borderb">
          <div class="font7 grey--text text-uppercase">Winners</div>
          <div class="fontw600 font9">{{member.paid_league.winner_count}}</div>
        </v-flex>
        <v-flex xs4 class="text-xs-center borderb">
          <div class="font7 grey--text text-uppercase">Entry</div>
          <div class="fontw600 font9">&#8377;{{member.paid_league.entry_fee}}</div>
        </v-flex>
        <v-flex xs4 class="text-xs-center pa-2">
          <div class="font7 grey--text text-uppercase">JOINED WITH</div>
          <div class="fontw600 font9">TEAM {{member.event_team.team_no}}</div>
        </v-flex>
        <v-flex xs4 class="text-xs-center pa-2">
          <div class="font7 grey--text text-uppercase">Points</div>
          <div class="fontw600 font9">{{member.event_team.score}}</div>
        </v-flex>
        <v-flex xs4 class="text-xs-center pa-2">
          <div class="font7 grey--text text-uppercase">Rank</div>
          <div class="fontw600 font9">{{member.rank != undefined ? memner.rank : '-'}}</div>
        </v-flex>
      </v-layout>  
      <v-layout row grey lighten-4 ma-0>
        <v-flex xs6 class="grey--text font9 pa-2">
          YOUR WINNINGS
        </v-flex>
        <v-flex xs6 class="font9 pa-2">
          &#8377;{{member.winning_amount != undefined ? memner.winning_amount : '-'}}
        </v-flex>
      </v-layout>
    </v-card>

  </v-container>
</template>


<script type="text/javascript">
  export default {
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
      }
    },
    computed: {  
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>