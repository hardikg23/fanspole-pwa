<template>
  <section>
    <Header :title="title"/>
    <template class="blue-grey" v-for="match in getMatches">
      <MatchCard :key="match.id" :match="match"></MatchCard>
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
      title() {
        return 'DAILY MODE'
      },
      getMatches() {
        return this.$store.getters['Matches/matches'];
      }
    },
    data() {
      return {
        match: {}
      }
    }
  }
</script>
