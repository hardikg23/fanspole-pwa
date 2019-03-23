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
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      await store.dispatch('Series/GET_ALL_SERIES');
      var first_series = store.getters['Series/first_series']
      await store.dispatch('Matches/GET_SERIES_MATCHES', first_series.id);
    },
    computed: {
      getSeries(){
        return this.$store.getters['Series/series'];
      },
      getMatches(){
        return this.$store.getters['Matches/series_matches'];
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      DetailMatchCard: () => import('~/components/DetailMatchCard')
    },
    mounted() {
      this.getSeries.forEach(s => {
        this.dropdown_series.push({id: s.id, name: s.name});
      });
      this.defaultSelected = this.dropdown_series[0]
    },
    watch: {
      defaultSelected(val) {
        this.update_matches(val)
      }
    },
    methods: {
      async update_matches(val) {
        if(typeof(val) == "number"){
          await this.$store.dispatch('Matches/GET_SERIES_MATCHES', val);  
        }
      }
    },
    data() {
      return {
        title: "MATCHES",
        defaultSelected: null,
        dropdown_series: [],
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
