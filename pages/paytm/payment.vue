<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <div v-if="getUserCredit && getUserCredit.status == 'failure'">
      <v-card md5 ripple class="box_shadow_common ma-3" style="border: 2px solid #d50000;">
        <v-layout row wrap py-4 text-xs-center>
          <v-flex xs12 py-2>
            <v-icon style="font-size:2.4em;" class="red--text text--accent-4">account_balance</v-icon>
          </v-flex>
          <v-flex xs12 py-2 class="grey--text font9">
            Payment failed
          </v-flex>
          <v-flex xs12 py-2 class="red--text text--accent-4 fontw600">
            <nuxt-link to="/add-cash">TRY AGAIN</nuxt-link>
          </v-flex>
        </v-layout>  
      </v-card>
    </div>
    <div v-if="getUserCredit && getUserCredit.status == 'success'">
      <v-card md5 ripple class="box_shadow_common ma-3" style="border: 2px solid #00c853;">
        <v-layout row wrap py-4 text-xs-center>
          <v-flex xs12 py-2>
            <v-icon style="font-size:2.4em;" class="green--text text--accent-4">account_balance</v-icon>
          </v-flex>
          <v-flex xs12 py-2 class="grey--text">
            <div class="fontw600 font15 green--text text--accent-4">Amount: {{getUserCredit && getUserCredit.amount}}</div>
            <div>Payment successful</div>
            <div>Order Id: {{getUserCredit && getUserCredit.order_id}}</div>
            <div>TXn Id: {{getUserCredit && getUserCredit.txnid}}</div>
          </v-flex>
          <v-flex xs12 py-2 class="green--text text--accent-4 font12 fontw600">
            <nuxt-link to="/wallet">VIEW BALANCE</nuxt-link>
          </v-flex>
        </v-layout>  
      </v-card>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "PAYMENT STATUS",
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    },
    computed: {
      getUserCredit(){
        return this.$store.getters['Payment/user_credit'];
      }
    },
    async asyncData({store, req, params, redirect}) {
      await store.dispatch('Payment/UPDATE_PAYTM', {fields: 'id,amount,status,order_id,txnid', body: req.body})
          .catch((error) => {
            redirect('/add-cash')
          });
    }
  }
</script>
