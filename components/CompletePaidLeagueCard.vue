<template>
  <v-container grid-list-md text-xs-center px-3 py-2>
    <nuxt-link :to="`/matches/${this.$route.params.id}/leagues/${member.paid_league.id}`">
      <v-card md5 class='pa-0 box_shadow_common' ripple>
        <v-layout row wrap pa-2>
          <v-flex xs4 class="text-xs-center borderb">
            <div class="font7 grey--text text-uppercase" v-if="member.paid_league.prize_amount > 0">Prize pool</div>
            <div class="fontw600" v-if="member.paid_league.prize_amount > 0">&#8377;{{member.paid_league.prize_amount}}</div>
            <div class="fontw600 pt-2" v-else>{{member.paid_league.name}}</div>
          </v-flex>
          <v-flex xs4 class="text-xs-center borderb">
            <div class="font7 grey--text text-uppercase">Winners</div>
            <div class="fontw600">{{member.paid_league.winner_count}}</div>
          </v-flex>
          <v-flex xs4 class="text-xs-center borderb">
            <div class="font7 grey--text text-uppercase">Entry</div>
            <div class="font-weight-bold font12 green--text text--accent-4" v-bind:class="{'grey--text line-through': member.refunded}">&#8377;{{member.paid_league.entry_fee}} {{member.refunded ? '(refund)' : ''}}</div>
          </v-flex>
          <v-flex xs4 class="text-xs-center pa-2">
            <div class="font7 grey--text text-uppercase">JOINED WITH</div>
            <div class="fontw600">TEAM {{member.event_team && member.event_team.team_no}}</div>
          </v-flex>
          <v-flex xs4 class="text-xs-center pa-2">
            <div class="font7 grey--text text-uppercase">Points</div>
            <div class="fontw600">{{member.event_team && member.event_team.score}}</div>
          </v-flex>
          <v-flex xs4 class="text-xs-center pa-2">
            <div class="font7 grey--text text-uppercase">Rank</div>
            <div class="font-weight-bold font12 red--text text--accent-4">{{member.rank != undefined && !member.refunded ? member.rank : '-'}}</div>
          </v-flex>
        </v-layout>  
        <v-layout row grey lighten-4 ma-0>
          <v-flex xs6 class="grey--text font9 pa-2">
            YOUR WINNINGS
          </v-flex>
          <v-flex xs6 class="font12 pa-2 font-weight-bold primary--text">
            &#8377;{{member.winning_amount != undefined ? member.winning_amount : '-'}}
          </v-flex>
        </v-layout>
      </v-card>
    </nuxt-link>
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
  .line-through{
    text-decoration: line-through;
  }
</style>