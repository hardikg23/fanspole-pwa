<template>
  <div style="margin-top: 112px;width:100%;overflow-y:auto;">
    <v-layout row wrap class="primary pa-2">
      <v-flex xs6 class='white--text'>
        <div class="text-xs-center">
          <div class="font8 opacity06">Players</div>
          <div>
            <span class="font-weight-bold font12">{{getSelectedPlayersCount}}</span><span class="font8 opacity06">/ 11</span>
          </div>
        </div>
      </v-flex>
      <v-flex xs6 class='white--text'>
        <div class="text-xs-center">
          <div class="font8 opacity06">Credit Left</div>
          <div>
            <span class="font-weight-bold font12">{{getBudget}}</span>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-tabs grow centered slider-color="primary">
      <v-tab ripple :key="1">WK <span v-bind:class="{'grey lighter-2': !getBalancedWk, 'green accent-4': getBalancedWk}" class="dot grey lighter-2 ml-1"></span></v-tab>
      <v-tab ripple :key="2">BAT <span v-bind:class="{'grey lighter-2': !getBalancedBat, 'green accent-4': getBalancedBat}" class="dot grey lighter-2 ml-1"></span></v-tab>
      <v-tab ripple :key="3">AR <span v-bind:class="{'grey lighter-2': !getBalancedAr, 'green accent-4': getBalancedAr}" class="dot grey lighter-2 ml-1"></span></v-tab>
      <v-tab ripple :key="4">BOWL <span v-bind:class="{'grey lighter-2': !getBalancedBowl, 'green accent-4': getBalancedBowl}" class="dot grey lighter-2 ml-1"></span></v-tab>
      <v-tab-item :key="1">
        <div class="text-xs-center font-weight-bold pa-2">PICK 1 WICKET-KEEPER <v-icon @click.stop="rulesDialog = true">info</v-icon></div>
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
            <tr 
              @click="click_on_players(props.item)" 
              v-bind:class="{'player-selected': getSelectedPlayers.indexOf(props.item.id) != -1, 'player-disabled': ((props.item.value > getBudget || getSelectedPlayers.length == 11) && getSelectedPlayers.indexOf(props.item.id) == -1)}"
            >
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
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item :key="2">
        <div class="text-xs-center font-weight-bold pa-2">PICK MIN 4 BATSMEN <v-icon @click.stop="rulesDialog = true">info</v-icon></div>
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
            <tr 
              @click="click_on_players(props.item)" 
              v-bind:class="{'player-selected': getSelectedPlayers.indexOf(props.item.id) != -1, 'player-disabled': ((props.item.value > getBudget || getSelectedPlayers.length == 11) && getSelectedPlayers.indexOf(props.item.id) == -1)}"
            >
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
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item :key="3">
        <div class="text-xs-center font-weight-bold pa-2">PICK MIN 1 ALL-ROUNDER <v-icon @click.stop="rulesDialog = true">info</v-icon></div>
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
            <tr 
              @click="click_on_players(props.item)" 
              v-bind:class="{'player-selected': getSelectedPlayers.indexOf(props.item.id) != -1, 'player-disabled': ((props.item.value > getBudget || getSelectedPlayers.length == 11) && getSelectedPlayers.indexOf(props.item.id) == -1)}"
            >
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
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item :key="4">
        <div class="text-xs-center font-weight-bold pa-2">PICK MIN 2 BOWLERS <v-icon @click.stop="rulesDialog = true">info</v-icon></div>
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
            <tr 
              @click="click_on_players(props.item)" 
              v-bind:class="{'player-selected': getSelectedPlayers.indexOf(props.item.id) != -1, 'player-disabled': ((props.item.value > getBudget || getSelectedPlayers.length == 11) && getSelectedPlayers.indexOf(props.item.id) == -1)}"
            >
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
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) == -1" class='green--text text--accent-4'>add_circle_outline</v-icon>
                <v-icon v-if="getSelectedPlayers.indexOf(props.item.id) != -1" class='red--text text--accent-4'>remove_circle_outline</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>

    <div>
      <v-dialog v-model="rulesDialog">
        <v-card>
          <v-card-title class="headline pa-0 pl-2 pt-2">Rules</v-card-title>
          <v-card-text>
            <ul>
              <li v-bind:class="{'grey--text text--lighter-2': getSelectedPlayersCount < 11, 'green--text text--accent-4': getSelectedPlayersCount >= 11}">Select 11 players</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedBat, 'green--text text--accent-4': getBalancedBat}">Minimum 4 Batsmen</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedWk, 'green--text text--accent-4': getBalancedWk}">1 Wicket Keeper</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedAr, 'green--text text--accent-4': getBalancedAr}">Atleast 1 All-rounder</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedBowl, 'green--text text--accent-4': getBalancedBowl}">Atleast 2 Bowlers</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedArAndBowl, 'green--text text--accent-4': getBalancedArAndBowl}">Total no of Bowlers + All-Rounders should be at least 5</li>
              <li v-bind:class="{'grey--text text--lighter-2': !getBalancedPureWk, 'green--text text--accent-4': getBalancedPureWk}">You can not select 2 pure Wicket Keepers. If your team has 2 or more Batting Wicket Keeper one will be consider as wicket-keeper and other(s) will be consider as batsman.</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="rulesDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="captainDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card style='padding-bottom: 100px;'>
          <v-toolbar dark class="grey darken-3">
            <v-btn icon dark @click="captainDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Select Captain</v-toolbar-title>  
          </v-toolbar>
          <v-list>
            <v-data-table
              :items="getSelectedPlayersHash"
              class="data-table"
              align='center'
              hide-actions
              hide-headers
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
                  <td class="text-xs-center pa-0"><div>{{props.item.last_series_score}} Pts</div></td>
                  <td class="text-xs-right pa-0 pr-4">
                    <v-btn class='captain_btn' @click="captain_selected(props.item.id)" v-bind:class="{'primary': getCaptainId == props.item.id}">C</v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-list>
          
          <div class='floter_btn'>
            <v-btn small class='f_btn primary--text font-weight-bold font8' @click.stop="previewDialog = true">TEAM PREVIEW</v-btn>
            <v-btn small v-bind:class="{'primary': getCaptainId != undefined, 'grey lighter-2': getCaptainId == undefined}" class='f_btn font-weight-bold font8' @click="save_team" :loading="loading">SAVE TEAM</v-btn>
          </div>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="previewDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark class="grey darken-3">
            <v-btn icon dark @click="previewDialog = false">
              <v-icon>close</v-icon>
            </v-btn>          
          </v-toolbar>
          <v-list v-if="getUserTeam != undefined" class="grad1" style="min-height: 100vh">
            <v-layout row wrap class="text-xs-center">
              <v-flex xs12 class="white--text font-weight-bold font22" style='opacity:0.4'>
                FANSPOLE
              </v-flex>
              <v-flex xs12 class='pt-3'>
                <TeamPlayers :players="getUserTeam.row1" :captain="getCaptainId"></TeamPlayers>
              </v-flex>
              <v-flex xs12>
                <TeamPlayers :players="getUserTeam.row2" :captain="getCaptainId"></TeamPlayers>
              </v-flex>
              <v-flex xs12>
                <TeamPlayers :players="getUserTeam.row3" :captain="getCaptainId"></TeamPlayers>
              </v-flex>
              <v-flex xs12>
                <TeamPlayers :players="getUserTeam.row4" :captain="getCaptainId"></TeamPlayers>
              </v-flex>
            </v-layout>
          </v-list>
        </v-card>
      </v-dialog>
      
    </div>
    <div class='floter_btn'>
      <v-btn small class='f_btn primary--text font-weight-bold font8' @click.stop="previewDialog = true">TEAM PREVIEW</v-btn>
      <v-btn small v-bind:class="{'primary': getValidTeam, 'grey lighter-2': !getValidTeam}" class='f_btn font-weight-bold font8' @click.stop="getValidTeam ? captainDialog = true : rulesDialog = true">CONTINUE</v-btn>
    </div>
  </div>
</template>

<script> 
  export default {
    props: {
      new_team: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        rulesDialog: false,
        previewDialog: false,
        captainDialog: false,
        loading: false,
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
    },
    components: {
      TeamPlayers: () => import('~/components/TeamPlayers')
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
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
      },
      getCaptainId(){
        return this.$store.getters['CreateTeam/captain_id'];
      },
      getSelectedPlayersCount(){
        return this.$store.getters['CreateTeam/selected_players_count'];
      },
      getSelectedPlayers(){
        return this.$store.getters['CreateTeam/selected_players'];
      },
      getSelectedPlayersHash(){
        return this.$store.getters['CreateTeam/selected_players_hash'];
      },
      getBalancedWk(){
        return this.$store.getters['CreateTeam/balanced_wk'];
      },
      getBalancedPureWk(){
        return this.$store.getters['CreateTeam/balanced_pure_wk'];
      },
      getBalancedBat(){
        return this.$store.getters['CreateTeam/balanced_bat'];
      },
      getBalancedAr(){
        return this.$store.getters['CreateTeam/balanced_ar'];
      },
      getBalancedBowl(){
        return this.$store.getters['CreateTeam/balanced_bowl'];
      },
      getBalancedArAndBowl(){
        return this.$store.getters['CreateTeam/balanced_ar_and_bowl'];
      },
      getSelectedWk(){
        return this.$store.getters['CreateTeam/selected_wk'];
      },
      getSelectedBat(){
        return this.$store.getters['CreateTeam/selected_bat'];
      },
      getSelectedAr(){
        return this.$store.getters['CreateTeam/selected_ar'];
      },
      getSelectedBowl(){
        return this.$store.getters['CreateTeam/selected_bowl'];
      },
      getBudget(){
        return this.$store.getters['CreateTeam/budget'];
      },
      getValidTeam(){
        return this.$store.getters['CreateTeam/valid_team'];
      },
      getUserTeam() {
        var team_players = this.$store.getters['CreateTeam/selected_players_hash'];
        var row1 = [];
        var row2 = []
        var row3 = []
        var row4 = []
        if(team_players != undefined){
          let wk = team_players.find((player) => {
            if(player.style == 5 || player.style == 7){
              return player;
            }
          });
          var other_players = []
          if(wk != undefined){
            row1 = [wk];
            other_players = team_players.filter((player) => {
              if(player.id != wk.id){
                return player;
              }
            });
          }
          row2 = other_players.slice(0, 4);
          row3 = other_players.slice(4, 6);
          row4 = other_players.slice(6, 10);
          return {row1: row1, row2: row2, row3: row3, row4: row4}
        }
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
        if(this.getSelectedPlayers.indexOf(item.id) == -1){
          if(this.getSelectedPlayers.length == 11){
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: "11 players selected, tap 'continue' to proceed",
              button: false
            });
            return false;
          }
          if(item.value > this.getBudget){
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: "Only " + this.getBudget+ " credits left",
              button: false
            });
            return false;
          }
        }
        if(this.getSelectedPlayers.indexOf(item.id) == -1){
          this.$store.commit('CreateTeam/PUSH_SELECTED_PLAYER', item.id);
          this.$store.commit('CreateTeam/PUSH_SELECTED_PLAYER_HASH', item);
        }else{
          this.$store.commit('CreateTeam/POP_SELECTED_PLAYER', item.id);
          this.$store.commit('CreateTeam/POP_SELECTED_PLAYER_HASH', item.id);
        }
        this.$store.commit('CreateTeam/UPDATE_DATA');
        this.$store.commit('CreateTeam/VALIDATE_TEAM');
      },
      captain_selected(id){
        this.$store.commit('CreateTeam/SET_CAPTAIN', id);
      },
      async save_team(){
        this.loading = true;
        if(this.getCaptainId == undefined){
          this.$nuxt.$emit('snackbarError', {
            snackbar: true,
            message: "Select captain for your team",
            button: false
          });
          this.loading = false;
          return false;
        }else{
          if(this.new_team){
            await this.$store.dispatch('CreateTeam/SAVE_TEAM', {id: this.$route.params.id, player_ids: this.getSelectedPlayers, captain: this.getCaptainId});
          }else{
            await this.$store.dispatch('CreateTeam/EDIT_TEAM', {id: this.$route.params.id, team_id: this.$route.params.team_id, player_ids: this.getSelectedPlayers, captain: this.getCaptainId})
          }
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>
  .player-selected{
    background-color: #FFF8E1 !important;
  }
  .player-disabled{
    opacity: 0.4;
  }
  .floter_btn{
    position: fixed;
    bottom: 30px;
    text-align: center;
    width: 100%;
  }
  .f_btn{
    width: 132px;
    font-size: 0.8em !important;
  }
  .v-tabs__content{
    padding-bottom: 58px !important;
  }
  thead tr{
    height: 0px !important;
  }
  .captain_btn{
    border-radius: 50%;
    min-width: 0px;
    width: 36px;
    height: 36px;
  }
  .dot{
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: inline-block;
  }
  .grad1 {
    background-color: #689F38;
    background-image: linear-gradient(to bottom,  #9CCC65, #689F38, #33691E);
  }
</style>