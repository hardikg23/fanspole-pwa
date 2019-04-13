<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <div v-if="!loading">
      <v-card class='ma-2'>
        <v-layout row wrap pa-2>
          <v-flex xs12 class="text-xs-center pb-3" style="border-bottom: 1px solid silver;">
            <div class="fontw600 grey--text">Total Balance</div>
            <div class="font-weight-bold font11">&#8377; {{getCurrentBalance}}</div>
            <nuxt-link to="/add-cash">
              <v-btn class='ma-0' small color="primary">Add Cash</v-btn>
            </nuxt-link>
          </v-flex>
          <v-flex xs6 class='pt-2 pb-2 font8' style="border-bottom: 1px solid silver;">
            <div class="font8">UNUSED</div>
            <div class="font12 fontw600">&#8377; {{getUnusedBalance}}</div>
          </v-flex>
          <v-flex xs6 class='pt-3 pr-3 text-xs-right' style="border-bottom: 1px solid silver;">
            <v-icon @click.stop="unusedBalanceDialog = true">info</v-icon>

            <v-dialog v-model="unusedBalanceDialog">
              <v-card>
                <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold">Unused Balance</div></v-card-title>
                <v-card-text>
                  Funds Used in Fanspole to enter leagues
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="unusedBalanceDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs6 class='pt-2 pb-2 font8'>
            <div class="font8">WINNINGS</div>
            <div class="font12 fontw600">&#8377; {{getWinningBalance}}</div>
            <div class="font8 red--text darken-4">verify account to withdraw your winnings</div>
          </v-flex>
          <v-flex xs4 class='pt-2 pb-2 text-xs-right'>
            <div v-if="getAccountApproved">
              <nuxt-link to="/wallet/redemptions">
                <v-btn small color="primary" class="pa-0 pl-2 pr-2">WITHDRAW</v-btn>
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link to="/wallet/verify-account">
                <v-btn small color="primary" class="pa-0 pl-2 pr-2">VERIFY ACCOUNT</v-btn>
              </nuxt-link>
            </div>
          </v-flex>
          <v-flex xs2 class='pt-3 pr-3 text-xs-right'>
            <v-icon @click.stop="winningBalanceDialog = true">info</v-icon>
            <v-dialog v-model="winningBalanceDialog">
              <v-card>
                <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold">Winning Balance</div></v-card-title>
                <v-card-text>
                  Funds Used in Fanspole to enter leagues or for Redemptions
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="winningBalanceDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <template>
      <div class="ma-2 box_shadow_common" v-if="loading">
        <vue-content-loading :width="400" :height="170" class="white">
          <rect x="100" y="13" rx="4" ry="4" width="40%" height="15" />
          <rect x="90" y="40" rx="4" ry="4" width="40%" height="8" />
          <rect x="100" y="60" rx="4" ry="4" width="40%" height="12" />
          <rect x="40" y="90" rx="4" ry="4" width="75%" height="20" />
          <rect x="40" y="120" rx="4" ry="4" width="75%" height="10" />
        </vue-content-loading>
      </div>
    </template>

    <nuxt-link to="/wallet/add-cash-history">
      <v-card class='ma-2'>
        <v-layout row wrap pa-2>
          <v-flex xs6 class="text-xs-left pa-1 font-weight-bold">
            Add Cash History
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-icon>chevron_right</v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </nuxt-link>
    <nuxt-link to="/wallet/redemption-history">
      <v-card class='ma-2'>
        <v-layout row wrap pa-2>
          <v-flex xs6 class="text-xs-left pa-1 font-weight-bold">
            Redemption History
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-icon>chevron_right</v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </nuxt-link>
  </section>
</template>

<script type="text/javascript">
  import { VueContentLoading } from 'vue-content-loading';
  export default {
    data() {
      return {
        title: 'MY BALANCE',
        loading: true,
        unusedBalanceDialog: false,
        winningBalanceDialog: false
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      VueContentLoading
    },
    computed: {
      getCurrentBalance(){
        return this.$store.getters['Me/current_balance'];
      },
      getUnusedBalance(){
        return this.$store.getters['Me/unused_balance'];
      },
      getWinningBalance(){
        return this.$store.getters['Me/winning_balance'];
      },
      getAccountApproved(){
        return this.$store.getters['Me/account_approved'];
      }
    },
    created: function() {
      this.getBalance();
    },
    methods: {
      async getBalance(){
        await this.$store.dispatch('Me/GET_BALANCE');
        this.loading = false
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>