<template>
  <v-container grid-list-md px-3 py-2>
    <nuxt-link :to="`/matches/${this.$route.params.id}/viewteam/${user_team.id}`">
      <v-card md5 class='pa-0 box_shadow_common'>
        <v-layout row wrap grey lighten-4 ma-0>
          <v-flex xs6 class='text-xs-left pa-2'>
            Team {{user_team.team_no}}
          </v-flex>
          <v-flex xs6 class='text-xs-right pa-2'>
            <div v-if="user_team.is_current_user_allowed_to_edit">
              <nuxt-link :to="`/matches/${this.$route.params.id}/edit-team/${user_team.id}`">
                <v-icon>edit</v-icon>
              </nuxt-link>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap class='text-xs-center pa-1'>
          <v-flex xs4>
            <div>Score</div>
            <div class="font22 fontw600">{{user_team.score}}</div>
          </v-flex>
          <v-flex xs4>
            Rank
            <div class="font22 fontw600">{{user_team.rank ? user_team.rank : '-'}}</div>
          </v-flex>
          <v-flex xs4>
            Budget
            <div class="font22 fontw600">{{user_team.budget}}</div>
          </v-flex>
          <v-flex xs12 class='text-xs-right pa-1'>
            last updated at: <span><DateTime :time="user_team.last_updated_at_in_millis"></DateTime></span>
          </v-flex>
        </v-layout>
        <v-layout row wrap grey lighten-4 ma-0>
          <v-flex xs12 class='text-xs-center pa-2'>
            Captain: <span class="font12 fontw600">{{user_team.captain.name}}</span>
          </v-flex>
        </v-layout>
      </v-card>
    </nuxt-link>
  </v-container>
</template>

<script type="text/javascript">
  export default {
    props: {
      user_team: {
        type: Object,
        required: true
      }
    },
    components: {
      DateTime: () => import('~/components/DateTime'),
    }
  }
</script>