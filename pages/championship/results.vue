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

    <div v-if="!loading">
      <v-card>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="text-xs-left pt-3 pl-3">
              Tournament
            </div>
          </v-flex>
          <v-flex xs8>
            <v-select
              :items="dropdown_series_phase"
              hide-details
              item-text="name"
              item-value="id"
              v-model="defaultSelected"
              class="font8"
              solo
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <template v-for="r in getResults" v-if="!loading">
      <div>
        <ResultCard :key="r.id" :team="r"></ResultCard>
      </div>
    </template>

    <BottomChampionship></BottomChampionship>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "RESULTS",
        loading: true,
        defaultSelected: null,
        dropdown_series_phase: [],
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      ResultCard: () => import('~/components/ResultCard'),
      BottomChampionship: () => import('~/components/BottomChampionship'),
    },
    computed: {
      getResults(){
        return this.$store.getters['ClassicTeamScores/classic_team_scores'](this.defaultSelected);
      }
    },
    mounted: function() {
      this.getSeriesPhase();
    },
    methods: {
      async getSeriesPhase(){
        if (this.$store.getters['SeriesPhases/series_phases'].length == 0){
          await this.$store.dispatch('SeriesPhases/GET_PHASES', {fields: 'id,name,current_user_classic_team,transfer_windows,prizes'});
        }
        var phases = this.$store.getters['SeriesPhases/series_phases'];
        phases.forEach(p => {
          this.dropdown_series_phase.push({id: p.id, name: p.name});
        });
        if(this.$route.query.phase_id != undefined){
          this.defaultSelected = Number(this.$route.query.phase_id)
        }
        else{
          this.defaultSelected = this.dropdown_series_phase[0].id
        }
        if (this.$store.getters['ClassicTeamScores/classic_team_scores'](this.defaultSelected).length == 0){
          await this.$store.dispatch('ClassicTeamScores/GET_RESULTS', {id: this.defaultSelected, fields: 'id,score,series_phase_id,free_sub_used,paid_sub_used,match{match_no,match_stage,team1,team2}'});
        }
        this.loading = false
      },
      async update_results(val) {
        this.loading = true
        if(typeof(val) == "number"){
          if (this.$store.getters['ClassicTeamScores/classic_team_scores'](val).length == 0){
            await this.$store.dispatch('ClassicTeamScores/GET_RESULTS', {id: val, fields: 'id,score,series_phase_id,free_sub_used,paid_sub_used,match{match_no,match_stage,team1,team2}'});
          }
          this.loading = false
        }
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      }
    },
    watch: {
      defaultSelected(val, oldVal) {
        if(oldVal != undefined)
          this.update_results(val)
      }
    }
  }
</script>


<style type="text/css" scoped>
  .v-text-field--box .v-input__slot, .v-text-field--outline .v-input__slot{
    height: 6px !important;
  }
  .imagec{
    border-radius: 50%; 
    border: 1px solid #fff;
  }
  .image{
    width: 42px;
  }
</style>
