<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <v-dialog v-model="loading">
      <v-layout class="white">
        <v-flex xs12 class="text-xs-center pa-4">
          <v-progress-circular
            indeterminate
            :width="3"
            color="primary"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-dialog>

    <v-container grid-list-md pa-0>
      <v-layout row wrap>
        <v-flex xs12 class="white pt-3 pl-4">
          <div class="grey--text font8">Amount to be added:</div>
          <div class="font-weight-bold font11">&#8377; {{amount}}</div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-md pa-0 mt-3>
      <v-layout row wrap class="white fontw600 font9 cursor-p">
        <v-flex xs3 class="borderb pa-2 text-xs-center" @click="paymentOptionClicked('payumoney')">
          <v-icon>payment</v-icon>
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2" @click="paymentOptionClicked('payumoney')">
          <div>Debit/Credit card</div>
        </v-flex>
        <v-flex xs2 class="borderb pa-2" @click="paymentOptionClicked('payumoney')">
          <v-icon>navigate_next</v-icon>
        </v-flex>
        <v-flex xs3 class="borderb pa-2 text-xs-center" @click="paymentOptionClicked('paytm')">
          <img src="~/assets/images/payments/paytm.png" class="image">
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2" @click="paymentOptionClicked('paytm')">
          <div>Paytm</div>
        </v-flex>
        <v-flex xs2 class="borderb pa-2" @click="paymentOptionClicked('paytm')">
          <v-icon>navigate_next</v-icon>
        </v-flex>
        <v-flex xs3 class="borderb pa-2 text-xs-center" @click="paymentOptionClicked('payumoney')">
          <img src="~/assets/images/payments/pauymoney.gif" class="image">
        </v-flex>
        <v-flex xs7 class="font11 borderb pa-2" @click="paymentOptionClicked('payumoney')">
          <div>PayuMoney</div>
        </v-flex>
        <v-flex xs2 class="borderb pa-2" @click="paymentOptionClicked('payumoney')">
          <v-icon>navigate_next</v-icon>
        </v-flex>
      </v-layout>
    </v-container>

    <template>
      <div class="footer max-w-550 text-xs-center white">
        <img src="~/assets/images/payments/Type-2.jpg" class="box_shadow">
      </div>
    </template>


    <v-form id="user_credit_payu_form" :action="url" method="post" v-show="false"> 
      <v-text-field v-model="key" name="key"></v-text-field>
      <v-text-field v-model="hash" name="hash"></v-text-field>
      <v-text-field v-model="txnid" name="txnid"></v-text-field>
      <v-text-field v-model="enter_amount" name="amount"></v-text-field>
      <v-text-field v-model="email" name="email"></v-text-field>
      <v-text-field v-model="phone" name="phone"></v-text-field>
      <v-text-field v-model="firstname" name="firstname"></v-text-field>
      <v-text-field v-model="productinfo" name="productinfo"></v-text-field>
      <v-text-field v-model="udf1" name="udf1"></v-text-field>
      <v-text-field v-model="surl" name="surl"></v-text-field>
      <v-text-field v-model="furl" name="furl"></v-text-field>
      <v-text-field v-model="service_provider" name="service_provider"></v-text-field>
    </v-form>

    <v-form id="user_credit_paytm_form" :action="url" method="post" v-show="false"> 
      <v-text-field v-model="hash" name="CHECKSUMHASH"></v-text-field>
      <v-text-field v-model="request_type" name="REQUEST_TYPE"></v-text-field>
      <v-text-field v-model="mid" name="MID"></v-text-field>
      <v-text-field v-model="order_id" name="ORDER_ID"></v-text-field>
      <v-text-field v-model="cust_id" name="CUST_ID"></v-text-field>
      <v-text-field v-model="industry_type_id" name="INDUSTRY_TYPE_ID"></v-text-field>
      <v-text-field v-model="channel_id" name="CHANNEL_ID"></v-text-field>
      <v-text-field v-model="enter_amount" name="TXN_AMOUNT"></v-text-field>
      <v-text-field v-model="email" name="EMAIL"></v-text-field>
      <v-text-field v-model="phone" name="MOBILE_NO"></v-text-field>
      <v-text-field v-model="website" name="WEBSITE"></v-text-field>
      <v-text-field v-model="callback_url" name="CALLBACK_URL"></v-text-field>
    </v-form>

  </section>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        title: 'PAYMENT OPTIONS',
        amount: 0,
        loading: false,
        url: '',
        // common
        enter_amount: 0,
        email: '',
        phone: '',
        // pauymoney
        key: '',
        hash: '',
        txnid: '',
        firstname: '',
        productinfo: '',
        udf1: '',
        surl: '',
        furl: '',
        service_provider: '',
        // paytm
        request_type: '',
        mid: '',
        order_id: '',
        cust_id: '',
        industry_type_id: '',
        channel_id: '',
        website: '',
        callback_url: ''

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
      },
      async paymentOptionClicked(gateway){
        this.loading = true
        await this.$store
          .dispatch('UserCredits/CREATE_USER_CREDITS', {enter_amount: this.amount, gateway: gateway})
          .then((res) => {
            this.loading = false;
            if(res.user_credit.service_provider == "payu_paisa"){
              let payment_data = res.user_credit.payment_data
              this.url = payment_data.url
              this.key = payment_data.key
              this.hash = payment_data.hash
              this.txnid = payment_data.txnid
              this.enter_amount = payment_data.enter_amount
              this.email = payment_data.email
              this.phone = payment_data.phone
              this.firstname = payment_data.firstname
              this.productinfo = payment_data.productinfo
              this.udf1 = payment_data.udf1
              this.surl = payment_data.surl
              this.furl = payment_data.furl
              this.service_provider = payment_data.service_provider
              if (process.browser) {
                setTimeout(() => document.getElementById("user_credit_payu_form").submit(), 100);
              }
            }else if(res.user_credit.service_provider == "paytm"){
              let payment_data = res.user_credit.payment_data
              this.url = payment_data.url
              this.hash = payment_data.hash
              this.enter_amount = payment_data.txn_amount
              this.email = payment_data.email
              this.phone = payment_data.mobile
              this.request_type = payment_data.request_type
              this.mid = payment_data.mid
              this.order_id = payment_data.order_id
              this.cust_id = payment_data.cust_id
              this.industry_type_id = payment_data.industry_type_id
              this.channel_id = payment_data.channel_id
              this.website = payment_data.website
              this.callback_url = payment_data.callback_url
              if (process.browser) {
                setTimeout(() => document.getElementById("user_credit_paytm_form").submit(), 100);
              }
            }
          })
          .catch((error) => {
            this.showSnackBar = true;
            this.formLoading = false;
            this.$nuxt.$emit('snackbarError', {
              snackbar: this.showSnackBar,
              message: error.data.error,
              button: false
            });
          });
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