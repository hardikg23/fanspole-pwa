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
    <div v-if="!loading">
      <div v-if="getGangs.length > 0">
        <template v-for="g in getGangs">
          <div>
            <ClassicGangCard :key="g.id" :gang="g"></ClassicGangCard>
          </div>
        </template>
      </div>
      <div v-else class="text-xs-center pt-4 mt-4">
        No Gangs
      </div>
    </div>
    <BottomChampionship></BottomChampionship>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "GANGS",
        loading: true,
        defaultSelected: null,
        dropdown_series_phase: [],
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      BottomChampionship: () => import('~/components/BottomChampionship'),
      ClassicGangCard: () => import('~/components/ClassicGangCard'),
    },
    computed: {
      getGangs(){
        return this.$store.getters['ClassicGangs/gangs'](this.defaultSelected);
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
        if (this.$store.getters['ClassicGangs/gangs'](this.defaultSelected).length == 0){
          await this.$store.dispatch('ClassicGangs/GET_GANGS', {id: this.defaultSelected, fields: 'id,name,league_motto,league_members_count,league_code,user{id,display_name}'});
        }
        this.loading = false
      },
      async update_gangs(val) {
        this.loading = true
        if(typeof(val) == "number"){
          if (this.$store.getters['ClassicGangs/gangs'](val).length == 0){
            await this.$store.dispatch('ClassicGangs/GET_GANGS', {id: val, fields: 'id,name,league_motto,league_members_count,league_code,user{id,display_name}'});
          }
          this.loading = false
        }
      }
    },
    watch: {
      defaultSelected(val, oldVal) {
        if(oldVal != undefined){
          this.update_gangs(val)
        }
      }
    }
  }
</script>


<style type="text/css" scoped>
  .v-text-field--box .v-input__slot, .v-text-field--outline .v-input__slot{
    height: 6px !important;
  }
</style>
