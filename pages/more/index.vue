<template>
  <section>
    <Header :title="title"/>
      <div style="padding-bottom: 80px;">
        <nuxt-link :to="`${link.path}`" v-for="link in links" :key="link.id">
          <v-layout row wrap class="white" v-ripple>
            <v-flex xs2 class="borderb pa-3">
              <v-icon>{{link.icon}}</v-icon>
            </v-flex>
            <v-flex xs8 class="font11 borderb pa-3">
              {{link.text}}
            </v-flex>
            <v-flex xs2 class="borderb pa-3">
              <v-icon>navigate_next</v-icon>
            </v-flex>
          </v-layout>
        </nuxt-link>
      </div>
    <Bottom/>
  </section>
</template>

<script>
  export default {
    components: {
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom')
    },
    data() {
      return {
        title: "MORE",
        links: [
          {id: 1, icon: 'poll', text: 'Ranking', path: '/daily/leaderboard'},
          {id: 2, icon: 'star', text: 'Matches', path: '/info/matches'},
          {id: 4, icon: 'compare_arrows', text: 'Players', path: '/info/players'},
          {id: 5, icon: 'local_parking', text: 'Fantasy Points System', path: '/point-system'},
          {id: 6, icon: 'help_outline', text: 'How To Play', path: '/daily/how-to-play'},
          {id: 7, icon: 'whatshot', text: 'About Us', path: '/about-us'},
          {id: 8, icon: 'notifications', text: 'Notifications', path: '/notifications'},
          {id: 9, icon: 'power_settings_new', text: 'Logout', path: '/logout'}
        ]
      }
    }
  }
</script>
