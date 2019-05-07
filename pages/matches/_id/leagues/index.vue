<template>
  <section class="mb65">
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <div v-if="!loading">
            <MatchBar :match="getMatch"></MatchBar>
          </div>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <template>
      <div v-if="loading">
        <v-card v-for="n in 6" :key="n" class="box_shadow_common ma-3">
          <vue-content-loading :width="400" :height="140" class="white">
            <rect x="20" y="20" rx="4" ry="4" width="20%" height="35" />
            <rect x="300" y="20" rx="4" ry="4" width="20%" height="35" />
            <rect x="20" y="70" rx="4" ry="4" width="90%" height="10" />
            <rect x="20" y="85" rx="4" ry="4" width="90%" height="5" />
            <rect x="20" y="115" rx="4" ry="4" width="25%" height="12" />
            <rect x="280" y="115" rx="4" ry="4" width="25%" height="12" />
          </vue-content-loading>
        </v-card>
      </div>
    </template>

    <div class="mb-2 box_shadow_common">
      <v-layout row wrap class="font8">
        <v-flex xs12 class="pa-2 borderb">
          All Contests
        </v-flex>
        <v-flex xs4 class="borderb font9 pa-1 text-xs-center white" @click="sortClick(1)">
          <div v-bind:class="{'grey--text': order_by != 1}">
            Prize Pool
            <span v-if="order_by == 1">
              <v-icon v-if="order_desc" style="font-size:1.3em;" class="red--text text--accent-4">arrow_downward</v-icon>
              <v-icon v-else style="font-size:1.3em;" class="red--text text--accent-4">arrow_upward</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex xs4 class="borderb font9 pa-1 text-xs-center white" @click="sortClick(2)">
          <div v-bind:class="{'grey--text': this.order_by != 2}">
            Spots
            <span v-if="order_by == 2">
              <v-icon v-if="order_desc" style="font-size:1.3em;" class="red--text text--accent-4">arrow_downward</v-icon>
              <v-icon v-else style="font-size:1.3em;" class="red--text text--accent-4">arrow_upward</v-icon>
            </span>
          </div>
        </v-flex>
        <v-flex xs4 class="borderb font9 pa-1 text-xs-center white" @click="sortClick(3)">
          <div v-bind:class="{'grey--text': this.order_by != 3}">
            Entry Fee
            <span v-if="order_by == 3">
              <v-icon v-if="order_desc" style="font-size:1.3em;" class="red--text text--accent-4">arrow_downward</v-icon>
              <v-icon v-else style="font-size:1.3em;" class="red--text text--accent-4">arrow_upward</v-icon>
            </span>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <template v-for="league in getPaidLeagues" v-if="!loading">
      <PaidLeagueCard :key="league.id" :league="league"></PaidLeagueCard>
    </template>

    <template>
      <div class="footer text-xs-center" style="max-width: 550px;">
        <div v-if="getTeamsCount == 0" class="primary">
          <nuxt-link :to="`/matches/${this.$route.params.id}/create-team`">
            <v-btn style='padding: 0px 32px;' class="white">create team</v-btn>
          </nuxt-link>
        </div>
        <div v-else class="white box_shadow_common">
          <v-layout row wrap pa-2 class="font8">
            <v-flex xs6 style="border-right: 1px solid #E0E0E0">
              <nuxt-link :to="`/matches/${this.$route.params.id}/teams`">
                <span class="primary white--text font12" style="border-radius: 50%;padding:2px 12px;">{{getTeamsCount}}</span>
                <div>MY TEAMS</div>
              </nuxt-link>
            </v-flex>
            <v-flex xs6>
              <nuxt-link :to="`/matches/${this.$route.params.id}/my-joined-leagues`">
                <span v-bind:class="{ 'primary': getJoinLeaguesCount > 0, 'grey': getJoinLeaguesCount == 0 }" class="white--text font12" style="border-radius: 50%;padding:2px 12px;">
                  {{getJoinLeaguesCount}}
                </span>
                <div>JOINED CONTESTS</div>
              </nuxt-link>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: 'CONTESTS',
        loading: true,
        order_by: 1,
        order_desc: true
      }
    },
    components: {
      PaidLeagueCard: () => import('~/components/PaidLeagueCard'),
      Back: () => import('~/components/Back'),
      MatchBar: () => import('~/components/MatchBar'),
      VueContentLoading
    },
    computed: {
      getTeamsCount() {
        return this.$store.getters['PaidLeagues/teams_count'];
      },
      getJoinLeaguesCount() {
        return this.$store.getters['PaidLeagues/join_paid_leagues_count'];
      },
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getPaidLeagues() {
        return this.$store.getters['PaidLeagues/paid_leagues'];
      }
    },
    mounted: function() {
      this.getApiPaidLeagues();
    },
    methods: {
      async getApiPaidLeagues(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        await this.$store.commit('PaidLeagues/RESET_PAID_LEAGUES');
        await this.$store.dispatch('PaidLeagues/GET_PAID_LEAGUES', this.$route.params.id);
        this.loading = false
      },
      sortClick(id){
        if(this.order_by == id){
          this.order_desc = !this.order_desc
        }else{
          this.order_by = id
        }
        this.$store.commit('PaidLeagues/SORT_PAID_LEAGUES', {id: this.order_by, desc: this.order_desc});
      }
    }
  }
</script>

<style scoped>
  .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
  }
  .box_shadow{
    border-radius: 1px;
    -webkit-box-shadow: 0 0 1px 1px #000;
    box-shadow: 0 0 1px 1px #000;
  }
</style>