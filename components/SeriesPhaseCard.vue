<template>
  <v-container grid-list-md px-3 py-2>
    <v-card md5 class='pa-0 box_shadow_common'>
      <v-layout row wrap grey lighten-4 ma-0 @click="cardClick.call(this, phase)">
        <v-flex xs12 class='text-xs-left pa-2 font9'>
          {{phase.name}}
        </v-flex>
      </v-layout>
      <v-layout row wrap class='text-xs-center pa-1 font9' @click="cardClick.call(this, phase)">
        <v-flex xs3>
          <div>Score</div>
          <div class="font15 fontw600 pa-2">{{classic_team ? to_number_format(classic_team.score) : '-'}}</div>
        </v-flex>
        <v-flex xs3>
          <div>Rank</div>
          <div class="font15 fontw600 pa-2">{{classic_team ? (classic_team.rank ? to_number_format(classic_team.rank) : '-') : '-'}}</div>
        </v-flex>
        <v-flex xs3>
          <div>Credits</div>
          <div class="font15 fontw600 pa-2">{{classic_team ? to_number_format(classic_team.budget) : '-'}}</div>
        </v-flex>
        <v-flex xs3>
          <div>Subs</div>
          <div class="font15 fontw600 pa-2">
            <span class="red--text text--accent-4" v-html="classic_team ? classic_team.paid_transfers : '-'"></span>
            /
            <span class="green--text text--accent-4" v-html="classic_team ? classic_team.free_transfers : '-'"></span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap grey lighten-4 ma-0>
        <v-flex xs12 class='text-xs-center pa-2 text-uppercase font9 championship--text fontw600'>
          <div v-if="classic_team">
            <nuxt-link :to="`/championship/teams/${classic_team.id}`">team preview</nuxt-link>
          </div>
          <div v-else>
            <nuxt-link :to="`/championship/phases/${phase.id}/create-team`">team preview</nuxt-link>
          </div>
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
    data() {
      return {
        classic_team: null,
      }
    },
    mounted(){
      this.classic_team = this.phase.current_user_classic_team
    },
    methods: {
      cardClick(phase){
        if(phase.current_user_classic_team != undefined){
          this.$router.push(`/championship/phases/${phase.id}/edit-team/${phase.current_user_classic_team.id}`);
        }else{
          this.$router.push(`/championship/phases/${phase.id}/create-team`);
        }
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      }
    }
  }
</script>