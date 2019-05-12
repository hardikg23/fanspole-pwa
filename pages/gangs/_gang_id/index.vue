<template>
  <section class="mb65">
    <v-toolbar color="primary">
      <Back :showhome="true" />
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
      <GangCard :gang="getGang"></GangCard>
      <v-layout row wrap class="font8 pa-1 black font-weight-bold white--text">
        <v-flex xs7 class="text-xs-left pl-2">
          TEAM
        </v-flex>
        <v-flex xs3 class="text-xs-center pr-4">
          SCORE
        </v-flex>
        <v-flex xs2 class="text-xs-center pr-4">
          RANK
        </v-flex>
      </v-layout>
      <div>
        <v-layout row wrap v-for="team in getMembers" :key="team.id" class="borderb">
          <v-flex xs2 class="white pt-2 text-xs-center" style="height:56px;">
            <img :src="team.user.image" class="image imagec">
          </v-flex>
          <v-flex xs5 class="white pr-4 pt-3" style="height:56px;"> 
            <div class="fontw600 font9">{{team.user.team_name.substring(0, 18)}}</div>
          </v-flex>
          <v-flex xs3 class="white text-xs-center pr-4 pt-3" style="height:56px;">
            <span class="">{{to_number_format(team.score)}}</span>
          </v-flex>
          <v-flex xs2 class="white text-xs-center pr-4 pt-3" style="height:56px;">
            <div>#{{to_number_format(team.rank)}}</div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "GANG MEMBERS",
        loading: true,
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      GangCard: () => import('~/components/GangCard'),
    },
    computed: {
      getGang(){
        return this.$store.getters['Gangs/gang'];
      },
      getMembers(){
        return this.$store.getters['Gangs/members'](this.$route.params.gang_id);
      }
    },
    mounted: function() {
      this.getApiGangMembers();
    },
    methods: {
      async getApiGangMembers(){
        if (this.$store.getters['Gangs/members'](this.$route.params.gang_id).length == 0){
          await this.$store.dispatch('Gangs/GET_MEMBERS', {series_id: this.$route.query.series_id, gang_id: this.$route.params.gang_id, fields: 'id,name,league_motto,league_members_count,current_user_data,league_code,user{id,display_name}'});
        }
        this.loading = false
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
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