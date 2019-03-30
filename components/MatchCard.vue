<template>
  <v-container grid-list-md text-xs-center>
    <nuxt-link :to="`${get_path(match)}`">
      <v-card md5 raised ripple>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card-text class="px-0">
              <div>
                <img :alt="match.team1.flag_photo" v-bind:src="match.team1.flag_photo" class="round_image box_shadow">
              </div>
              <div class="font-weight-bold">
                {{match.team1.name_attr}}
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="px-0">
              <div class="accent--text font8">
                {{match.series.name}}  
              </div>
              <div class="pa-2 font-weight-bold font8 primary--text">
                <div v-if="!locked(match.event_time_in_millis)">
                  <Countdown :date="match.event_time_in_millis/1000"></Countdown>
                </div>
                <div v-else>
                  <div class="red--text text-uppercase">{{match.match_status}}</div>
                </div>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
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
      Countdown: () => import('~/components/Countdown')
    },
    methods: {
      locked(event_time){
        return event_time < new Date().getTime();
      },
      get_path(match){
        if(this.locked(match.event_time_in_millis)){
          return `/matches/${match.id}/my-joined-leagues`;
        }else{
          return `/matches/${match.id}/leagues`;
        }
      }
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