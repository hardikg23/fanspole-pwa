<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    
    <v-container grid-list-md pa-0>
      <v-layout row wrap>
        <v-flex xs12 class="white pt-3 pl-4">
          <div class="grey--text font8">Amount to be added:</div>
          <div class="font-weight-bold font11">&#8377; {{amount}}</div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-md pa-0 mt-3>
      <v-layout row wrap class="white fontw600 font9" v-ripple>
        <v-flex xs3 class="borderb pa-2 text-xs-center">
          <v-icon>payment</v-icon>
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2">
          Debit/Credit card
        </v-flex>
        <v-flex xs2 class="borderb pa-2">
          <v-icon>navigate_next</v-icon>
        </v-flex>
        <v-flex xs3 class="borderb pa-2 text-xs-center">
          <img src="~/assets/images/payments/paytm.png" class="image">
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2">
          Paytm
        </v-flex>
        <v-flex xs2 class="borderb pa-2">
          <v-icon>navigate_next</v-icon>
        </v-flex>
        <v-flex xs3 class="borderb pa-2 text-xs-center">
          <img src="~/assets/images/payments/pauymoney.gif" class="image">
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2">
          PayuMoney
        </v-flex>
        <v-flex xs2 class="borderb pa-2">
          <v-icon>navigate_next</v-icon>
        </v-flex>
      </v-layout>
    </v-container>

    <template>
      <div class="footer text-xs-center white">
        <img src="~/assets/images/payments/Type-2.jpg" class="box_shadow">
      </div>
    </template>

  </section>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        title: 'PAYMENT OPTIONS',
        amount: 0
      }
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
    },
    created: function() {
      this.amount = this.$route.query.amount || 100;
    },
    methods: {
      amountClick(amount){
        this.amount = amount
      }
    }
  }
</script>

<style type="text/css" scoped>
  .image{
    width: 55px;
  }
  .box_shadow{
    width:100%;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>