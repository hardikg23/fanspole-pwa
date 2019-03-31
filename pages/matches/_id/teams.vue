<template>
  <section>
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <v-layout row wrap v-if="!loading">
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
          </v-layout>
        </div>
      </v-toolbar-items>
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
      <div v-if="getUserTeams.length > 0"> 
        <template>
          <div style="padding-bottom: 100px;">
            <div v-for="team in getUserTeams">
              <UserTeamCard :key="team.id" :user_team="team"></UserTeamCard>  
            </div>
          </div>
        </template>
      </div>
      <div v-else class="mt-5 text-xs-center pa-5">
        No Teams
      </div>
    </div>

    <template>
      <div class="footer text-xs-center" v-if="getUserTeams.length < 4">
        <div class="primary">
          <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
            <v-btn style='padding: 0px 32px;'>create team {{getUserTeams.length + 1}}</v-btn>
          </nuxt-link>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'MY TEAMS',
        loading: true
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      UserTeamCard: () => import('~/components/UserTeamCard'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getUserTeams() {
        return this.$store.getters['UserTeams/user_teams'];
      }
    },
    created: function() {
      this.getApiUserTeams();
    },
    methods: {
      async getApiUserTeams(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        await this.$store.commit('UserTeams/RESET_USER_TEAMS');
        await this.$store.dispatch('UserTeams/GET_USER_TEAMS', this.$route.params.id);
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
  }
</style>