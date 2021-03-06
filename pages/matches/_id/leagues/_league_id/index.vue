<template>
  <section class="mb65">
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <div v-if="!loading">
            <MatchBar :match="getMatch"></MatchBar>
          </div>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <div v-if="!loading">
      <v-card md5 class='ma-3 box_shadow_common' ripple>
        <v-layout row wrap pa-2>
          <v-flex xs3 class="text-xs-center">
            <div class="font7 grey--text text-uppercase">Prize pool</div>
            <div class="fontw600 font9">&#8377;{{getPaidLeague.prize_amount}}</div>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <div class="font7 grey--text text-uppercase">Members</div>
            <div class="fontw600 font9">{{getPaidLeague.paid_league_members_count}}/{{getPaidLeague.members_limit || 'UL'}}</div>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <div class="font7 grey--text text-uppercase">Winners</div>
            <div class="fontw600 font9 blue--text text--darken-1" @click="getLeaguePrizes.call(this, getPaidLeague.id)">
              {{getPaidLeague.winner_count}}
            </div>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <div class="font7 grey--text text-uppercase">Entry</div>
            <div class="fontw600 font9 green--text text--accent-4">&#8377;{{getPaidLeague.entry_fee}}</div>
          </v-flex>
          <v-flex xs12 mr-1>
            <div class="text-xs-left pa-2">
              <div class="font8 grey--text" v-for="tag in getPaidLeague.league_tags" :key="`${tag.attr}`">
                <span class="font-weight-bold">{{tag.attr}} - </span><span>{{tag.desc}}</span>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      
      <v-layout row wrap class="font8 pa-1 black font-weight-bold white--text">
        <v-flex xs8 class="text-xs-left pl-2">
          TEAM
        </v-flex>
        <v-flex xs2 class="text-xs-center pr-4">
          DIFF
        </v-flex>
        <v-flex xs2 class="text-xs-center pr-4">
          RANK
        </v-flex>
      </v-layout>

      <div class="font85" v-if="getCurrentUserMembers.length > 0">
        <v-layout row wrap v-for="member in getCurrentUserMembers" :key="member.id" class="borderb primary white--text">
          <v-flex xs2 class="pt-2 text-xs-center" style="height:50px;">
            <img :src="member.user.image" class="image imagec">
          </v-flex>
          <v-flex xs8 class="pa-2 pl-2" style="height:50px;"> 
            <div v-if="member.event_team != undefined">
              <nuxt-link :to="`/matches/${getMatch.id}/viewteam/${member.event_team.id}`">
                <div class="font-weight-bold">{{member.user.team_name}} (Team {{member.event_team.team_no}})</div>
                <div class="font8">{{to_number_format(member.event_team.score)}} POINTS</div>
              </nuxt-link>
            </div>
          </v-flex>
          <v-flex xs2 class="text-xs-center pr-4 pt-3" style="height:50px;">
            <div>#{{to_number_format(member.rank)}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-for="member in getPaidLeagueMembers" :key="member.id" class="borderb">
          <v-flex xs2 class="white pt-2 text-xs-center" style="height:50px;">
            <img :src="member.user.image" class="image imagec">
          </v-flex>
          <v-flex xs6 class="white pa-2 pl-2" style="height:50px;">
            <div v-if="member.event_team != undefined">
              <nuxt-link :to="`/matches/${getMatch.id}/viewteam/${member.event_team.id}`">
                <div class="font-weight-bold">{{member.user.team_name}} (Team {{member.event_team.team_no}})</div>
                <div class="font8">{{to_number_format(member.event_team.score)}} POINTS</div>
              </nuxt-link>
            </div>
          </v-flex>
          <v-flex xs2 class="white text-xs-center pr-4 pt-3" style="height:50px;">
            <div v-html="highestScoreText(highestScore, member.event_team.score)"></div>
          </v-flex>
          <v-flex xs2 class="white text-xs-center pr-4 pt-3" style="height:50px;">
            <div>#{{to_number_format(member.rank)}}</div>
          </v-flex>
        </v-layout>
      </div>
      <div v-else class="mt-3 text-xs-center pa-5">
        No Members
      </div>

      <v-dialog v-model="prizeDialog" height=30>
        <v-card>
          <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold">WINNING BREAKUP</div></v-card-title>
          <v-layout row wrap pa-2>
            <v-flex xs12>
              <div class="text-xs-center">
                <div class="font8 grey--text">Prize Pool</div>
                <div class="font15 font-weight-bold  pt-1">&#8377;{{getPaidLeague.prize_amount}}</div>
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
    </div>
  </section>
</template>

<script>
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: 'CONTEST MEMBERS',
        loading: true,
        prizeDialog: false,
        highestScore: 0
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      MatchBar: () => import('~/components/MatchBar')
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getPaidLeague(){
        return this.$store.getters['PaidLeagues/paid_league'];
      },
      getCurrentUserMembers(){
        let current_member = this.$store.getters['PaidLeagues/current_user_members'](this.$route.params.league_id);
        if(current_member){
          current_member.forEach(member => {
            if(this.highestScore < member.event_team.score){
              this.highestScore = member.event_team.score
            }
          });
        }
        return current_member
      },
      getPaidLeagueMembers(){
        return this.$store.getters['PaidLeagues/paid_league_members'](this.$route.params.league_id);
      },
      getPrizes() {
        return this.$store.getters['PaidLeagues/paid_leagues_prizes'](this.$route.params.league_id);
      }
    },
    mounted: function() {
      this.getApiPaidLeagues();
    },
    methods: {
      async getApiPaidLeagues(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        if (this.$store.getters['PaidLeagues/paid_league_members'](this.$route.params.league_id).length == 0 && this.$store.getters['PaidLeagues/current_user_members'](this.$route.params.league_id).length == 0){
          await this.$store.dispatch('PaidLeagues/GET_PAID_LEAGUE', {id: this.$route.params.id, league_id: this.$route.params.league_id, fields: 'id,rank,event_team{id,team_no,score},user{team_name,image,id}'});
        }
        this.loading = false
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
      async getLeaguePrizes(id){
        this.prizeDialog = true;
        if (this.$store.getters['PaidLeagues/paid_leagues_prizes'](id).length == 0){
          await this.$store.dispatch('PaidLeagues/GET_PRIZES', {id: this.$route.params.id, league_id: id, fields: 'id,rank_text,amount'}); 
        }
      },
      highestScoreText(a,b){
        if(a==b){
          return "=0";
        }else if(a > b){
          return "<span class='green--text text--accent-4 font-weight-bold'>+"+(a-b)+"</span>"
        }else{
          return "<span class='red--text text--accent-4 font-weight-bold'>"+(a-b)+"</span>"
        }
      }
    }
  }
</script>

<style scoped>
  .imagec{
    border-radius: 50%; 
    border: 1px solid #fff;
  }
  .image{
    width: 36px;
  }
</style>