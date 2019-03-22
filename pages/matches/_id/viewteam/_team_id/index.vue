<template>
  <section>
    <div :style="{ background: `url(${image}) no-repeat center center fixed`, 'background-size': '100% 100%', 'min-height': '100vh'}">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs6 class='text-xs-left grey darken-3 pa-2'>
          <nuxt-link :to="`/matches/${this.$route.params.id}/edit-team/${this.$route.params.team_id}`">
            <v-icon class='white--text'>edit</v-icon>
          </nuxt-link>
        </v-flex>
        <v-flex xs6 class='text-xs-right grey darken-3 white--text pa-2'>
          <nuxt-link :to="`/matches/${this.$route.params.id}/teams`">
            <v-icon class='white--text'>close</v-icon>
          </nuxt-link>
        </v-flex>
        <v-flex xs12 class="white--text font-weight-bold font22" style='opacity:0.4'>
          FANSPOLE
        </v-flex>
        <v-flex xs12 class='pt-5'>
          <template v-for="player in getUserTeam.row1">
            <TeamPlayer :key="player.id" :player="player"></TeamPlayer>
          </template>
        </v-flex>
        <v-flex xs12>
          <template v-for="player in getUserTeam.row2">
            <TeamPlayer :key="player.id" :player="player"></TeamPlayer>
          </template>
        </v-flex>
        <v-flex xs12>
          <template v-for="player in getUserTeam.row3">
            <TeamPlayer :key="player.id" :player="player"></TeamPlayer>
          </template>
        </v-flex>
        <v-flex xs12>
          <template v-for="player in getUserTeam.row4">
            <TeamPlayer :key="player.id" :player="player"></TeamPlayer>
          </template>
        </v-flex>
      </v-layout>
    </div>
  </section>
</template>

<script>
  import backgroundUrl from '~/assets/images/ground.png'
  export default {
    async asyncData({store, params}) {
      if (store.getters['UserTeams/user_team'](params.team_id) == undefined){
        await store.dispatch('UserTeams/GET_USER_TEAM', params);
      }
      await store.commit('UserTeams/SET_USER_TEAM_ROW', params.team_id);  
    },
    components: {
      TeamPlayer: () => import('~/components/TeamPlayer')
    },
    computed: {
      getUserTeam() {
        return this.$store.getters['UserTeams/user_team_row'];
      }
    },
    data() {
      return {
        image: backgroundUrl
      }
    }
  }
</script>