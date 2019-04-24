<template>
  <v-container grid-list-md px-3 py-2>
    <v-card md5 class='pa-0 box_shadow_common'>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs6 class='text-xs-left pa-2 font9'>
          Match {{team.match.match_no}} ({{team.match.match_stage}})
        </v-flex>
        <v-flex xs6 class='text-xs-right pa-2 font9'>
          {{team.match.team1.name_attr}} vs {{team.match.team2.name_attr}}
        </v-flex>
      </v-layout>
      <v-layout row wrap class='text-xs-center pa-1 font9'>
        <v-flex xs6>
          <div>Score</div>
          <div class="font15 fontw600 pa-2">{{to_number_format(team.score)}}</div>
        </v-flex>
        <v-flex xs3>
          <div>Subs</div>
          <div class="font15 fontw600 pa-2">
            <span class="red--text text--accent-4">{{team.paid_sub_used}}</span>
            /
            <span class="green--text text--accent-4">{{team.free_sub_used}}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs12 class='text-xs-center pa-2 text-uppercase font9 championship--text fontw600'>
          <div>
            <nuxt-link :to="`/championship/`">score</nuxt-link>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script type="text/javascript">
  export default {
    props: {
      team: {
        type: Object,
        required: true
      }
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
  .container{
    padding: 8px;
  }
  .box_shadow{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 2px 1px #000;
    box-shadow: 0 0 2px 1px #000;
  }
</style>