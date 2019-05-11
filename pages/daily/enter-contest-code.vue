<template>
  <section class="mb65">
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

    <div class="white py-4" v-if="!loading">
      <v-form
        ref="form"
        v-model="valid"
        method="post"
        >
        <div class="text-xs-center grey--text">If you have a contest invite code, enter it and join</div>
        <v-text-field
          class="pa-2"
          label="invite code"
          v-model="code"
          :rules="codeRules"
          outline
          type="text"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn style='padding: 0px 32px;' class="white green accent-4 white--text" :loading="formLoading" @click="handleSubmit()"><span class="fontw600">Join this Contest</span></v-btn>
        </div>
      </v-form>
    </div>

    <v-dialog v-model="joinLeagueDialog">
      <div v-if="getJoiningConfirmation != undefined">
        <v-card>
          <v-card-title class="headline primary white--text pa-2"><div class="font7 font-weight-bold text-uppercase">Confirmation</div></v-card-title>
          <v-layout row wrap pa-2>
            <v-flex xs12>
              <div class="font9">Unused + Winning Balance = &#8377;{{to_number_format(getJoiningConfirmation.current_balance)}}</div>
            </v-flex>
            <v-flex xs6 class="pa-3 borderb">
              <div class="font9">Entry Fees</div>
            </v-flex>
            <v-flex xs6 class="pa-3 text-xs-right borderb">
              <div class="">&#8377;{{to_number_format(getJoiningConfirmation.entry_fee)}}</div>
            </v-flex>
            <v-flex xs6 class="pl-3 pt-2">
              <div class="fontw600 green--text text--accent-4">To Pay</div>
            </v-flex>
            <v-flex xs6 class="pr-3 pt-2 text-xs-right">
              <div class="fontw600 green--text text--accent-4">&#8377;{{to_number_format(getJoiningConfirmation.entry_fee)}}</div>
            </v-flex>
            <v-flex xs12 v-show="getJoiningConfirmation.user_teams != undefined && getJoiningConfirmation.user_teams.length > 1">
              <v-layout row wrap pa-2>
                <v-flex xs12 class="pt-3">
                  <div class="fontw600">Select Team</div>
                </v-flex>
                <v-radio-group v-model="selected_team" row class="ma-1">
                  <v-flex xs6 v-for="team in getJoiningConfirmation.user_teams" :key="team.id" class="pa-1">
                    <v-radio :label="`Team ${team.team_no}`" :value="team.id" color="primary" :disabled="team.joined"></v-radio>
                  </v-flex>
                </v-radio-group>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="pa-3 font7 grey--text text-xs-center">
              By joining this contest, you accept Fanspole's T&amp;C and conﬁrm that you are not a resident of Assam, Odisha, Telangana, Nagaland or Sikkim.
            </v-flex>
            <v-flex xs12 class="text-xs-center">
              <v-btn 
                depressed
                v-on:click.stop="joinContestClick.call(this)"
                class='ma-0 white--text font-weight-bold font11' 
                color="green accent-4">
                JOIN CONTEST
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="joinLeagueDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'INVITE CODE',
        joinLeagueDialog: false,
        selected_team: null,
        paid_league: null,
        loading: true,
        valid: false,
        code: '',
        codeRules: [
          (v) => !!v || 'invite code is required',
          (v) => (v && v.length >= 8) || 'invite code is too short'
        ],
        formLoading: false,
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      },
      getAddAmount(){
        return this.$store.getters['PaidLeagues/add_funds_amount'];
      },
      getJoiningConfirmation() {
        return this.$store.getters['PaidLeagues/joining_confirmation'];
      },
      getSelectedTeam(){
        return this.$store.getters['PaidLeagues/selected_team'];
      }
    },
    mounted: function() {
      this.code = this.$route.query.code;
      this.loading = false
    },
    methods: {
      async handleSubmit() {
        if (this.$refs.form.validate()) {
          await this.$store
            .dispatch('PaidLeagues/GET_PAID_LEAGUE_FROM_INVITE_CODE', {code: this.code, fields: 'id,paid_leagueable_id'})
            .then((res) => {
              this.paid_league = res.paid_league
              this.handleJoiningConfirmation()
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
      },
      async handleJoiningConfirmation(res){
        await this.$store.dispatch('PaidLeagues/GET_JOINING_CONFIRMATION', {id: this.paid_league.paid_leagueable_id, league_id: this.paid_league.id});
        var joining_confirmation = this.$store.getters['PaidLeagues/joining_confirmation'];
        if(joining_confirmation != undefined){
          if(joining_confirmation.popup == "join_league"){
            this.joinLeagueDialog = true
            this.selected_team = this.getSelectedTeam;
          }else if(joining_confirmation.popup == "event_locked"){
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: joining_confirmation.error,
              button: false
            });
          }else if(joining_confirmation.popup == "add_funds"){
            this.$router.push(`/add-cash?amount=${this.getAddAmount}`);
          }else if(joining_confirmation.popup == "already_joined"){
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: joining_confirmation.error,
              button: false
            });
          }else if(joining_confirmation.popup == "create_team"){
            this.$router.push(`/matches/${this.paid_league.paid_leagueable_id}/create-team`);
          }
        }
      },
      async joinContestClick(){
        await this.$store.dispatch('PaidLeagues/JOIN_CONTEST', {id: this.paid_league.paid_leagueable_id, league_id: this.paid_league.id, team_id: this.selected_team, invite_code: this.code})
            .then((res) => {
              this.$router.push(`/matches/${this.paid_league.paid_leagueable_id}/my-joined-leagues`);
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
        this.joinLeagueDialog = false;
      },
      to_number_format(number){
        if(number != undefined){
          return number.toLocaleString('en-IN')
        }
      },
    }
  }
</script>

<style scoped>
</style>