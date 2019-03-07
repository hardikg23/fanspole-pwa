<template>
  <section>
    <v-toolbar extended color="primary" extension-height='100'>
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <v-layout row wrap>
            <v-flex xs6>
              <div class="text-xs-left">
                <div>{{getMatch.team1.name_attr}} vs {{getMatch.team2.name_attr}}</div>
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="text-xs-right">
                <div class="pr-2"><Countdown :date="getMatch.event_time/1000"></Countdown></div>
              </div>
            </v-flex>
            <v-flex xs6 class='white--text'>
              <div class="text-xs-center">
                <div class="font8 opacity06">Players</div>
                <div>
                  <span class="font-weight-bold font12">0</span><span class="font8 opacity06">/ 11</span>
                </div>
              </div>
            </v-flex>
            <v-flex xs6 class='white--text'>
              <div class="text-xs-center">
                <div class="font8 opacity06">Credit Left</div>
                <div>
                  <span class="font-weight-bold font12">100.0</span>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <template>
      <div>
        <v-tabs grow centered slider-color="primary">
          <v-tab ripple :key="1">WK (0)</v-tab>
          <v-tab ripple :key="2">BAT (0)</v-tab>
          <v-tab ripple :key="3">AR (0)</v-tab>
          <v-tab ripple :key="4">BOWL (0)</v-tab>
          <v-tab-item :key="1">
            <div class="text-xs-center font-weight-bold pa-2">PICK 1 WICKET-KEEPER</div>
            <v-data-table
              :headers="headers"
              :items="getWK"
              class="data-table"
              align='center'
              :pagination.sync="pagination"
              hide-actions
              expand
            >
              <template v-slot:items="props">
                <td class="text-xs-left pa-0 pl-1">
                  <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                </td>
                <td class="text-xs-left pa-2">
                  <div class="font-weight-bold font11">{{props.item.name}}</div>
                  <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                </td>
                <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                <td class="pa-0"><v-icon class='green--text text--accent-4'>add_circle_outline</v-icon></td>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item :key="2">
            <div class="text-xs-center font-weight-bold pa-2">PICK MIN 4 BATSMEN</div>
            <v-data-table
              :headers="headers"
              :items="getBAT"
              class="data-table"
              align='center'
              :pagination.sync="pagination"
              hide-actions
              expand
            >
              <template v-slot:items="props">
                <td class="text-xs-left pa-0 pl-1">
                  <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                </td>
                <td class="text-xs-left pa-2">
                  <div class="font-weight-bold font11">{{props.item.name}}</div>
                  <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                </td>
                <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                <td class="pa-0"><v-icon class='green--text text--accent-4'>add_circle_outline</v-icon></td>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item :key="3">
            <div class="text-xs-center font-weight-bold pa-2">PICK MIN 1 ALL-ROUNDER</div>
            <v-data-table
              :headers="headers"
              :items="getAR"
              class="data-table"
              align='center'
              :pagination.sync="pagination"
              hide-actions
              expand
            >
              <template v-slot:items="props">
                <td class="text-xs-left pa-0 pl-1">
                  <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                </td>
                <td class="text-xs-left pa-2">
                  <div class="font-weight-bold font11">{{props.item.name}}</div>
                  <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                </td>
                <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                <td class="pa-0"><v-icon class='green--text text--accent-4'>add_circle_outline</v-icon></td>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item :key="4">
            <div class="text-xs-center font-weight-bold pa-2">PICK MIN 3 BOWLERS</div>
            <v-data-table
              :headers="headers"
              :items="getBOWL"
              class="data-table"
              align='center'
              :pagination.sync="pagination"
              hide-actions
              expand
            >
              <template v-slot:items="props">
                <td class="text-xs-left pa-0 pl-1">
                  <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                </td>
                <td class="text-xs-left pa-2">
                  <div class="font-weight-bold font11">{{props.item.name}}</div>
                  <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                </td>
                <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                <td class="pa-0"><v-icon class='green--text text--accent-4'>add_circle_outline</v-icon></td>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs>
      </div>
    </template>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      let index = store.getters['Matches/matches'].matches.findIndex((match) => {
        return match.id == params.id;
      });
      if (index == -1){  
        await store.dispatch('Matches/GET_MATCH', params.id);  
      }
      if (!store.getters['Players/GET_PLAYERS']){
        await store.dispatch('Players/GET_PLAYERS', params.id);
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getMatch() {
        let match = this.$store.getters['Matches/matches'].matches.find((match) => {
          if(match.id == this.$route.params.id){
            return match;
          }
        });
        return match;
      },
      getWK(){
        const wk = this.$store.getters['Players/players'];
        return wk.filter((item) => {
          return item.style === 5 || item.style === 7;
        });
      },
      getBAT(){
        const wk = this.$store.getters['Players/players'];
        return wk.filter((item) => {
          return item.style === 1 || item.style === 3;
        });
      },
      getAR(){
        const wk = this.$store.getters['Players/players'];
        return wk.filter((item) => {
          return item.style === 9 || item.style === 11;
        });
      },
      getBOWL(){
        const wk = this.$store.getters['Players/players'];
        return wk.filter((item) => {
          return item.style === 11 || item.style === 13;
        });
      }
    },
    methods: {
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
      }
    },
    data() {
      return {
        title: 'CREATE TEAM',
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
          { text: 'CREDITS', value: 'value'},
          { text: '', value: ''}
        ]
      }
    }
  }
</script>

<style scoped>
</style>