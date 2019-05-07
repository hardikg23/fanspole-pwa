<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
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
      await store.dispatch('Payment/UPDATE_PAYU_PAISA', {fields: 'id,amount,status,order_id,txnid', body: req.body})
          .catch((error) => {
            redirect('/add-cash')
          });
    }
  }
</script>
