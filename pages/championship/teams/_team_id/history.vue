<template>
  <section class="mb65">
    <v-toolbar color="championship">
      <BackChampionship :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="championship"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-for="r in getHistory" v-if="!loading">
      <div>
        <ResultCard :key="r.id" :team="r"></ResultCard>
      </div>
    </template>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "HISTORY",
        loading: true,
      }
    },
    components: {
      BackChampionship: () => import('~/components/BackChampionship'),
      ResultCard: () => import('~/components/ResultCard'),
    },
    computed: {
      getHistory(){
        return this.$store.getters['ClassicTeamScores/classic_team_scores_history'];
      }
    },
    mounted: function() {
      this.getApiHistory();
    },
    methods: {
      async getApiHistory(){
        await this.$store.dispatch('ClassicTeamScores/GET_HISTORY', {id: this.$route.params.team_id, fields: 'id,score,series_phase_id,captain,free_sub_used,paid_sub_used,match{match_no,match_stage,team1,team2}'});
        this.loading = false
      },
    }
  }
</script>


<style type="text/css" scoped>
</style>
