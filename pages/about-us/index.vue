<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <v-card md5 class='pa-0'>
      <v-layout row wrap>
        <v-flex xs12 class='pa-4'>
          Fanspole is an Online Fantay Games Platform where users can come and play various Fantasy Games for ongoing Series/Tournament matches. You can play Free and Paid Fantasy Games in easy, secure and legal way.

          Our goal at Fanspole is to Provide Fantasy Players true value for their passion. We are a small team of young passionate people, working hard to make it the best experience for all Fantasy Players.

          Feel free to ask questions or post opinions by creating a thread on General Forums (<a class="primary--text" href="http://www.fanspole.com/forums/fantasy-cricket">http://www.fanspole.com/forums/fantasy-cricket</a>). Make the best usage of Fanspole to quench your thirst for cricket.
        </v-flex>
      </v-layout>
    </v-card>

    <div class="primary white--text pa-2 font11">
      Our Team
    </div>
    <v-card class="ma-2 pa-2">
      <v-layout row wrap>
        <v-flex xs12 class="primary--text font-weight-bold font11">
          HARDIK GONDALIYA(Co-Founder)
        </v-flex>
        <v-flex xs12 class="font9">
          There is always a player who can single handedly take you home without worry. Hardik Gondaliya is Virat Kohli of Fanspole. He is a great Fantasy Cricket Player with great passion for the Games. He has single handedly created the entire Fanspole Website.
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="ma-2 pa-2">
      <v-layout row wrap>
        <v-flex xs12 class="primary--text font-weight-bold font11">
          ANIKET SHINDE(Co-Founder)
        </v-flex>
        <v-flex xs12 class="font9">
          Captain Cool of the team. He is responsible to get things done. Also, has developed Fanspole's Android App. He has the habit to delay things just enough to come up with awesome results.
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="ma-2 pa-2">
      <v-layout row wrap>
        <v-flex xs12 class="primary--text font-weight-bold font11">
          AKSHAY CHAVAN
        </v-flex>
        <v-flex xs12 class="font9">
          Recently joined the team, has the ability to take wickets and great catches. Meet, Hardik Pandya of Fanspole. He helps us design stuff for Fanspole.
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="ma-2 pa-2">
      <v-layout row wrap>
        <v-flex xs12 class="primary--text font-weight-bold font11">
          BHANU JALAN
        </v-flex>
        <v-flex xs12 class="font9">
          The logo you like and admire created by this guy. Skilled and Creative in all aspects. Mr Rahane.
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="ma-2 pa-2">
      <v-layout row wrap>
        <v-flex xs12 class="primary--text font-weight-bold font11">
          JHANVI SHAH
        </v-flex>
        <v-flex xs12 class="font9">
          Handles all the company related stuff for Fanspole. We keep working on new features focusing on your experience without the worry of filing the documents on time. Thanks to her. Ms Mayanti Langer.
        </v-flex>
      </v-layout>
    </v-card>

    <div class="text-xs-center pa-2 mb-4">
      <div>For any queries you can contact:</div>
      <div class="primary--text font-weight-bold">admin@fanspole.com</div>
    </div>
        

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "ABOUT US",
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    }
  }
</script>

<style type="text/css" scoped>
  
</style>
