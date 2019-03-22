<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    <v-card class='ma-2'>
      <v-layout row wrap pa-2>
        <v-flex xs12 class="text-xs-center pb-3" style="border-bottom: 1px solid silver;">
          <div class="fontw600 grey--text">Total Balance</div>
          <div class="font-weight-bold font11">&#8377; {{getCurrentBalance}}</div>
          <v-btn class='ma-0' small color="primary">Add Cash</v-btn>
        </v-flex>
        <v-flex xs6 class='pt-2 pb-2 font8' style="border-bottom: 1px solid silver;">
          <div>UNUSED</div>
          <div class="font12">&#8377; {{getUnusedBalance}}</div>
        </v-flex>
        <v-flex xs6 class='pt-3 pr-3 text-xs-right' style="border-bottom: 1px solid silver;">
          <v-icon @click.stop="unusedBalanceDialog = true">info</v-icon>
          <v-dialog v-model="unusedBalanceDialog">
            <v-card>
              <v-card-title class="headline pa-0 pl-2 pt-2">Unused Balance</v-card-title>
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
          <div>WINNINGS</div>
          <div class="font12">&#8377; {{getWinningBalance}}</div>
        </v-flex>
        <v-flex xs4 class='pt-2 pb-2 text-xs-right'>
          <v-btn small color="primary" class="pa-0 pl-2 pr-2">WITHDRAW</v-btn>
        </v-flex>
        <v-flex xs2 class='pt-3 pr-3 text-xs-right'>
          <v-icon @click.stop="winningBalanceDialog = true">info</v-icon>
          <v-dialog v-model="winningBalanceDialog">
            <v-card>
              <v-card-title class="headline pa-0 pl-2 pt-2">Winning Balance</v-card-title>
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
  </section>
</template>

<script type="text/javascript">
  export default {
    async asyncData({store, params}) {
      await store.dispatch('Me/GET_BALANCE');
    },
    components: {
      Back: () => import('~/components/Back')
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
      }
    },
    data() {
      return {
        title: 'MY BALANCE',
        unusedBalanceDialog: false,
        winningBalanceDialog: false
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>