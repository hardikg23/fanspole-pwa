<template>
  <section>
    <v-toolbar extended color="primary" extension-height='40'>
      <Back/>
      <v-btn
        icon
        flat
        color="white"
        :to="`/`">
        <v-icon>home</v-icon>
      </v-btn>
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
                <div class="pr-2"><Countdown :date="getMatch.event_time/1000"></Countdown></div>
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
      <div class="footer primary text-xs-center">
        <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
          <v-btn v-if="!getTeamCreated" style='padding: 0px 32px;'>create team</v-btn>
        </nuxt-link>
        <v-btn v-if="getTeamCreated">not create team</v-btn>
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
      await store.commit('PaidLeagues/RESET_PAID_LEAGUES');
      await store.dispatch('PaidLeagues/GET_PAID_LEAGUES', params.id);
    },
    components: {
      PaidLeagueCard: () => import('~/components/PaidLeagueCard'),
      Back: () => import('~/components/Back'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getTeamCreated() {
        return this.$store.getters['PaidLeagues/team_created'];
      },
      getMatch() {
        return this.$store.getters['Matches/daily_match'](this.$route.params.id);
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