<template>
  <section>
    <Header :title="title"/>
    
    <template>
      <div v-if="loading">
        <v-card class="ma-2" v-for="n in 15" :key="n">
          <vue-content-loading :width="400" :height="70" class="white">
            <circle cx="35" cy="35" r="20" />
            <rect x="90" y="20" rx="4" ry="4" width="55%" height="15" />
            <rect x="90" y="45" rx="4" ry="4" width="50%" height="9" />
            <circle cx="350" cy="35" r="20" />
          </vue-content-loading>
        </v-card>
      </div>
    </template>

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
    created: function() {
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
