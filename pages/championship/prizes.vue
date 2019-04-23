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
      <v-layout row wrap class="font8 pa-1 championship font-weight-bold text-xs-center white--text text-uppercase">
        <v-flex xs6>
          rank
        </v-flex>
        <v-flex xs6>
          prize
        </v-flex>
      </v-layout>
      <div v-if="!loading">
        <v-layout row wrap v-for="p in getPrizes" :key="p.id" class="borderb text-xs-center">
          <v-flex xs6 class="white py-3">
            {{p.rank}}
          </v-flex>
          <v-flex xs6 class="white py-3">
            <span v-html="p.prize"></span>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "PRIZES",
        loading: true,
        defaultSelected: null,
        dropdown_series_phase: [],
      }
    },
    components: {
      BackChampionship: () => import('~/components/BackChampionship')
    },
    computed: {
      getPrizes(){
        return this.$store.getters['SeriesPhases/prizes'];
      }
    },
    mounted: function() {
      this.getApiSeriesPhase();
    },
    methods: {
      async getApiSeriesPhase(){
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
        this.$store.commit('SeriesPhases/SET_PRIZES', this.defaultSelected);
        this.loading = false
      },
      async update_leaderboard(val) {
        this.loading = true
        if(typeof(val) == "number"){
          this.$store.commit('SeriesPhases/SET_PRIZES', val);
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
      defaultSelected(val) {
        this.update_leaderboard(val)
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