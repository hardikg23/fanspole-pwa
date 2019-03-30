<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <div>
      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Fantasy Cricket Introduction?</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-2">
                <ul>
                  <li>
                    Fantasy Cricket is a cricket team management game in which you make a team of 11 players.
                  </li>
                  <li>Everyone has their own opinion on who should be playing in the team for a match. Playing Fantasy Cricket will test your selection opinions skills.</li>
                  <li><b>Fantasy Cricket is a part of the Fantasy Sports genre. It is an online game where you make your team by selecting real players based on your skills and scoring depends on performance of your players in real life matches.</b></li>
                  <li>
                    There are certain rules that you should follow while creating your team.
                  </li>
                  <li>
                    Points are awarded based on the performance of your players in the real match after the end of match.
                  </li>
                  <li>Winners of the game are decided based on who's team aquired the most number of points. </li>
                  <li>On Fanspole you can play for Match, Round as well as Series based Fantasy Cricket. Series winners are decided by adding your <b>Team 1</b> Score of each match played in the series. There are various Series based fantasy like .e.g. IPL Fantasy League, World Cup Fantasy League etc</li>
                  <li>
                    Start by creating your team of 11 players for a Match. Winners for each match win Exiting Prizes.
                  </li>
                  <li>
                    So, use your existing skills and start winning.
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
            <div>Rules</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div>
                  <div class="text-uppercase"><b>Series/Tournament mode:</b></div>
                  <div>
                    &nbsp;&nbsp;&nbsp;Series winners are decided by adding your <b>Team 1</b> score of each match played in the series. Hence, to score high and be the overall Series winner Manage your team for each match of the series.
                  </div>

                  <br><br>

                  <div class="text-uppercase"><b>Matches:</b></div>
                  <div>
                    &nbsp;&nbsp;&nbsp;Matches are individual events where you can select best playing eleven based on your knowledge and skills. All selected players' points get added to your final score.
                  </div>
                  <br>

                  <div class="text-uppercase"><b>MULTIPLE TEAMS:</b></div>
                  <div>
                    &nbsp;&nbsp;&nbsp;You can submit maximum 4 Team per Match and join League which allows multiple team joining.
                  </div>
                  <br><br>

                  <div class="text-uppercase"><b>SELECTING YOUR INITIAL SQAURD</b></div>
                  <ul>
                    <li>
                      <b>SQUAD SIZE</b>
                      <p>Your squad size should be 11.</p>
                      <p>To start selecting your squad: Login-> Matches -> Create Team -> And start selecting your squad.</p>
                    </li>
                    <li>
                      <b>BUDGET</b>
                      <p>Your budget for all the Matches will be 100 credits initially.</p>
                      <p>Each player is allocated some price based on his playing factors.
                        Now, in the allocated budget you are supposed to create a team of exactly 11 players such that they fit inside the budget. Hence, total budget of all players will be less than or equal to 100 credits.</p>
                    </li>
                    <li>
                      <b>TEAM FORMATION</b>
                      <p>Each player you need has a price and you need to make a team of possibly your favorite players inside the given budget. That sounds good but to add to the fun here is a list of some more restriction. In your team of 11, you can have:</p>
                      <ol class="font-weight-bold">
                        <li>Minimum 4 Batsmen.</li>
                        <li>1 Wicket Keeper.</li>
                        <li>Atleast 1 All-rounder</li>
                        <li>Atleast 2 Bowlers</li>
                        <li>Total no of Bowlers plus All-Rounders should be at least 5.</li>
                        <li>You can not select 2 pure Wicket Keepers.If your team has 2 or more Batting Wicket Keeper one will be consider as  wicket-keeper and other(s) will be consider as batsman.</li>
                        <br>
                      </ol>
                    </li>
                    <li>
                      <b>CAPTAIN SELECTION</b>
                      <p>To select captain: Create a valid team in Manage Team page -> Select the captain<b>Points of the player you selected as captain will be doubled.</b></p>
                    </li>
                    <li>
                      <b>CHANGING TEAM</b>
                      <p>You can change your team as many times as you want as long as the resultant team is balanced and was created before the lock time of Match.</p>
                    </li>
                  </ul>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>FAQs</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <v-tabs slider-color="primary">
                  <v-tab ripple :key="1"><div class="font9">The Game</div></v-tab>
                  <v-tab ripple :key="2"><div class="font9">Leagues</div></v-tab>
                  <v-tab ripple :key="3"><div class="font9">Wallets</div></v-tab>
                  <v-tab ripple :key="4"><div class="font9">Redemptions</div></v-tab>

                  <v-tab-item :key="1" class="font9 pa-2">
                    <ol>
                      <li><b>What is Fantasy Cricket?</b></li>
                      <ul>
                        <li>Fantasy Cricket is a team management game of skill in which you select your best squad and win points based on their real life performances.</li>
                      </ul>
                      <li><b>How to play?</b></li>
                      <ul>
                        <li>Login/Signup on Fanspole.com</li>
                        <li>Click Create Team button for a Event and Select your best squad following the creation criterias mentioned in rules.</li>
                        <li>Join Free and Paid Leagues, compete with other user teams in the League and win prizes.</li>
                      </ul>
                      <li><b>When can I create my team?</b></li>
                      <ul>
                        <li>You can create your team anytime before match lock time. Match lock time is mentioned clearly and team creations are locked once the match lock time is passed.</li>
                      </ul>
                      <li><b>How many times can I update my created team?</b></li>
                      <ul>
                        <li>You can update your team as many times as you wish before the match lock time. Each update changes your last update time.</li>
                      </ul>
                      <li><b>Can I view other user teams?</b></li>
                      <ul>
                        <li>You can only see other user teams once the match is locked</li>
                      </ul>
                      <li><b>What happens if two teams have the same points?</b></li>
                      <ul>
                        <li>In case of a tie between winners of a multiple winner contest for any position, the prize money for the winner's position and the immediately next winning position (if any), and so forth in accordance with the number of tied winners, will be aggregated and shared equally among the tied winners. All other prize money will remain as per the winner's standing.<br>
                          For example: If there are 2 winners tied for the 1st position, the sum of the 1st and 2nd position prize money will be distributed equally between these 2 winners and the next highest scorer will be awarded the prize money for the 3rd position.<br>
                          Currently, there are no tie breakers and hence all teams who have scored equal points will be considered as tied for a position.</li>
                      </ul>
                      <li><b>What if it is raining?</b></li>
                      <ul>
                        <li>It is best practice to create your teams before the mentioned match lock time.</li>
                        <li>If the match is abandoned by rain, the contest is cancelled no points are awarded and refunds are made to all you paid games.</li>
                      </ul>
                      <li><b>What happens if I select a captain?</b></li>
                      <ul>
                        <li>Points of the player who you select as your team captain are doubled. Hence, choose your captain carefully.</li>
                      </ul>
                      <li><b>How much do I have to pay to play on Fanspole?</b></li>
                      <ul>
                        <li>Playing Fantasy Cricket on Fanspole is absolutely free. You will have to pay only if you wish to play Paid Fantasy Games.</li>
                      </ul>
                      <li><b>Can I create multiple teams?</b></li>
                      <ul>
                        <li>Yes, you can submit 4 teams per Match</li>
                      </ul>
                    </ol>
                  </v-tab-item>
                  <v-tab-item :key="2" class="font9 pa-2">
                    <ol>
                      <li><b>How does Leagues work?</b></li>
                      <ul>
                        <li>After you create your team for a Match, you can join League of your choice.</li>
                        <li>To join the league you need to have funds available in your Unused Funds wallet compartment.</li>
                        <li>Your winnings are added to Winnings wallet compartment which you can redeem.</li>
                      </ul>
                      <li><b>What are different types of Leagues on Fanspole?</b></li>
                      <ul>
                        <li>You can play leagues with limited member entries i.e 2, 3, 5, 10 so on. Total number of winners and prizes are precalculated for such leagues.</li>
                        <li>You can also play unlimited member entry leagues. Total number of winners and the prizes distributed are recalculated after each member join.</li>
                      </ul>
                      <li><b>What is the eligibility?</b></li>
                      <ul>
                        <li>You need to be over 18 years of age and an Indian resident to add funds and participate in paid fantasy games.</li>
                        <li>You need to accept our Terms & Conditions before any purchase. Please note that the profile details will have to be authenticated by submitting KYC documents before you can claim any prize.</li>
                      </ul>
                      <li><b>Are these paid games legal? Would I be violating any gambling or other law by participating in such a game?</b></li>
                      <ul>
                        <li>The games that are available on Fanspole are legal, and not in violation of any law. The law permits the conduct and operation of ‘games of skill’, and restrictions have only been imposed in relation to ‘games of chance’. The games conducted by us are predominantly ‘games of skill’ as they require you to not only have sufficient knowledge gathered through systematic research, attention, experience and adroitness, but also skilfully and carefully use such knowledge to select members of your fantasy squad, in order to participate in the games and win prizes. </li>
                        <li>However, please ensure that you meet all the eligibility criteria set out in the Terms of Use. Among other conditions, you must be over 18 years of age. And you must not access and participate in any paid format of the game, from outside India, or from any State in India where participating in such a game is illegal as per the applicable local laws (for instance, Assam, Orissa and Telangana). As long as you satisfy the eligibility criteria set out in the Terms of Use, you can participate in the games and win prizes.</li>
                      </ul>
                      <li><b>Can I join multiple leagues with same entry fee?</b></li>
                      <ul>
                        <li>Yes, you can join multiple leagues with the same entry fee but you cannot re-join the same league.</li>
                      </ul>
                      <li><b>What happens if my league is not filled or canceled?</b></li>
                      <ul>
                        <li>If your league is not filled before the lock time, the league is canceled and the entry fee is redistributed back to your unused wallet. Even in case of the league being canceled due to other reasons, the entry fee is refunded back to your unused wallet.</li>
                      </ul>
                      <li><b>What happens in case of a tie?</b></li>
                      <ul>
                        <li>
                          In case of a tie between winners of a multiple winner contest for any position, the prize money for the winner's position and the immediately next winning position (if any), and so forth in accordance with the number of tied winners, will be aggregated and shared equally among the tied winners. All other prize money will remain as per the winner's standing.<br>
                          For example: If there are 2 winners tied for the 1st position, the sum of the 1st and 2nd position prize money will be distributed equally between these 2 winners and the next highest scorer will be awarded the prize money for the 3rd position.<br>
                          Currently, there are no tie breakers and hence all teams who have scored equal points will be considered as tied for a position.
                        </li>
                      </ul>
                      <li><b>What happens if match is abandoned?</b></li>
                      <ul>
                        <li>League is cancelled and entry fees are refunded.</li>
                      </ul>
                      <li><b>Can I join same league with different Team?</b></li>
                      <ul>
                        <li>Yes you can join same league with another team if multiple joining is allowed for the league</li>
                      </ul>
                    </ol>
                  </v-tab-item>
                  <v-tab-item :key="3" class="font9 pa-2">
                    <ol>
                      <li><b>What are compartments in Fanspole wallet?</b></li>
                      <ul>
                        <li>Fanspole wallet into two compartments:</li>
                        <ol>
                          <li><b>Unused Funds:</b> <br>All the deposits you make by adding funds are transferred to this compartment. Only Unused Funds can be used to join any paid event on Fanspole.</li>
                          <li><b>Winnings:</b><br>The prizes you win from paid leagues and other events on Fanspole are added to Winnings compartment. You can use funds from Winnings compartment to redeem using one of the redemption options.</li>
                        </ol>
                      </ul>

                      <li><b>Is compartment transfer available?</b></li>
                      <ul>
                        <li>Yes, you can transfer money from your Winnings compartment to Unused Funds compartment but cannot do vice versa.</li>
                      </ul>

                      <li><b>What will happen if I do not use money in Unused Funds?</b></li>
                      <ul>
                        <li>Your funds are safe and will be unaltered. But if they lie unused for a year, they may be forfeited.</li>
                      </ul>


                      <li><b>Can I transfer Unused Funds to other users?</b></li>
                      <ul>
                        <li>No, funds once added to Unused Funds compartment cannot be withdrawn, refunded or transferred. They can only be used to play paid events on Fanspole.</li>
                      </ul>

                      <li><b>How much Funds can I add to Unused Funds?</b></li>
                      <ul>
                        <li>You can add minimum Rs.10 and maximum of Rs.10,000 in one transaction.</li>
                      </ul>
                    </ol>
                  </v-tab-item>
                  <v-tab-item :key="4" class="font9 pa-2">
                    <ol>
                      <li><b>How do I redeem?</b></li>
                      <ul>
                        <li>Fanspole wallet into two compartments:</li>
                        <ol>
                          <li>You can redeem with any one of the redemptions option in Accounts -> Redemption tab. You must have authenticated your account by submitting KYC documents.</li>
                        </ol>
                      </ul>

                      <li><b>What Redemption Options Do I have?</b></li>
                      You can redeem through one of the following options:
                      <ol>
                        <li>Bank Transfer: NEFT transfer to your bank account submitted during authentication process. It might take upto 7 working days for a bank redemption request to be processed</li>
                        <li>Transfer to BHIM UPI: You can transfer your winning to BHIM UPI account</li>
                      </ol>
                    </ol>
                  </v-tab-item>
                </v-tabs>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <nuxt-link :to="`/point-system`">
              <div>Point System</div>
            </nuxt-link>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Leagues</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div>
                  &nbsp;&nbsp;&nbsp;Leagues empowers you to play paid fantasy cricket in most easy, secure and legal way.
                </div>
                <br>
                <div>
                  &nbsp;&nbsp;&nbsp;Leagues take an entry fee to join. The collected money will be redistributed back amongst the league members. The prize money won will depend on the amount of members joining the league and entry fee of the league.
                </div>
                <br><br>

                <div class="text-uppercase"><b>We offers 3 types of Leagues</b></div>
                <ol>
                  <li class="text-uppercase font-weight-bold">Guaranteed Prize Leagues</li>
                  <ul style="list-style-type:disc">
                    <li>This is guaranteed league i.e Prizes will be distributed even if the league don't fill up</li>
                    <li>Only Limited members will be able to join this league.</li>
                    <li>Only the first few rank member will win prize.</li>
                  </ul>

                  <li class="text-uppercase font-weight-bold">Unlimited Leagues</li>
                  <ul style="list-style-type:disc">
                    <li>There is no limit on the number of users that can join a Unlimited League.</li>
                    <li>The winning prizes are distribute to some percent of the winners.</li>
                    <li>Prize money distributed to winners depends on the number of users joined and the entry fee of that league.</li>
                    <li>Hence, prizes are recalculated on each member join.</li>
                  </ul>

                  <li class="text-uppercase font-weight-bold">Limited Leagues</li>
                  <ul style="list-style-type:disc">
                    <li>Only Limited members will be able to join this league.</li>
                    <li>Only the first few rank member will win prize.</li>
                    <li>New league will be available to join each time a Limited league is full.</li>
                    <li>Your opponent in a Limited is decided randomly based on who is joining your league after or before you have joined.</li>
                    <li>You can join as many Limited leagues as you want.</li>
                  </ul>
                </ol>

                <br><br>
                <div class="text-uppercase"><b>How do I pay for Leagues entry fee?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;You can add funds securely via PayUMoney or PayTm in your Fanspole Wallet OR use your existing Fanspole Wallet balance to join a League.
                </div>

                <br>
                <div class="text-uppercase"><b>How will I receive prizes?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;The prize money you win from a League will be added back to your Fanspole wallet. You can then use one of the redemption options (Bank Transfer, BHIM UPI transfer, etc) to redeem your winnings. Redemption options can be found in Accounts -> Redemptions.
                </div>

                <br>
                <div class="text-uppercase"><b>How to play Leagues?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;In order to play League for a Event of the selected series you can Manage Team for the Match -> Go to Leagues -> Join the league of your choice -> Enjoy the Games and Win Prize Money.
                </div>

                <br>
                <div class="text-uppercase"><b>What happens in case of a tie?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;In case of a tie between winners of a multiple winner contest for any position, the prize money for the winner's position and the immediately next winning position (if any), and so forth in accordance with the number of tied winners, will be aggregated and shared equally among the tied winners. All other prize money will remain as per the winner's standing.<br>
                  &nbsp;&nbsp;&nbsp;For example: If there are 2 winners tied for the 1st position, the sum of the 1st and 2nd position prize money will be distributed equally between these 2 winners and the next highest scorer will be awarded the prize money for the 3rd position.<br>
                  &nbsp;&nbsp;&nbsp;Currently, there are no tie breakers and hence all teams who have scored equal points will be considered as tied for a position.
                </div>
  
                <br>
                <div class="text-uppercase"><b>Can I join same league with different Team?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;Yes you can join same league with another team if multiple joining is allowed for the league
                </div>

                <br>
                <div class="text-uppercase"><b>Who can join Leagues?</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;You must be above 18 years of age and must be a resident in India having valid proofs of the same.<br>
                  &nbsp;&nbsp;&nbsp;As laws of paid games are unclear in states of Assam, Orissa and Telangana, currently, residents of Assam, Orissa and Telangana are not permitted to play participate in the paid formats of leagues.
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Legality</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div class="text-uppercase"><b>Introduction</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;Fanspole takes great care to comply with central and state legislations in India to protect users from any legal risk. All the fantasy sports games for cricket as available on our website, including the paid formats, are carefully designed to comply with applicable statutes and regulations in India.
                </div>
                <br>
                <div class="text-uppercase"><b>Games of Skill</b></div>
                <div>
                  Games can be broadly classified into the following two categories:
                  <ul>
                    <li>
                      Games of chance, where the winner is determined entirely by mere luck, the result is wholly uncertain and doubtful and a human being cannot apply his/her mind to estimate the result or his/her efforts to influence the result. Generally, such games are illegal as constituting gambling.
                    </li>
                    <li>
                      Games of skill, where, skill plays the dominant role and the result depends primarily upon the relative knowledge, training, attention, experience, and/or adroitness of the participants. Generally, such games are not deemed to constitute ‘gambling’ and do not fall foul of the laws prohibiting gambling.
                    </li>
                  </ul>
                  <div>
                    &nbsp;&nbsp;&nbsp;For a game to be considered a ‘game of skill’ under Indian law, the element of skill must predominate the element of chance in affecting the results of the game. Thus, the extent to which skill is involved in the game is the key factor in the determination of the nature and legality of the game under Indian law.
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;Accordingly, games such as Rummy, Chess, Carrom and Wagering on Horse Races have been recognised by the courts in India as games of skill.
                  </div>
                </div>

                <br>
                <div class="text-uppercase"><b>Indian Law on Gambling</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;The principal legislation governing gambling in India is the Public Gambling Act, 1867 (“PGA”). The PGA criminalises the act of ‘gambling’ in a public forum and the keeping of a ‘common gaming house’. The PGA, however, creates an important exception in favour of games of skill, by stating that the provisions of the PGA shall [not] be held to apply to any ‘game of mere skill’ wherever played.
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;In determining whether a given game or contest is a game of skill or chance, Indian courts have adopted the standard of assessing the ‘dominant factor’ of a game. The two most important Indian cases in this regard are State of Andhra Pradesh v. K Satyanarayana (AIR 1968 SC 825) (the “Satyanarayana” case) and KR Lakshmanan v. State of Tamil Nadu (AIR 1996 SC 1153) (the “Lakshmanan” case).
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;In the Satyanarayana case, the Supreme Court defined a ‘game of mere skill’ to mean a game “in which, although the element of chance necessarily cannot be entirely eliminated, success depends principally upon the superior knowledge, training, attention, experience and adroitness of the player.” By application of this definition, the Supreme Court held that the game of rummy was a game of skill, and did not amount to gambling under the PGA. While upholding the levy of a nominal service charge for provision of a physical space, cards, etc., to play a game of rummy, the Court reasoned:
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;"Rummy...... requires certain amount of skill because the fall of the cards has to be memorised and the building up of Rummy requires considerable skill in holding and discarding cards. We cannot, therefore, say that the game of Rummy is a game of entire chance. It is mainly and preponderantly a game of skill."
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;In the Lakshmanan case, the Supreme Court held that the betting on horse races was a game of skill. It rationalised that in a horse race the winner is not determined by chance alone, as the condition, speed and endurance of the horse and the skill and management of the rider are factors affecting the result of the race. The bettor has the opportunity to exercise his judgment and discretion in determining the horse on which to bet.
                </div>
                <br>
                <div class="text-uppercase"><b>Fanspole Fantasy "Game of skill"</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;In order to achieve success at the Fanspole Fantasy Games a user must have knowledge (gathered through systematic research), attention, experience and adroitness.
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;The skill element of Fantasy Games on Fanspole can be found in the aspect of "Drafting and Playing".
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;During drafting a user has to use his mind in selecting the players who will perform in todays match based on the rules of player selection. The rules further minimize instance of chance dictating the outcome. To select the best possible team he/she will have to research, analyse and track performances of his players which requires him to invest his/her time and effort.
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;*For these reasons, the determination of the outcome in Fanspole Fantasy Games is based on the predominance of skill over chance and it is our belief that the Fanspole Fantasy is conclusively a game of skill in the eyes of the law. Accordingly, the Fanspole Fantasy do not amount to ‘gambling’ under central and most state gambling statutes in India.
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Apart from the PGA, which is a central legislation, several states across India have enacted and implemented State specific laws governing gambling, gaming and other similar or related activities. Where a state law on the subject exists, it supersedes the PGA.
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;While the PGA and most state statutes exempt games of 'mere skill’ from their purview, certain Indian states classify all games of mixed skill and chance as gambling regardless of whether skill is the predominant factor. In Assam, Orissa and Telangana in particular, games of mixed chance and skill cannot be played for any monetary consideration. Therefore, unfortunately, we do not currently offer the paid formats of the Fanspole Fantasy Games to residents of Assam, Orissa and Telangana but do make available the ‘free-to-play’ formats of the Fanspole Fantasy Games to such persons.
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Redemption Options</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div class="text-uppercase"><b>You can redeem your winning by one of the following ways:</b></div>
                <ol>
                  <li class="text-uppercase font-weight-bold">Bank Transfer:</li>
                  <ul>
                    <li>Inorder to use bank transfer you'll have to add your One-Time PAN Card Details in Account section. PAN Card acts as an id proof. This will make sure that your winnings are are being deposited in your bank account and there is no misuse. PAN Card approval might take upto 3 working days. </li>
                    <li>After your PAN Card is approved you can enter your bank details from Redemptions tab in Account. Approval of Bank Details may take upto 7 working days.</li>
                    <li>We have ensured secure access of your details, hence you'll have to go through one time setup process.</li>
                    <li>Your details are transferred over secure "HTTPS" channel and we do not share them with any third party, Period. Hope you enjoy the feature. Cheers!</li>
                    <li>
                      Users will be allowed to apply for Bank Redemption only after they have authenticated their account by submitting necessary documents. 
                    </li>
                  </ul>
                  
                  <li class="text-uppercase font-weight-bold">Transfer to BHIM UPI id:</li>
                  <ul>
                    <li>Inorder to use BHIM UPI transfer you'll have to add your One-Time PAN Card Details in Account section. PAN Card acts as an id proof.</li>
                    <li><b>Transaction fee of Rs.10</b> will be deducted while transferring. For eg if entered amount is Rs.300 then Rs.290 will be transferred to your bank account.</li>
                    <li>Maximum transfer limit per day: <b>RS 10000</b></li>
                    <li>Minimum amount: Rs 100</li>
                    <li>Bank statement will show Transaction record as: <b>UPI/cointab@fbl/payout</b></li>
                  </ul>
                </ol>
                <br>
                <div>
                  &nbsp;&nbsp;&nbsp;For now there are this many redemption options. We are trying our best to add more.
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="borderb">
        <v-expansion-panel-content class="indigo lighten-5">
          <template v-slot:header>
            <div>Gangs</div>
          </template>
          <v-card class="pa-0 font9">
            <v-layout row wrap>
              <v-flex xs12 class="pa-3">
                <div class="text-uppercase"><b>GANGS</b></div>
                <div>&nbsp;&nbsp;&nbsp;There are two types of Gangs: Private Gang and Public Gang</div>
                <ul>
                  <li>
                    <b>PRIVATE GANG</b>
                    <p>Users can create private gang. To join a private gang you need to send join request to gang creator. The users who can join a private gang is controlled by gang creator.</p>
                  </li>
                  <li>
                    <b>PUBLIC GANG</b>
                    <p>Users can create public gang. A gang code is generated once you create public gang which is displayed on the created gang's page. Anyone can join a public gang by using the gang code.</p>
                  </li>
                </ul>
                <div class="text-uppercase"><b>Gang Score is calculated by summation of scores of the top 10 gang members.</b></div>
                <div>
                  &nbsp;&nbsp;&nbsp;Gangs can be created to tag along with members and have a personalized tracking leaderboard for all gang members for the entire series.<br> 
                  &nbsp;&nbsp;&nbsp;For eg: A gang can be created for a college and students can be asked to join that gang by sharing gang's code so that they can track each other's scores.
                </div>
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
      Back: () => import('~/components/Back'),
    }
  }
</script>

<style type="text/css" scoped>
</style>
