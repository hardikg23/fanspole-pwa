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
  
    <v-layout row wrap v-if="getCurrentUserPoints != undefined" class="borderb primary white--text">
      <v-flex xs2 class="pa-2 pl-3">
        <img :src="getCurrentUserPoints.user.image" class="image imagec">
      </v-flex>
      <v-flex xs8 class="pa-1 pl-2">
        <div class="font-weight-bold">{{getCurrentUserPoints.user.team_name}}</div>
        <div class="font9 pt-1">{{getCurrentUserPoints.total_score}} POINTS</div>
      </v-flex>
      <v-flex xs2 class="text-xs-right pa-4">
        <div>#{{getCurrentUserPoints.rank}}</div>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-for="point in getUserPoints" class="borderb">
      <v-flex xs2 class="white pa-2 pl-3">
        <img :src="point.user.image" class="image imagec">
      </v-flex>
      <v-flex xs8 class="white pa-1 pl-2">
        <div class="font-weight-bold">{{point.user.team_name}}</div>
        <div class="font9 pt-1">{{point.total_score}} POINTS</div>
      </v-flex>
      <v-flex xs2 class="white text-xs-right pa-4">
        <div>#{{point.rank}}</div>
      </v-flex>
    </v-layout>

  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      await store.dispatch('Series/GET_ALL_SERIES');
      var first_series = store.getters['Series/first_series']
      await store.dispatch('UserPoints/GET_USER_POINTS', first_series.id);
    },
    computed: {
      getSeries(){
        return this.$store.getters['Series/series'];
      },
      getCurrentUserPoints(){
        return this.$store.getters['UserPoints/current_user_point'];
      },
      getUserPoints(){
        return this.$store.getters['UserPoints/users_points'];
      }
    },
    components: {
      Back: () => import('~/components/Back')
    },
    mounted() {
      this.getSeries.forEach(s => {
        this.dropdown_series.push({id: s.id, name: s.name});
      });
      this.defaultSelected = this.dropdown_series[0]
    },
    watch: {
      defaultSelected(val) {
        this.update_leaderboard(val)
      }
    },
    methods: {
      async update_leaderboard(val) {
        if(typeof(val) == "number"){
          await this.$store.dispatch('UserPoints/GET_USER_POINTS', val);  
        }
      }
    },
    data() {
      return {
        title: "LEADERBOARD",
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
