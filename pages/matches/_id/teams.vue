<template>
  <section>
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <div v-if="!loading">
            <MatchBar :match="getMatch"></MatchBar>
          </div>
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
      <div class="footer text-xs-center max-w-550" v-if="getUserTeams.length < 4">
        <div class="primary">
          <v-layout row wrap>
            <v-flex xs6 style="border-right: 1px solid #E0E0E0" class="white--text fontw600 text-uppercase pa-3">
              <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
                <div>create team {{getUserTeams.length + 1}}</div>
              </nuxt-link>
            </v-flex>
            <v-flex xs6 class="white--text fontw600 text-uppercase pa-3">
              <nuxt-link :to="`/matches/${this.$route.params.id}/leagues`">
                <div>join Contests</div>
              </nuxt-link>
            </v-flex>
          </v-layout>
        </div>
      </div>
      <div class="footer text-xs-center max-w-550" v-else>
        <div class="primary">
          <v-layout row wrap>
            <v-flex xs12 class="white--text fontw600 text-uppercase pa-3">
              <nuxt-link :to="`/matches/${this.$route.params.id}/leagues`">
                <div>join Contests</div>
              </nuxt-link>
            </v-flex>
          </v-layout>
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
      MatchBar: () => import('~/components/MatchBar')
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getUserTeams() {
        return this.$store.getters['UserTeams/user_teams'];
      }
    },
    mounted: function() {
      this.getApiUserTeams();
    },
    methods: {
      async getApiUserTeams(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        var match = this.$store.getters['Matches/match'](this.$route.params.id);
        if(this.locked(match.event_time_in_millis)){
          this.$router.push(`/matches/${this.$route.params.id}/my-joined-leagues`);
        }else{
          await this.$store.commit('UserTeams/RESET_USER_TEAMS');
          await this.$store.dispatch('UserTeams/GET_USER_TEAMS', this.$route.params.id);
        }
        this.loading = false
      },
      locked(event_time){
        return event_time < new Date().getTime();
      },
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