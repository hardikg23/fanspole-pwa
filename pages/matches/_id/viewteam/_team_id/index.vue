<template>
  <section>
    <div :style="{ background: `url(${image}) no-repeat center center fixed`, 'background-size': '100% 100%', 'min-height': '100vh'}">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs6 class='text-xs-left grey darken-3 pa-2'>
          <v-icon class='white--text'>edit</v-icon>
        </v-flex>
        <v-flex xs6 class='text-xs-right grey darken-3 white--text pa-2'>
          <a :href="`/matches/${this.$route.params.id}/teams`">
            <v-icon class='white--text'>close</v-icon>
          </a>
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
    },
    components: {
      TeamPlayer: () => import('~/components/TeamPlayer')
    },
    computed: {
      getUserTeam() {
        let team_players = this.$store.getters['UserTeams/user_team'](this.$route.params.team_id);
        if(team_players != undefined){
          let wk = team_players.team_players.find((player) => {
            if(player.style == 5 || player.style == 7){
              return player;
            }
          });
          let other_players = team_players.team_players.filter((player) => {
            if(player.id != wk.id){
              return player;
            }
          });
          let row1 = [wk];
          let row2 = other_players.slice(0, 4);
          let row3 = other_players.slice(4, 6);
          let row4 = other_players.slice(6, 10);
          return {row1: row1, row2: row2, row3: row3, row4: row4}
        }
      }
    },
    data() {
      return {
        image: backgroundUrl
      }
    }
  }
</script>