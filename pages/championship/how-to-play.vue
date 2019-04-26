<template>
  <section>
    <v-toolbar color="championship">
      <BackChampionship :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <div>
      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>About Championship</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div>
                    &nbsp;&nbsp;&nbsp;Welcome to Fanspole Championship mode (Yes, it's back!)
                </div>
                <br>
                <div>
                    &nbsp;&nbsp;&nbsp;Championship on Fanspole gives you a chance to be owner of a classic team for the entire season. Where you will be given 2 free transfers and 2 paid transfers for every match. 
                </div>
                <br>
                <div>
                  <ul>
                    <li>Now be the owner of a team for the entire series or a phase.</li>
                    <li>Long Series can be divided into multiple phases. Whichever phase you play, championship mode is about intense battle to score the maximum using your team.</li>
                    <li>You can change your team before each match to have the nessesary players for the upcoming match. This change is governed by transfer rules.</li>
                    <li>Each match after your first match, you will get 2 transfers per match.</li>
                    <li>You can purchase 2 more transfers per match. Paid transfer cost are: 1st transfers will cost 15 Rs and 2nd transfers will cost 25 Rs</li>
                    <li>And there is more, Dynamic Prizing! Yes the winner of this intense battle gets cash prize in his winnings wallet. The prize is determined by the intensity of the contest. </li>
                  </ul>
                </div>
                <br>
                <div>
                  &nbsp;&nbsp;&nbsp;Let the games begin!
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Transfers</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <ul>
                  <li>Championship mode is all about managing a single team throughout the tournament, it is important that you keep your team updated with latest team changes. This is where transfers come into play.</li>
                  <li>You can change your players before the start of any match lock time. The number of transfers you have will be reflected on the series team page but these are the transfer rules</li>
                  <li>
                    <b>First Match:</b>
                    <br>
                    &nbsp;&nbsp;&nbsp;Before the start of your first match (the first time you create a team in championship mode) you will be allowed to do unlimited transfers. </li>
                  <li>
                    <b>Second Match Onwards:</b>
                    <br>
                    &nbsp;&nbsp;&nbsp;Each match after your first match, you will get 2 transfers per match.
                    You can purchase 2 more transfers per match. Paid transfer cost are: 1st transfers will cost 15 Rs and 2nd transfers will cost 25 Rs
                    You can carry your 2 free transfer to the next match. For example, if in a match if you do only 1 transfer then in the next match you will get (2+1)=3 transfers. But your paid substitute will be a collapse if you do not use that in the match</li>
                  <li>
                    <b>Lazy Forward Transfers:</b>
                    <br>
                    &nbsp;&nbsp;&nbsp;For the lazy folks who join in late for the championship mode, we have tried to cover you by giving you a headstart of 2x(Number of matches completed) free transfers. So, for eg if you join at match no 6, you'll have unlimited transfers before match lock time, after match lock time you get 2 * 6 = 12 free transfers to use
                  </li>
                </ul>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <nuxt-link :to="`/point-system?mode=ch`">
              <div>Point System</div>
            </nuxt-link>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Balance Team</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <ul>
                  <li class="bold">
                    Balance team criteria is as follows:
                    <ul>
                      <li>Minimum 4 Batsmen</li>
                      <li>1 Wicket Keeper</li>
                      <li>Atleast 1 All-rounder</li>
                      <li>Atleast 2 Bowlers</li>
                      <li>Total no of Bowlers + All-Rounders should be at least 5.</li>
                      <li>You can not select 2 pure Wicket Keepers.If your team has 2 or more Batting Wicket Keeper one will be consider as wicket-keeper and other(s) will be consider as batsman.</li>
                    </ul>
                  </li>
                  <li>You receive point for only the players who played in that match.</li>
                </ul>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </div>


  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "HOW TO PLAY",
      }
    },
    components: {
      BackChampionship: () => import('~/components/BackChampionship'),
    }
  }
</script>

<style type="text/css" scoped>
</style>
