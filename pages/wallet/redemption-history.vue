<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-card md5 class='ma-2' v-for="redemption in getRedemptions" :key="redemption.id" v-if="!loading">
      <v-layout row ma-0  v-bind:class="{'grey lighter-2': redemption.status == 'pending', 'green accent-4 white--text': redemption.status == 'approved', 'red accent-4 white--text': redemption.status == 'rejected'}">
        <v-flex xs6 class="pa-2">
          <DateTime :time="redemption.created_at_in_millis"></DateTime>
        </v-flex>
        <v-flex xs6 class="pa-2 text-xs-right">
          <div>{{redemption.status}}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap pa-2>
        <v-flex xs3>
          <div class='pa-2'>Amount:</div>
        </v-flex>
        <v-flex xs9>
          <div class="font15 font-weight-bold">&#8377;{{redemption.amount}}</div>
        </v-flex>
      </v-layout>
      <v-layout row grey lighten-4 ma-0 class="font8 pa-1">
        <v-flex xs6>
          <div class="text-xs-left">
            {{redemption.redemption_type.name}}
          </div>
        </v-flex>
        <v-flex xs6 mr-1>
          <div class="text-xs-left">
            {{redemption.mobile_no}}
          </div>
        </v-flex>
      </v-layout>
    </v-card>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "REDEMPTIONS HISTORY",
        loading: true
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      DateTime: () => import('~/components/DateTime')
    },
    computed: {
      getRedemptions(){
        return this.$store.getters['Redemptions/redemptions'];
      },
    },
    created: function() {
      this.getApiRedemptions();
    },
    methods: {
      async getApiRedemptions(){
        await this.$store.dispatch('Redemptions/GET_REDEMPTIONS');
        this.loading = false
      }
    }
  }
</script>
