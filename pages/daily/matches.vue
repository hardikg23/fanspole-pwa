<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <v-card>
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
    <template v-for="match in getMatches">
      <DetailMatchCard :key="match.id" :match="match"></DetailMatchCard>
    </template>
    <template>
      <div v-if="loading">
        <v-card class="ma-2" v-for="n in 6" :key="n">
          <vue-content-loading :width="400" :height="100" class="white">
            <circle cx="45" cy="45" r="25" />
            <rect x="90" y="13" rx="4" ry="4" width="55%" height="15" />
            <rect x="90" y="37" rx="4" ry="4" width="55%" height="5" />
            <rect x="90" y="57" rx="4" ry="4" width="55%" height="12" />
            <rect x="90" y="77" rx="4" ry="4" width="55%" height="8" />
            <circle cx="350" cy="45" r="25" />
          </vue-content-loading>
        </v-card>
      </div>
    </template>
  </section>
</template>

<script>
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: "MATCHES",
        loading: true,
        defaultSelected: null,
        dropdown_series: [],
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      DetailMatchCard: () => import('~/components/DetailMatchCard'),
      VueContentLoading
    },
    computed: {
      getMatches(){
        return this.$store.getters['Matches/series_matches'];
      }
    },
    created: function() {
      this.getSeries();
    },
    methods: {
      async getSeries(){
        await this.$store.dispatch('Series/GET_ALL_SERIES');
        var series = this.$store.getters['Series/series'];
        series.forEach(s => {
          this.dropdown_series.push({id: s.id, name: s.name});
        });
        this.defaultSelected = this.dropdown_series[0]
        var first_series = this.$store.getters['Series/first_series']
        await this.$store.dispatch('Matches/GET_SERIES_MATCHES', first_series.id);
        this.loading = false
      },
      async update_matches(val) {
        this.loading = true
        if(typeof(val) == "number"){
          await this.$store.dispatch('Matches/GET_SERIES_MATCHES', val);
          this.loading = false
        }
      }
    },
    watch: {
      defaultSelected(val) {
        this.update_matches(val)
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
    width: 50px;
  }
</style>
