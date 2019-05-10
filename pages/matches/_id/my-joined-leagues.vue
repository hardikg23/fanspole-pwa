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
      <div v-if="getPaidLeagues.length > 0"> 
        <template class="blue-grey" v-for="league in getPaidLeagues">
          <div v-if="!locked(getMatch.event_time_in_millis)">
            <PaidLeagueCard :key="league.id" :league="league" :joined="true"></PaidLeagueCard>
          </div>
          <div v-else>
            <CompletePaidLeagueCard :key="league.id" :member="league"></CompletePaidLeagueCard>
          </div>
        </template>
      </div>
      <div v-else class="mt-5 text-xs-center pa-5">
        YOU HAVEN'T JOINED ANY CONTESTS
      </div>
    </div>

  </section>
</template>

<script>
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: 'JOINED CONTESTS',
        loading: true
      }
    },
    components: {
      PaidLeagueCard: () => import('~/components/PaidLeagueCard'),
      CompletePaidLeagueCard: () => import('~/components/CompletePaidLeagueCard'),
      Back: () => import('~/components/Back'),
      MatchBar: () => import('~/components/MatchBar'),
      VueContentLoading
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getPaidLeagues() {
        return this.$store.getters['PaidLeagues/joined_paid_leagues'];
      }
    },
    mounted: function() {
      this.getApiJoinedPaidLeagues();
    },
    methods: {
      locked(event_time){
        return event_time < new Date().getTime();
      },
      async getApiJoinedPaidLeagues(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        await this.$store.commit('PaidLeagues/RESET_JOINED_PAID_LEAGUES');
        
        if(this.locked(this.getMatch.event_time_in_millis)){
          var fields = 'id,winning_amount,refunded,rank,event_team{team_no,score},paid_league{id,name,prize_amount,entry_fee,members_limit,winner_count}'
        }else{
          var fields = 'id,name,prize_amount,entry_fee,paid_league_members_count,members_limit,winner_count'
        }
        await this.$store.dispatch('PaidLeagues/GET_JOINED_PAID_LEAGUES', {id: this.$route.params.id, fields: fields});
        this.loading = false
      }
    }
  }
</script>

<style scoped>
</style>