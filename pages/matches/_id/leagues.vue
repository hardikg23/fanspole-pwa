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
          MI vs CSK
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <template class="blue-grey" v-for="league in getPaidLeagues.paid_leagues">
      <PaidLeagueCard :key="league.id" :league="league"></PaidLeagueCard>
    </template>

    <template>
      <div class="footer primary text-xs-center">
        <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
          <v-btn v-if="!getTeamCreated">create team</v-btn>
        </nuxt-link>
        <v-btn v-if="getTeamCreated">not create team</v-btn>
      </div>
    </template>

  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      await store.dispatch('PaidLeagues/GET_PAID_LEAGUES', params.id);
    },
    components: {
      PaidLeagueCard: () => import('~/components/PaidLeagueCard'),
      Back: () => import('~/components/Back'),
      Header: () => import('~/components/Header')
    },
    computed: {
      getTeamCreated() {
        return this.$store.getters['PaidLeagues/team_created'];
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