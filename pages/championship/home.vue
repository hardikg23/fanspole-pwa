<template>
  <section class="mb65">
    <Header :title="title" bar_color="championship"></Header>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="championship"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-for="phase in getSeriesPhases" v-if="!loading">
      <div>
        <SeriesPhaseCard :key="phase.id" :phase="phase"></SeriesPhaseCard>
      </div>
    </template>
    <BottomChampionship></BottomChampionship>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "CHAMPIONSHIP MODE",
        loading: true
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      BottomChampionship: () => import('~/components/BottomChampionship'),
      SeriesPhaseCard: () => import('~/components/SeriesPhaseCard'),
    },
    computed: {
      getSeriesPhases() {
        return this.$store.getters['SeriesPhases/series_phases'];
      }
    },
    created(){
      console.log("home/created");
    },
    mounted: function() {
      console.log("home/mounted");
      this.getApiSeriesPhase();
    },
    methods: {
      async getApiSeriesPhase(){
        if (this.$store.getters['SeriesPhases/series_phases'].length == 0){
          await this.$store.dispatch('SeriesPhases/GET_PHASES', {fields: 'id,name,current_user_classic_team,transfer_windows,prizes'});
        }
        this.loading = false
      }
    }
  }
</script>
