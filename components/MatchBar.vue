<template>
  <v-layout row wrap>
    <v-flex xs6>
      <div class="text-xs-left fontw600 font9">
        <div>{{match.team1.name_attr}} vs {{match.team2.name_attr}}</div>
      </div>
    </v-flex>
    <v-flex xs6>
      <div class="text-xs-right">
        <div class="pr-2" v-if="locked(match.event_time_in_millis)">
          <div class="pr-2 red--text text-uppercase font9">{{match.match_status}}</div>
        </div>
        <div v-else class="pr-2 red--text font9 fontw600">
          <Countdown :date="match.event_time_in_millis/1000"></Countdown>
        </div>
      </div>
    </v-flex>
  </v-layout>
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
    Countdown: () => import('~/components/Countdown'),
  },
  methods: {
    locked(event_time){
      return event_time < new Date().getTime();
    }
  }
}
</script>

<style type="text/css" scoped>
</style>