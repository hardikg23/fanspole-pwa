<template>
  <section>
    <v-toolbar color="primary">
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <div v-if="!loading">
      <div class="grad1">
        <div class="text-xs-center">
          <img :src="getImage" class="image">
          <div class="white--text font-weight-bold font12 pa-2">
            {{getTeamName}}
          </div>
        </div>
        <v-layout row wrap class="white--text">
          <v-flex xs6 pl-4>
            <div>Level</div>
            <div class="font-weight-bold font15">{{getCricketLevel.level}}</div>
          </v-flex>
          <v-flex xs6 pr-4 class="text-xs-right">
            <div>Level</div>
            <div class="font-weight-bold font15">{{getNextLevel.level}}</div>
          </v-flex>
          <v-flex xs12 pl-4 pr-4>
            <v-progress-linear height="4" v-model="valueDeterminate" color="white"></v-progress-linear>
          </v-flex>
        </v-layout>
      </div>

      <v-card md5 class='ma-2'>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="pa-1 font11">Statistics</div>
            <hr>
          </v-flex>
          <v-flex xs6 class="text-xs-center pa-3 borderb borderr">
            <div class="font-weight-bold font12">{{getStats.most_selected_captain}}</div>
            <div>Most Captain</div>
          </v-flex>
          <v-flex xs6 class="text-xs-center pa-3 borderb">
            <div class="font-weight-bold font12">{{getStats.total_teams}}</div>
            <div>Teams</div>
          </v-flex>
          <v-flex xs6 class="text-xs-center pa-3 borderr">
            <div class="font-weight-bold font12">{{getStats.total_winnings}}</div>
            <div>Winnings</div>
          </v-flex>
          <v-flex xs6 class="text-xs-center pa-3">
            <div class="font-weight-bold font12">{{getStats.total_leagues}}</div>
            <div>Leagues Joined</div>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card md5 class='ma-2'>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="pa-1 font11">Ranking</div>
            <hr>
          </v-flex>
          <v-flex xs6 class="text-xs-center" v-for="team in getUserPoints" :key="team.id">
            <div class="borderbox ma-1">
              <div class="font-weight-bold font11">{{team.rank == null ? '-' : "#"+team.rank}}</div>
              <div class="font11">{{team.total_score}} Pts</div>
              <div>{{team.series}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'MY PROFILE',
        loading: true
      }
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
      getImage() {
        return this.$store.getters['Me/image'];
      },
      getTeamName() {
        return this.$store.getters['Me/team_name'];
      },
      getCricketLevel() {
        return this.$store.getters['Me/cricket_level'];
      },
      getNextLevel() {
        return this.$store.getters['Me/next_level'];
      },
      getStats(){
        return this.$store.getters['Me/stats'];
      },
      getUserPoints(){
        return this.$store.getters['Me/user_points'];
      },
      valueDeterminate(){
        return ((this.getCricketLevel.xp_points-this.getCricketLevel.min_xp)/(this.getNextLevel.min_xp-this.getCricketLevel.min_xp))*100.0;
      }
    },
    created() {
      if (process.browser) {
        this.image = localStorage.getItem('me_image')
      }
      this.getApiGetProfile();
    },
    methods: {
      async getApiGetProfile(){
        await this.$store.dispatch('Me/GET_PROFILE');
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .grad1 {
    background-color: #1a237e;
    background-image: linear-gradient(to bottom, #1a237e , #000000);
  }
  .image{
    margin-top: 10px;
    width: 66px;
    border-radius: 50%; 
    border: 1px solid #fff;
  }
  .borderb{
    border-bottom: 1px solid #EEEEEE;
  }
  .borderr{
    border-right: 1px solid #EEEEEE;
  }
  .borderbox{
    border-radius: 3;
    border: 1px solid #EEEEEE;
  }
</style>