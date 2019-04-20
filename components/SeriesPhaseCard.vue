<template>
  <v-container grid-list-md px-3 py-2>
    <v-card md5 class='pa-0 box_shadow_common'>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs12 class='text-xs-left pa-2 font9'>
          {{phase.name}}
        </v-flex>
      </v-layout>
      <v-layout row wrap class='text-xs-center pa-1 font9'>
        <v-flex xs3>
          <div>Score</div>
          <div class="font15 fontw600 pa-2">1,222</div>
        </v-flex>
        <v-flex xs3>
          <div>Rank</div>
          <div class="font15 fontw600 pa-2">230</div>
        </v-flex>
        <v-flex xs3>
          <div>Paid Subs</div>
          <div class="font15 fontw600 pa-2 red--text text--accent-4">0</div>
        </v-flex>
        <v-flex xs3>
          <div>Free Subs</div>
          <div class="font15 fontw600 pa-2 green--text text--accent-4">2</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs12 class='text-xs-center pa-2 text-uppercase font9 championship--text fontw600'>
          team preview
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script type="text/javascript">
  export default {
    props: {
      phase: {
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