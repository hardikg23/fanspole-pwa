<template>
  <v-container grid-list-md text-xs-center>
    <nuxt-link :to="`/matches/${match.id}/leagues`">
      <v-card md5 class='gradient_28499'>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card-text class="px-0">
              <div>
                <img :alt="match.team1.flag_photo" v-bind:src="match.team1.flag_photo" style="width:42px;height: 42px;" class="round_image box_shadow">
              </div>
              <div class="font-weight-bold">
                {{match.team1.name_attr}}
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="px-0">
              <div class="accent--text caption">
                {{match.series.name}}  
              </div>
              <div class="pa-2 fontw500" color='primary'>
                <Countdown :date="match.event_time/1000"></Countdown>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="px-0">
              <div>
                <img :alt="match.team1.flag_photo" v-bind:src="match.team2.flag_photo" style="width: 42px;height:42px;" class="round_image box_shadow">
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
    }
  }
</script>

<style scoped>
  .container{
    padding: 8px;
  }
  .gradient_28499 {
    background: linear-gradient(228deg, white 49%, #f4f4f4 49%);
  }
  .box_shadow{
    border-radius: 50%;
    -webkit-box-shadow: 0 0 2px 1px #000;
    box-shadow: 0 0 2px 1px #000;
  }
</style>