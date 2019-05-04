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

      <v-layout row wrap class="font8 pa-1 championship font-weight-bold white--text">
        <v-flex xs7 class="text-xs-left pl-2">
          TEAM
        </v-flex>
        <v-flex xs3 class="text-xs-center pr-4">
          SUBS
        </v-flex>
        <v-flex xs2 class="text-xs-right pr-4">
          RANK
        </v-flex>
      </v-layout>
      <div v-if="!loading">
        <v-layout row wrap v-if="getCurrentUserClassicTeam != undefined" class="borderb championship white--text">
          <v-flex xs2 class="pt-2 text-xs-center" style="height:56px;">
            <img :src="getCurrentUserClassicTeam.user.image" class="image imagec">
          </v-flex>
          <v-flex xs5 class="pa-2 pl-2" style="height:56px;" v-on:click.stop="viewTeamClick.call(this, getCurrentUserClassicTeam.id)"> 
            <div class="fontw600 font9">{{getCurrentUserClassicTeam.user.team_name.substring(0, 18)}}</div>
            <div class="font8">{{to_number_format(getCurrentUserClassicTeam.score)}} POINTS</div>
          </v-flex>
          <v-flex xs3 class="text-xs-center pr-4 pt-3" style="height:56px;">
            <span>{{getCurrentUserClassicTeam.sum_paid_sub_used}}</span>
            /
            <span>{{getCurrentUserClassicTeam.sum_free_sub_used}}</span>
          </v-flex>
          <v-flex xs2 class="text-xs-center pt-3" style="height:56px;">
            <div>#{{to_number_format(getCurrentUserClassicTeam.rank)}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-for="team in getClassicTeams" :key="team.id" class="borderb">
          <v-flex xs2 class="white pt-2 text-xs-center" style="height:56px;">
            <img :src="team.user.image" class="image imagec">
          </v-flex>
          <v-flex xs5 class="white pa-2 pl-2" style="height:56px;" v-on:click.stop="viewTeamClick.call(this, team.id)"> 
            <div class="fontw600 font9">{{team.user.team_name.substring(0, 18)}}</div>
            <div class="font8">{{to_number_format(team.score)}} POINTS</div>
          </v-flex>
          <v-flex xs3 class="white text-xs-center pr-4 pt-3" style="height:56px;">
            <span class="red--text text--accent-4">{{team.sum_paid_sub_used}}</span>
            /
            <span class="green--text text--accent-4">{{team.sum_free_sub_used}}</span>
          </v-flex>
          <v-flex xs2 class="white text-xs-center pr-4 pt-3" style="height:56px;">
            <div>#{{to_number_format(team.rank)}}</div>
          </v-flex>
        </v-layout>
      </div>
    </div>

    <BottomChampionship></BottomChampionship>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "LEADERBOARD",
        loading: true,
        defaultSelected: null,
        dropdown_series_phase: [],
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      BottomChampionship: () => import('~/components/BottomChampionship'),
    },
    computed: {
      getCurrentUserClassicTeam(){
        return this.$store.getters['SeriesPhases/current_user_classic_team'](this.defaultSelected);
      },
      getClassicTeams(){
        return this.$store.getters['SeriesPhases/classic_teams'](this.defaultSelected);
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
        if (this.$store.getters['SeriesPhases/classic_teams'](this.defaultSelected).length == 0){
          await this.$store.dispatch('SeriesPhases/GET_LEADERBOARD', {id: this.defaultSelected, fields: 'id,score,rank,sum_free_sub_used,series_phase_id,sum_paid_sub_used,user{id,team_name,image}'});
        }
        this.loading = false
      },
      async update_leaderboard(val) {
        this.loading = true
        if(typeof(val) == "number"){
          if (this.$store.getters['SeriesPhases/classic_teams'](val).length == 0){
            await this.$store.dispatch('SeriesPhases/GET_LEADERBOARD', {id: val, fields: 'id,score,rank,sum_free_sub_used,series_phase_id,sum_paid_sub_used,user{id,team_name,image}'});
          }
          this.loading = false
        }
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
      viewTeamClick(id){
        this.$router.push(`/championship/teams/${id}`);
      }
    },
    watch: {
      defaultSelected(val, oldVal) {
        if(oldVal != undefined){
          this.update_leaderboard(val)
        }
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
