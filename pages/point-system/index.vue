<template>
  <section>
    <v-toolbar color="primary">
      <Back/>
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
  
    <v-tabs grow centered slider-color="primary">
      <v-tab ripple :key="1">T20</v-tab>
      <v-tab ripple :key="2">ODI</v-tab>
      <v-tab ripple :key="3">TEST</v-tab>

      <v-tab-item :key="1">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="type in point_system.t20" :key="type.main_title" class="indigo lighten-5">
            <template v-slot:header>
              <div>{{type.main_title}}</div>
            </template>
            <v-card class="pa-0">
              <v-layout row wrap>
                <v-flex xs6 class="pa-2 pl-4 pr-4 borderb" v-for="s in type.points" :key="s.text">
                  <div v-bind:class="s.class">{{s.text}}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="type in point_system.odi" :key="type.main_title" class="indigo lighten-5">
            <template v-slot:header>
              <div>{{type.main_title}}</div>
            </template>
            <v-card class="pa-0">
              <v-layout row wrap>
                <v-flex xs6 class="pa-2 pl-4 pr-4 borderb" v-for="s in type.points" :key="s.text">
                  <div v-bind:class="s.class">{{s.text}}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-tab-item>
      <v-tab-item :key="3">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="type in point_system.test" :key="type.main_title" class="indigo lighten-5">
            <template v-slot:header>
              <div>{{type.main_title}}</div>
            </template>
            <v-card class="pa-0">
              <v-layout row wrap>
                <v-flex xs6 class="pa-2 pl-4 pr-4 borderb" v-for="s in type.points" :key="s.text">
                  <div v-bind:class="s.class">{{s.text}}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-tab-item>
    </v-tabs>

    <div class="font8 white pa-2 pt-4">
      <ul>
        <li>
          The cricketer you choose to be your Fantasy Cricket Team’s Captain will receive 2 times the points
        </li>
        <li>
          11 players from each side play the game
        </li>
        <li>
          None of the events occurring during a Super Over, if any, will be considered for Points to be assigned/applied to a player.
        </li>
        <li>
          In case of run-outs involving 3 players from the fielding side, all players involved will be allotted points.
        </li>
        <li>
          All players earn batting, bowling and fielding points, regardless of the roles they have been assigned. All the above points get doubled for your Captain.
        </li>
        <li>
          Fanspole takes score data from third-party. There are occasions when dot balls data is not provided. In such cases dot balls will not be included in the final points calculation
        </li>
        <li>
          <br>
          <b>For Batting Score:</b><br>
          Runs = Runs scored by batsman<br>
          Balls = Balls faced by batsman
          <br><b>For Bowling Score:</b><br>
          Balls = Balls bowled by bowler<br>
          Runs = Runs given by bowler
        </li>
      </ul>
    </div>

  </section>
</template>

<script type="text/javascript">
  export default {
    components: {
      Back: () => import('~/components/Back')
    },
    data() {
      return {
        title: 'POINT SYSTEM',
        point_system: {
          t20: [
            { main_title: 'BATTING',
              points: [
                {text: 'Runs', class: 'text-xs-left'}, {text: '+1', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Boundary Bonus', class: 'text-xs-left'}, {text: '+2', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Six Bonus', class: 'text-xs-left'}, {text: '+3', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Milestone Bonus(every 25 runs)', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Strike-rate Bonus', class: 'text-xs-left'}, {text: 'Runs – Balls', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Dismissal for a duck', class: 'text-xs-left'}, {text: '-10', class: 'text-xs-right pr-2 red--text text--accent-4 font-weight-bold'},
              ]
            },
            { main_title: 'BOWLING',
              points: [
                {text: 'Wicket', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Maiden over', class: 'text-xs-left'}, {text: '+15', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Economic Bonus', class: 'text-xs-left'}, {text: '(Balls x 2) - Runs', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Dot ball', class: 'text-xs-left'}, {text: '+1', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '3 wicket haul Bonus', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '5 wicket haul Bonus', class: 'text-xs-left'}, {text: '+50', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '7 wicket haul Bonus', class: 'text-xs-left'}, {text: '+100', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
              ]
            },{ main_title: 'FIELDING',
              points: [
                {text: 'Catch', class: 'text-xs-left'}, {text: '+15', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Stumping/Run-out', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}
              ]
            },
            { main_title: 'BONUS',
              points: [{text: 'Man of the Match', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}]
            }
          ],
          odi: [
            { main_title: 'BATTING',
              points: [
                {text: 'Runs', class: 'text-xs-left'}, {text: '+1', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Boundary Bonus', class: 'text-xs-left'}, {text: '+2', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Six Bonus', class: 'text-xs-left'}, {text: '+4', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Milestone Bonus(every 25 runs)', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Strike-rate Bonus', class: 'text-xs-left'}, {text: '(Runs x 1.33) – Balls', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Dismissal for a duck', class: 'text-xs-left'}, {text: '-10', class: 'text-xs-right pr-2 red--text text--accent-4 font-weight-bold'},
              ]
            },
            { main_title: 'BOWLING',
              points: [
                {text: 'Wicket', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Maiden over', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Economic Bonus', class: 'text-xs-left'}, {text: 'Balls - Runs', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Dot ball', class: 'text-xs-left'}, {text: '+1', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '3 wicket haul Bonus', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '5 wicket haul Bonus', class: 'text-xs-left'}, {text: '+50', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '7 wicket haul Bonus', class: 'text-xs-left'}, {text: '+100', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
              ]
            },{ main_title: 'FIELDING',
              points: [
                {text: 'Catch', class: 'text-xs-left'}, {text: '+15', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Stumping/Run-out', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}
              ]
            },
            { main_title: 'BONUS',
              points: [{text: 'Man of the Match', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}]
            }
          ],
          test: [
            { main_title: 'BATTING',
              points: [
                {text: 'Runs', class: 'text-xs-left'}, {text: '+1', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Boundary Bonus', class: 'text-xs-left'}, {text: '+2', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Six Bonus', class: 'text-xs-left'}, {text: '+5', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Milestone Bonus(every 25 runs)', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Dismissal for a duck', class: 'text-xs-left'}, {text: '-20', class: 'text-xs-right pr-2 red--text text--accent-4 font-weight-bold'},
              ]
            },
            { main_title: 'BOWLING',
              points: [
                {text: 'Wicket', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Maiden over', class: 'text-xs-left'}, {text: '+2', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '3 wicket haul Bonus', class: 'text-xs-left'}, {text: '+25', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '5 wicket haul Bonus', class: 'text-xs-left'}, {text: '+50', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '7 wicket haul Bonus', class: 'text-xs-left'}, {text: '+90', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '10 wicket haul Bonus', class: 'text-xs-left'}, {text: '+150', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '12 wicket haul Bonus', class: 'text-xs-left'}, {text: '+200', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: '15 wicket haul Bonus', class: 'text-xs-left'}, {text: '+300', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
              ]
            },{ main_title: 'FIELDING',
              points: [
                {text: 'Catch', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'},
                {text: 'Stumping/Run-out', class: 'text-xs-left'}, {text: '+10', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}
              ]
            },
            { main_title: 'BONUS',
              points: [{text: 'Man of the Match', class: 'text-xs-left'}, {text: '+50', class: 'text-xs-right pr-2 green--text text--accent-4 font-weight-bold'}]
            }
          ]
        }
      }
    }
  }
</script>