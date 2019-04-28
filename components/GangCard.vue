<template>
  <v-container grid-list-md px-3 py-2>
    <v-card md5 class='pa-0 box_shadow_common' :to="`/championship/phases/${gang.phase_id}/gangs/${gang.id}`">
      <v-layout row wrap ma-0 grey lighten-4>
        <v-flex xs12 class='text-xs-left pa-2 font9'>
          <div class="fontw600 font11">{{gang.name}}</div>
          <div class="font9">{{gang.league_motto}}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap ma-0>
        <v-flex xs6 class="text-xs-center">
          <div>Manager</div>
          <div class="fontw600 pa-2">{{gang.user.display_name}}</div>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <div>Members</div>
          <div class="fontw600 pa-2">{{gang.league_members_count}}</div>
        </v-flex>
        <v-flex xs12 class="text-xs-center" v-if="gang.league_code != undefined">
          <div class="fontw600 pa-2">Code:  {{gang.league_code}}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script type="text/javascript">
  export default {
    props: {
      gang: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      }
    }
  }
</script>

<style scoped>
</style>