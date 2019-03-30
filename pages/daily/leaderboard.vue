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

    
    <v-layout row wrap class="font8 pa-1 primary font-weight-bold white--text">
      <v-flex xs6 class="text-xs-left pl-2">
        TEAM
      </v-flex>
      <v-flex xs6 class="text-xs-right pr-4">
        RANK
      </v-flex>
    </v-layout>
    <div v-if="!loading">
      <v-layout row wrap v-if="getCurrentUserPoints != undefined" class="borderb primary white--text">
        <v-flex xs2 class="pt-2 text-xs-center" style="height:56px;">
          <img :src="getCurrentUserPoints.user.image" class="image imagec">
        </v-flex>
        <v-flex xs8 class="pa-2 pl-2" style="height:56px;"> 
          <div class="font-weight-bold">{{getCurrentUserPoints.user.team_name}}</div>
          <div class="font8">{{to_number_format(getCurrentUserPoints.total_score)}} POINTS</div>
        </v-flex>
        <v-flex xs2 class="text-xs-right pr-4 pt-3" style="height:56px;">
          <div>#{{to_number_format(getCurrentUserPoints.rank)}}</div>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-for="point in getUserPoints" class="borderb">
        <v-flex xs2 class="white pt-2 text-xs-center" style="height:56px;">
          <img :src="point.user.image" class="image imagec">
        </v-flex>
        <v-flex xs8 class="white pa-2 pl-2" style="height:56px;"> 
          <div class="font-weight-bold">{{point.user.team_name}}</div>
          <div class="font8">{{to_number_format(point.total_score)}} POINTS</div>
        </v-flex>
        <v-flex xs2 class="white text-xs-right pr-4 pt-3" style="height:56px;">
          <div>#{{to_number_format(point.rank)}}</div>
        </v-flex>
      </v-layout>
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
        title: "LEADERBOARD",
        loading: true,
        defaultSelected: null,
        dropdown_series: [],
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      VueContentLoading
    },
    computed: {
      getCurrentUserPoints(){
        return this.$store.getters['UserPoints/current_user_point'];
      },
      getUserPoints(){
        return this.$store.getters['UserPoints/users_points'];
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
        await this.$store.dispatch('UserPoints/GET_USER_POINTS', first_series.id);
        this.loading = false
      },
      async update_leaderboard(val) {
        this.loading = true
        if(typeof(val) == "number"){
          await this.$store.dispatch('UserPoints/GET_USER_POINTS', val);
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
