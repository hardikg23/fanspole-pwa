<template>
  <section class="mb65">
    <Header :title="title"/>
    <template>
      <div v-if="loading">
        <v-card class="ma-3 box_shadow_common" v-for="n in 15" :key="n">
          <vue-content-loading :width="400" :height="80" class="white">
            <circle cx="35" cy="35" r="20" />
            <rect x="90" y="20" rx="4" ry="4" width="55%" height="15" />
            <rect x="90" y="45" rx="4" ry="4" width="50%" height="9" />
            <circle cx="350" cy="35" r="20" />
          </vue-content-loading>
        </v-card>
      </div>
    </template>
  
    <div>
      <a href="https://beta.fanspole.com/daily/enter-contest-code?code=ay350fulo2w8339u2g7t">
        <v-card md5 ripple class="box_shadow_common ma-3">
          <v-layout row grey lighten-4 ma-0>
            <v-flex xs12>
              <div class="text-xs-left pa-1 primary white--text font11 fontw600 text-xs-center">New Feature - Private Contest!</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap pa-2>
            <v-flex xs2 class="text-xs-center">
              <v-icon style="font-size:3.5em;" class="primary--text">new_releases</v-icon>
            </v-flex>
            <v-flex xs10 class="font9 pl-3">
              <div>Now you can create private invite only contest. <br><span class="primary--text fontw600">Join admin created private test contest for match CSK vs MI</span> <br>Give it a try and create your own contests</div>
            </v-flex>
          </v-layout>
        </v-card>
      </a>
    </div>
  
    <template v-for="match in getMatches" v-if="!loading">
      <div v-show="!locked(match.event_time_in_millis)">
        <MatchCard :key="match.id" :match="match"></MatchCard>
      </div>
    </template>
    <Bottom/>
  </section>
</template>

<script>
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: "DAILY MODE",
        match: {},
        loading: true
      }
    },
    components: {
      MatchCard: () => import('~/components/MatchCard'),
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom'),
      VueContentLoading
    },
    computed: {
      getMatches() {
        return this.$store.getters['Matches/matches'];
      }
    },
    mounted: function() {
      this.getApiMatches();
    },
    methods: {
      locked(event_time){
        return event_time < new Date().getTime();
      },
      async getApiMatches(){
        if((this.$store.getters['ApiHits/all_matches'] == undefined) || (this.$store.getters['ApiHits/all_matches'] < (new Date().getTime() - 60*60*1000))){
          await this.$store.dispatch('Matches/GET_MATCHES');  
        }
        this.loading = false
      },
    }
  }
</script>
