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
    <v-card md5 class='ma-3' v-for="credit in getUserCredits" :key="credit.id" v-if="!loading">
      <v-layout row ma-0 grey lighten-4>
        <v-flex xs6 class="pa-2">
          <DateTime :time="credit.created_at_in_millis" :format="2"></DateTime>
        </v-flex>
        <v-flex xs6 class="pa-2 text-xs-right">
          <div>{{credit.service_provider}}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap pa-2>
        <v-flex xs3>
          <div class='pa-2'>Amount:</div>
        </v-flex>
        <v-flex xs3>
          <div class="font15 font-weight-bold">&#8377;{{credit.amount == null ? '-' : credit.amount}}</div>
        </v-flex>
        <v-flex xs3>
          <div class='pa-2'>Bonus:</div>
        </v-flex>
        <v-flex xs3>
          <div class="font15 font-weight-bold">&#8377;{{credit.bonus}}</div>
        </v-flex>
      </v-layout>
      <v-layout row grey lighten-4 ma-0 class="font8 pa-1">
        <v-flex xs6>
          <div class="text-xs-left">
            txtid: {{credit.txnid}}
          </div>
        </v-flex>
        <v-flex xs6 mr-1>
          <div class="text-xs-left">
            order id: {{credit.order_id}}
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
        title: "ADD CASH HISTORY",
        loading: true
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      DateTime: () => import('~/components/DateTime')
    },
    computed: {
      getUserCredits(){
        return this.$store.getters['UserCredits/user_credits'];
      },
    },
    created: function() {
      this.getApiUserCredits();
    },
    methods: {
      async getApiUserCredits(){
        await this.$store.dispatch('UserCredits/GET_USER_CREDITS');
        this.loading = false
      }
    }
  }
</script>
