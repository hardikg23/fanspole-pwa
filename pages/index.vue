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
    async asyncData({ route, store , redirect}) {
      if(store.getters['Matches/daily_matches'].length < 10){
        await store.dispatch('Matches/GET_DAILY_MATCHES');
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
        return this.$store.getters['Matches/daily_matches'];
      }
    },
    data() {
      return {
        match: {}
      }
    }
  }
</script>
