<template>
  <section>
    <Header :title="title"/>
    <template class="blue-grey" v-for="match in getMatches.matches">
      <MatchCard :key="match.id" :match="match"></MatchCard>
    </template>
    <Bottom/>
  </section>
</template>

<script>
  export default {
    async asyncData({ route, store , redirect}) {
      await store.dispatch('Home/GET_MATCHES');
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
        return this.$store.getters['Home/matches'];
      }
    },
    data() {
      return {
        match: {}
      }
    }
  }
</script>
