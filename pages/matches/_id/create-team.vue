<template>
  <section>
    <v-toolbar extended color="primary" extension-height='40'>
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          
          <v-layout row wrap>
            <v-flex xs6>
              <div class="text-xs-left">
                <div>{{getMatch.team1.name_attr}} vs {{getMatch.team2.name_attr}}</div>
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="text-xs-right">
                <div class="pr-2"><Countdown :date="getMatch.event_time/1000"></Countdown></div>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-toolbar-items>
    </v-toolbar>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      let index = store.getters['Matches/matches'].matches.findIndex((match) => {
        return match.id == params.id;
      });
      if (index == -1){  
        await store.dispatch('Matches/GET_MATCH', params.id);  
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      Countdown: () => import('~/components/Countdown'),
    },
    computed: {
      getMatch() {
        let match = this.$store.getters['Matches/matches'].matches.find((match) => {
          if(match.id == this.$route.params.id){
            return match;
          }
        });
        return match;
      }
    },
    data() {
      return {
        title: 'CREATE TEAM'
      }
    }
  }
</script>

<style scoped>
</style>