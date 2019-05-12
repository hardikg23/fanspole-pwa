<template>
  <section class="mb65">
    <Header :title="title"></Header>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    
    <v-card v-if="!loading">
      <v-layout row wrap>
        <v-flex xs4>
          <div class="text-xs-left pt-3 pl-3">
            Select Series
          </div>
        </v-flex>
        <v-flex xs8>
          <v-select
            :items="dropdown_series"
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

    <div v-if="!loading">
      <div v-if="getGangs.length > 0">
        <template v-for="g in getGangs">
          <div>
            <GangCard :key="g.id" :gang="g"></GangCard>
          </div>
        </template>
      </div>
      <div v-else class="text-xs-center pt-4 mt-4">
        No Gangs
      </div>
    </div>
    <Bottom></Bottom>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "GANGS",
        loading: true,
        defaultSelected: null,
        dropdown_series: [],
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom'),
      GangCard: () => import('~/components/GangCard'),
    },
    computed: {
      getGangs(){
        return this.$store.getters['Gangs/gangs'](this.defaultSelected);
      }
    },
    mounted: function() {
      this.getSeries();
    },
    methods: {
      async getSeries(){
        await this.$store.dispatch('Series/GET_ALL_SERIES');
        var series = this.$store.getters['Series/series'];
        series.forEach(s => {
          this.dropdown_series.push({id: s.id, name: s.name});
        });
        if(this.$route.query.series_id != undefined){
          this.defaultSelected = Number(this.$route.query.series_id)
        }
        else{
          this.defaultSelected = this.dropdown_series[0].id
        }
        if (this.$store.getters['Gangs/gangs'](this.defaultSelected).length == 0){
          await this.$store.dispatch('Gangs/GET_GANGS', {id: this.defaultSelected, fields: 'id,name,league_motto,league_members_count,league_code,current_user_data,user{id,display_name}'});
        }
        this.loading = false
      },
      async update_gangs(val) {
        this.loading = true
        if(typeof(val) == "number"){
          if (this.$store.getters['Gangs/gangs'](val).length == 0){
            await this.$store.dispatch('Gangs/GET_GANGS', {id: val, fields: 'id,name,league_motto,league_members_count,league_code,current_user_data,user{id,display_name}'});
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
