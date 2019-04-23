<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    
    <v-container grid-list-md text-xs-center px-3 py-2>
      <v-layout row wrap pa-2>
        <v-flex xs12 class="text-xs-center grey--text pa-2">
          Add cash to your account!
        </v-flex>
        <v-flex xs12 class="text-xs-left grey--text pa-2">
          Amount to add
        </v-flex>
        <v-flex xs12>
          <v-form lazy-validation ref="">
            <v-text-field
                solo
                v-model="amount"
                hide-details
                prepend-inner-icon="₹"
                name="amount"
                label="Amount"
                type="text"
                required
              />
          </v-form>
        </v-flex>
        <v-flex xs4 class="pa-0 mt-2">
          <v-btn @click="amountClick(100)" large class="pa-0 ma-0 primary--text" style="width:95%"><span class="font9">₹ 100</span></v-btn>
        </v-flex>
        <v-flex xs4 class="pa-0 mt-2">
          <v-btn @click="amountClick(200)" large class="pa-0 ma-0 primary--text" style="width:95%"><span class="font9">₹ 200</span></v-btn>
        </v-flex>
        <v-flex xs4 class="pa-0 mt-2">
          <v-btn @click="amountClick(500)" large class="pa-0 ma-0 primary--text" style="width:95%"><span class="font9">₹ 500</span></v-btn>
        </v-flex>
        <v-flex xs12 class="pa-0 mt-4">
          <v-btn @click="addCashClick()" large class="pa-0 ma-0  primary font-weight-bold" style="width:100%">Add Cash</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </section>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        title: 'ADD CASH',
        amount: 0
      }
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
    },
    mounted: function() {
      this.amount = this.$route.query.amount || 100;
    },
    methods: {
      amountClick(amount){
        this.amount = amount
      },
      addCashClick(){
        this.$router.push(`/add-cash/payment-options?amount=${this.amount}`);
      }
    }
  }
</script>