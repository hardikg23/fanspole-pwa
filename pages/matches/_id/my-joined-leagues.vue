<template>
  <section class="mb65">
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <v-layout row wrap v-if="!loading">
            <v-flex xs6>
              <div class="text-xs-left fontw600 font9">
                <div>{{getMatch.team1.name_attr}} vs {{getMatch.team2.name_attr}}</div>
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="text-xs-right">
                <div class="pr-2 red--text text-uppercase font9">{{getMatch.match_status}}</div>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <template>
      <div v-if="loading">
        <v-card class="ma-3" v-for="n in 6" :key="n" raised>
          <vue-content-loading :width="400" :height="100" class="white">
            <rect x="20" y="20" rx="4" ry="4" width="40%" height="35" />
            <rect x="200" y="20" rx="4" ry="4" width="40%" height="35" />
            <rect x="20" y="65" rx="4" ry="4" width="35%" height="20" />
            <rect x="180" y="65" rx="4" ry="4" width="45%" height="20" />
          </vue-content-loading>
        </v-card>
      </div>
    </template>
  
    <div v-if="getPaidLeagues.length > 0"> 
      <template class="blue-grey" v-for="league in getPaidLeagues" v-if="!loading">
        <div v-if="!locked(getMatch.event_time_in_millis)">
          <PaidLeagueCard :key="league.id" :league="league"></PaidLeagueCard>
        </div>
        <div v-else>
          <CompletePaidLeagueCard :key="league.id" :member="league"></CompletePaidLeagueCard>
        </div>
      </template>
    </div>
    <div v-else class="mt-5 text-xs-center pa-5">
      No leagues joined
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
    created: function() {
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
          var fields = 'id,winning_amount,refunded,rank,event_team{team_no,score},paid_league{prize_amount,entry_fee,members_limit,winner_count}'
        }else{
          var fields = 'id,prize_amount,entry_fee,paid_league_members_count,members_limit,winner_count'
        }
        await this.$store.dispatch('PaidLeagues/GET_JOINED_PAID_LEAGUES', {id: this.$route.params.id, fields: fields});
        this.loading = false
      }
    }
  }
</script>

<style scoped>
</style>