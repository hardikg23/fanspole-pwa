<template>
  <v-container grid-list-md text-xs-center>
    <nuxt-link :to="`/matches/${match.id}/leagues`">
      <v-card md5>
        <v-layout row ma-0 grey lighten-4>
          <v-flex xs6 class="text-xs-left pa-2">
            Match {{match.match_no}} - {{match.match_stage}}
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-card-text class="px-0">
              <div>
                <img :alt="match.team1.flag_photo" v-bind:src="match.team1.flag_photo" class="round_image box_shadow">
              </div>
              <div class="font-weight-bold">
                {{match.team1.name_attr}}
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="px-0">
              <div class="accent--text font8">
                {{match.series.name}}  
              </div>
              <div class="pa-2 font-weight-bold font8 primary--text">
                <DateTime :time="match.event_time_in_millis" :format="2"></DateTime>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="px-0">
              <div>
                <img :alt="match.team1.flag_photo" v-bind:src="match.team2.flag_photo" class="round_image box_shadow">
              </div>
              <div class="font-weight-bold">
                {{match.team2.name_attr}}
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="text-xs-center accent--text pb-2 font8">
            {{match.ground.name}}, {{match.ground.location}}, {{match.ground.country}}
          </v-flex>
        </v-layout>
      </v-card>
    </nuxt-link>
  </v-container>
</template>


<script type="text/javascript">
  export default {
    props: {
      match: {
        type: Object,
        required: true
      }
    },
    components: { 
      DateTime: () => import('~/components/DateTime')
    }
  }
</script>

<style scoped>
  .container{
    padding: 8px;
  }
  .box_shadow{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 2px 1px #000;
    box-shadow: 0 0 2px 1px #000;
  }
</style>