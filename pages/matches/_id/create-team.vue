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
                <div class="pr-2"><Countdown :date="getMatch.event_time_in_millis/1000"></Countdown></div>
              </div>
            </v-flex>
            <v-flex xs6 class='white--text'>
              <div class="text-xs-center">
                <div class="font8 opacity06">Players</div>
                <div>
                  <span class="font-weight-bold font12">{{selected_players_count}}</span><span class="font8 opacity06">/ 11</span>
                </div>
              </div>
            </v-flex>
            <v-flex xs6 class='white--text'>
              <div class="text-xs-center">
                <div class="font8 opacity06">Credit Left</div>
                <div>
                  <span class="font-weight-bold font12">{{budget}}</span>
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
          <v-tab ripple :key="1">WK ({{selected_wk}})</v-tab>
          <v-tab ripple :key="2">BAT ({{selected_bat}})</v-tab>
          <v-tab ripple :key="3">AR ({{selected_ar}})</v-tab>
          <v-tab ripple :key="4">BOWL ({{selected_bowl}})</v-tab>
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
                <tr @click="click_on_players(props.item)" v-bind:class="{'player-selected': selected_players.indexOf(props.item.id) != -1}">
                  <td class="text-xs-left pa-0 pl-1">
                    <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                  </td>
                  <td class="text-xs-left pa-2">
                    <div class="font-weight-bold font11">{{props.item.name}}</div>
                    <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                  </td>
                  <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                  <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                  <td class="pa-0 pr-2">
                    <v-icon v-if="selected_players.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                    <v-icon v-if="selected_players.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
                  </td>
                </tr>
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
                <tr @click="click_on_players(props.item)" v-bind:class="{'player-selected': selected_players.indexOf(props.item.id) != -1}">
                  <td class="text-xs-left pa-0 pl-1">
                    <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                  </td>
                  <td class="text-xs-left pa-2">
                    <div class="font-weight-bold font11">{{props.item.name}}</div>
                    <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                  </td>
                  <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                  <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                  <td class="pa-0 pr-2">
                    <v-icon v-if="selected_players.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                    <v-icon v-if="selected_players.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
                  </td>
                </tr>
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
                <tr @click="click_on_players(props.item)" v-bind:class="{'player-selected': selected_players.indexOf(props.item.id) != -1}">
                  <td class="text-xs-left pa-0 pl-1">
                    <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                  </td>
                  <td class="text-xs-left pa-2">
                    <div class="font-weight-bold font11">{{props.item.name}}</div>
                    <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                  </td>
                  <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                  <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                  <td class="pa-0 pr-2">
                    <v-icon v-if="selected_players.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                    <v-icon v-if="selected_players.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
                  </td>
                </tr>
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
                <tr @click="click_on_players(props.item)" v-bind:class="{'player-selected': selected_players.indexOf(props.item.id) != -1}">
                  <td class="text-xs-left pa-0 pl-1">
                    <img :alt="props.item.team.name_attr" v-bind:src="props.item.team.jersey_photo" style="width:32px;height: 32px;">
                  </td>
                  <td class="text-xs-left pa-2">
                    <div class="font-weight-bold font11">{{props.item.name}}</div>
                    <div class="font9"><span class="font-weight-bold">{{props.item.team.name_attr}}</span> - <span>{{getStyle(props.item.style)}}</span></div>
                  </td>
                  <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}}</div></td>
                  <td class="text-xs-center font-weight-bold pa-0"><div>{{props.item.value}}</div></td>
                  <td class="pa-0 pr-2">
                    <v-icon v-if="selected_players.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                    <v-icon v-if="selected_players.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
                  </td>
                </tr>
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
      if (store.getters['Matches/daily_match'](params.id) == undefined){
        await store.dispatch('Matches/GET_DAILY_MATCH', params.id);  
      }
      if (store.getters['Players/players'](params.id).length == 0){
        await store.dispatch('Players/GET_PLAYERS', params.id);
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/daily_match'](this.$route.params.id);
      },
      getWK(){
        return this.$store.getters['Players/get_wk_players'](this.$route.params.id);
      },
      getBAT(){
        return this.$store.getters['Players/get_bat_players'](this.$route.params.id);
      },
      getAR(){
        return this.$store.getters['Players/get_ar_players'](this.$route.params.id);
      },
      getBOWL(){
        return this.$store.getters['Players/get_bowl_players'](this.$route.params.id);
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
      },
      click_on_players(item){
        if(this.selected_players.indexOf(item.id) == -1){
          this.selected_players.push(item.id);
          this.selected_players_hash.push(item);
        }else{
          this.selected_players.splice(this.selected_players.indexOf(item.id), 1);
          this.selected_players_hash.splice(this.selected_players.indexOf(item.id), 1);
        }
        this.selected_players_count = this.selected_players.length;
        let budget = 0;
        let selected_bat = 0;
        let selected_wk = 0;
        let selected_ar = 0;
        let selected_bowl = 0;
        this.selected_players_hash.forEach(function(element) {
          budget = budget + parseFloat(element.value);
          switch(element.style) {
            case 1:
              selected_bat++
              break;
            case 3:
              selected_bat++
              selected_ar++
              break;
            case 5:
              selected_bat++
              selected_wk++
              break;
            case 7:
              selected_wk++
              break;
            case 9:
              selected_ar++
              break;
            case 11:
              selected_bowl++
              selected_ar++
              break;
            default:
              selected_bowl++
              break;
          }
        });
        this.budget = 100.0 - budget;
        this.selected_wk = selected_wk;
        this.selected_bat = selected_bat;
        this.selected_ar = selected_ar;
        this.selected_bowl = selected_bowl;
      }
    },
    data() {
      return {
        title: 'CREATE TEAM',
        selected_players_count: 0,
        selected_players: [],
        selected_players_hash: [],
        selected_wk: 0,
        selected_bat: 0,
        selected_ar: 0,
        selected_bowl: 0,
        budget: 100.0,
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
  .player-selected{
    background-color: #FFF8E1 !important;
  }
</style>