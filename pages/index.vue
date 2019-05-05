<template>
  <section>
    <div class="grad1">
      <v-layout row wrap pa-2 class="white--text">
        <v-flex xs12>
          <div class="text-xs-center pt-3">
            <div class="font-weight-bold display-1">FANSPOLE</div>
            <div class="font-weight-bold title pt-4 body-2">PLAY FANTASY CRICKET. WIN CASH DAILY!</div>
          </div>
          <div class="text-xs-center" style="padding-top:75px;">
            <nuxt-link to="/matches">
              <v-btn large style="width:96%" class='primary--text pa-0'>
                LET'S PLAY
              </v-btn>
            </nuxt-link>
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="pl-2 pt-2">
            <div>Have a Referral Code?</div>
            <div class="font-weight-bold">
              <nuxt-link :to="`${signup_path}`">Click here</nuxt-link>
            </div>      
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="text-xs-right pr-2 pt-2">
            <div>Already a user?</div>
            <div class="font-weight-bold">
              <nuxt-link :to="`${login_path}`">Log In</nuxt-link>
            </div>      
          </div>
        </v-flex>
      </v-layout>
    </div>

    <div class='mt-3'>
      <v-tabs grow centered hide-slider>
        <v-tab ripple :key="1">
          <div>Daily<br>Mode</div>
        </v-tab>
        <v-tab ripple :key="2">
          <div>Championship<br>Mode</div>
        </v-tab>
        <v-tab ripple :key="3">
          <div>Auction<br>Mode</div>
        </v-tab>
        <v-tab-item :key="1">
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <hr>
              <div class="text-xs-center font-weight-bold pa-3">
                HOW TO PLAY
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="white" v-for="play in daily_mode" :key="play.number">
            <v-flex xs2 class='text-xs-center font-weight-bold grey--text text--lighten-1'>
              <div class="font30">{{play.number}}</div>
            </v-flex>
            <v-flex xs10>
              <div class="pa-2">
                <div>{{play.title}}</div>
                <div class="grey--text text--lighten-1 font9 pt-1">{{play.desc}}</div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <nuxt-link to="/matches">
                <v-btn large style="width:96%" color='primary'>LET'S PLAY</v-btn>
              </nuxt-link>
            </v-flex>
          </v-layout>
        </v-tab-item>

        <v-tab-item :key="2">
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <hr>
              <div class="text-xs-center font-weight-bold pa-3">
                HOW TO PLAY
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="white" v-for="play in championship_mode" :key="play.number">
            <v-flex xs2 class='text-xs-center font-weight-bold grey--text text--lighten-1'>
              <div class="font30">{{play.number}}</div>
            </v-flex>
            <v-flex xs10>
              <div class="pa-2">
                <div>{{play.title}}</div>
                <div class="grey--text text--lighten-1 font9 pt-1">{{play.desc}}</div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <v-btn large style="width:96%" color='primary'>LET'S PLAY</v-btn>
            </v-flex>
          </v-layout>
        </v-tab-item>

        <v-tab-item :key="3">
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <hr>
              <div class="text-xs-center font-weight-bold pa-3">
                HOW TO PLAY
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="white" v-for="play in auction_mode" :key="play.number">
            <v-flex xs2 class='text-xs-center font-weight-bold grey--text text--lighten-1'>
              <div class="font30">{{play.number}}</div>
            </v-flex>
            <v-flex xs10>
              <div class="pa-2">
                <div>{{play.title}}</div>
                <div class="grey--text text--lighten-1 font9 pt-1">{{play.desc}}</div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap pa-2 class="white">
            <v-flex xs12>
              <v-btn large style="width:96%" color='primary'>LET'S PLAY</v-btn>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs>
    </div>

    <div class="pt-4">
      <div class="text-xs-center font-weight-bold">Get the Fanspole app for exclusive features</div>
      <div class="text-xs-center pa-2">
        <a href="https://www.fanspole.com/android-app">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0s4AayiLNri23FQy-3n4ynvJqiF1-rAWcbSAGjH96TvXe_Wls" style="width:65%;">  
        </a>
      </div>
    </div>

    <div class="grey darken-3">
      <v-layout row wrap pa-0 class="white--text">
        <v-flex xs12>
          <div class="text-xs-center pt-3">
            <div class="font-weight-bold display-1">FANSPOLE</div>
            <div class="pt-2">
              <a href="https://www.facebook.com/fanspole">
                <img src="https://img.icons8.com/material/48/000000/facebook.png" class="filter">
              </a>
              <a href="https://www.instagram.com/fanspole.fantasycricket/?hl=en">
                <img src="https://img.icons8.com/material/48/000000/instagram-new.png" class="filter">
              </a>
              <a href="https://twitter.com/fanspole">
                <img src="https://img.icons8.com/material/48/000000/twitter.png" class="filter">
              </a>
            </div>
          </div>
          <hr>
        </v-flex>
        <v-flex xs6 class="text-xs-center font-weight-bold" pt-4>
          <a href="https://www.fanspole.com/android-app"><div class="pa-2">Download App</div></a>
          <nuxt-link to="/daily/how-to-play"><div class="pa-2">How to Play</div></nuxt-link>
          <div class="pa-2">Refer & Earn</div>
          <nuxt-link to="/profile"><div class="pa-2">Account</div></nuxt-link>
          <hr>
        </v-flex>
        <v-flex xs6 class="text-xs-center font-weight-bold" pt-4>
          <nuxt-link to="/matches"><div class="pa-2">Home</div></nuxt-link>
          <nuxt-link to="/about-us"><div class="pa-2">About Us</div></nuxt-link>
          <nuxt-link to="/login"><div class="pa-2">Log In</div></nuxt-link>
          <nuxt-link to="/signup"><div class="pa-2">Sign Up</div></nuxt-link>
          <hr>
        </v-flex>
        <v-flex xs12 class="text-xs-center grey--text text--lighten-2 font7 pt-2">
          <div>Disclaimer</div>
          <div>All Images and Content used on Fanspole is either created or taken from open sources. If anyone has any objection or has rights related to site content, please contact us on admin@fanspole.com
The Company hereby states and confirms that the Service is not affiliated in any way to and claims no association, in any capacity whatsoever, with the (i) International Cricket Council ("ICC") or any national cricket board or team, (ii) Board of Control for Cricket in India ("BCCI"), the Indian Premier League ("IPL") or any IPL franchises, or (iii) any other domestic cricket tournament/league, or tournament franchise/team. (iv) any international cricket tournament/league or tournament franchise/team including Cricket Australia ("CA"), Big Bash League ("BBL") and others.
The Company acknowledges that the ICC, BCCI/IPL and its franchises, respective national cricket boards, domestic tournament organisers and franchises/teams/players, respectively, own all proprietary names and marks and image rights relating to the relevant tournament or competition.</div>
        <hr>
        </v-flex>

        <v-flex xs6 class="text-xs-center font-weight-bold grey darken-4">
          <nuxt-link to="/privacy-policy"><div class="py-4">Privacy Policy</div></nuxt-link>
        </v-flex>
        <v-flex xs6 class="text-xs-center font-weight-bold grey darken-4">
          <nuxt-link to="/terms-and-conditions"><div class="py-4">Terms & conditions</div></nuxt-link>
        </v-flex>

        <v-flex xs12 class="font8 pa-2 text-xs-center">
          <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"         title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"        title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </v-flex>
      </v-layout>
    </div>

  </section>
</template>

<script>
  import { HOME } from '~/constants/routes.js';
  import { LOGIN } from '~/constants/routes.js';
  import { SIGNUP } from '~/constants/routes.js';
  export default {
    data() {
      return {
        login_path: LOGIN,
        signup_path: SIGNUP,
        home_path: HOME,
        daily_mode: [
          {number: 1, title: "Select a Match", desc: "Select an upcoming match of your choice"},
          {number: 2, title: "Create your Fanspole Team", desc: "Use your sports knowledge to create a fantasy team using 100 credits"},
          {number: 3, title: "Join Free Contests", desc: "Participate in Cash or Practice Contests and go for glory!"}
        ],
        championship_mode: [
          {number: 1, title: "Create Your Team for Tournament", desc: "Select an upcoming Tournament and manage your team for entire Tournament"},
          {number: 2, title: "Paid and Free transfers", desc: "You will get Paid and Free transfers per match to manage your team"},
          {number: 3, title: "Win Tournament prizes", desc: "Be in top managers and get paid for your efforts"}
        ],
        auction_mode: [
          {number: 1, title: "Join/Create Tournament", desc: "Join or Create Tournament and bid for the players"},
          {number: 2, title: "Auction", desc: "Bid for a players you want in your team or release players from your team"},
          {number: 3, title: "Create best team", desc: "player can be in only one team so make most of your skills and create best team"}
        ]
      }
    },
    mounted() {
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.$router.push(this.home_path);
      }
    }
  }
</script>

<style scoped>
  .grad1 {
    background-color: #1a237e;
    background-image: linear-gradient(to bottom, #1a237e , #000000);
  }
  .filter{
    filter: invert(100%);
    width:36px;
  }
</style>