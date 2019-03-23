<template>
  <section>
    <Header :title="title"/>
    <template v-for="match in getMatches">
      <div v-show="!locked(match.event_time_in_millis)">
        <MatchCard :key="match.id" :match="match"></MatchCard>
      </div>
    </template>
    <Bottom/>
  </section>
</template>

<script>
  export default {
    async asyncData({ route, store }) {
      if((store.getters['ApiHits/all_matches'] == undefined) || (store.getters['ApiHits/all_matches'] < (new Date().getTime() - 60*60*1000))){
        await store.dispatch('Matches/GET_MATCHES');  
      }
    },
    components: {
      MatchCard: () => import('~/components/MatchCard'),
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom')
    },
    computed: {
      getMatches() {
        return this.$store.getters['Matches/matches'];
      }
    },
    methods: {
      locked(event_time){
        return event_time < new Date().getTime();
      }
    },
    data() {
      return {
        title: "DAILY MODE",
        match: {}
      }
    }
  }
</script>
