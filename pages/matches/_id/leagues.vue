<template>
  <section class="mb65">
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
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
          </v-layout>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <template class="blue-grey" v-for="league in getPaidLeagues">
      <PaidLeagueCard :key="league.id" :league="league"></PaidLeagueCard>
    </template>

    <template>
      <div class="footer text-xs-center" style="max-width: 550px;">
        <div v-if="getTeamsCount == 0" class="primary">
          <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
            <v-btn style='padding: 0px 32px;' class="white">create team</v-btn>
          </nuxt-link>
        </div>
        <div v-else class="white box_shadow_common">
          <v-layout row wrap pa-2 class="font8">
            <v-flex xs6 style="border-right: 1px solid #E0E0E0">
              <nuxt-link :to="`/matches/${this.$route.params.id}/teams`">
                <span class="primary white--text font12" style="border-radius: 50%;padding:2px 12px;">{{getTeamsCount}}</span>
                <div>MY TEAMS</div>
              </nuxt-link>
            </v-flex>
            <v-flex xs6>
              <span v-bind:class="{ 'primary': getJoinLeaguesCount > 0, 'grey': getJoinLeaguesCount == 0 }" class="white--text font12" style="border-radius: 50%;padding:2px 12px;">
                {{getJoinLeaguesCount}}
              </span>
              <div>JOINED CONTESTS</div>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      if (store.getters['Matches/match'](params.id) == undefined){
        await store.dispatch('Matches/GET_MATCH', params.id);  
      }
      await store.commit('PaidLeagues/RESET_PAID_LEAGUES');
      await store.dispatch('PaidLeagues/GET_PAID_LEAGUES', params.id);
    },
    components: {
      PaidLeagueCard: () => import('~/components/PaidLeagueCard'),
      Back: () => import('~/components/Back'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getTeamsCount() {
        return this.$store.getters['PaidLeagues/teams_count'];
      },
      getJoinLeaguesCount() {
        return this.$store.getters['PaidLeagues/join_paid_leagues_count'];
      },
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getPaidLeagues() {
        return this.$store.getters['PaidLeagues/paid_leagues'];
      }
    },
    data() {
      return {
        title: 'CONTESTS'
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
  .box_shadow{
    border-radius: 1px;
    -webkit-box-shadow: 0 0 1px 1px #000;
    box-shadow: 0 0 1px 1px #000;
  }
</style>