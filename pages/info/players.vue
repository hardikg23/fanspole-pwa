<template>
  <section>
    <v-toolbar :color="color">
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
    
    <div v-if="!loading">
      <v-data-table
        :headers="headers"
        :items="getPlayers"
        class="data-table"
        align='center'
        :pagination.sync="pagination"
        hide-actions
        expand
      >
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-left pa-0 pl-1">
              <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
            </td>
            <td class="text-xs-left pa-2">
              <div class="font-weight-bold font11">{{props.item.name}}</div>
              <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
            </td>
            <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
            <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
          </tr>
        </template>
      </v-data-table>
    </div>


    <template>
      <div v-if="loading">
        <v-card v-for="n in 20" :key="n">
          <vue-content-loading :width="400" :height="60" class="white">
            <circle cx="25" cy="25" r="18" />
            <rect x="50" y="13" rx="4" ry="4" width="75%" height="15" />
            <rect x="50" y="37" rx="4" ry="4" width="70%" height="8" />
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
        title: "PLAYERS",
        loading: true,
        defaultSelected: null,
        dropdown_series: [],
        mode: 'da',
        color: 'primary',
        pagination: {
          page: 1,
          rowsPerPage: -1,
          descending: true,
          sortBy: 'value'
        },
        headers: [
          { text: '', value: ''},
          { text: 'PLAYERS', value: 'name'},
          { text: 'POINTS', value: 'last_series_score'},
          { text: 'CREDITS', value: 'value'}
        ]
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      DetailMatchCard: () => import('~/components/DetailMatchCard'),
      VueContentLoading
    },
    computed: {
      getPlayers(){
        return this.$store.getters['Players/series_players'];
      }  
    },
    mounted: function() {
      this.getSeries();
      if(this.$route.query.mode != undefined){
        this.mode = this.$route.query.mode
        if(this.mode == 'ch')
          this.color = 'championship'
      }
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
        await this.$store.dispatch('Players/GET_SERIES_PLAYERS', first_series.id);
        this.loading = false
      },
      async update_players(val) {
        this.loading = true
        if(typeof(val) == "number"){
          await this.$store.dispatch('Players/GET_SERIES_PLAYERS', val);
          this.loading = false
        }
      },
      getStyle(style){
        if(style == 1){
          return 'BAT'
        }else if(style == 3){
          return 'BAT/AL'
        }else if(style == 5){
          return 'BAT/WK'
        }else if(style == 7){
          return 'WK'
        }else if(style == 9){
          return 'AL'
        }else if(style == 11){
          return 'AL/BOWL'
        }else if(style == 13){
          return 'BOWL'
        }
      },
    },
    watch: {
      defaultSelected(val) {
        this.update_players(val)
      }
    }
  }
</script>