<template>
  <div>
    <v-toolbar :color="bar_color">
      <div v-if="!is_logged_in">
        <nuxt-link to="/login">
          <img src="https://res.cloudinary.com/fantasy/image/upload/v1554208678/uploads/development/avatar/5/1554208676.png" class="image imagec">
        </nuxt-link>
      </div>
      <div v-if="image">
        <img :src="image" class="image imagec" @click.stop="drawer = !drawer">
      </div>
      <h3 class="white--text fontw600">{{title}}</h3>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-0">
        <v-layout row wrap pa-0 class="borderb">
          <v-flex xs4 class='indigo lighten-5 pa-0'>
            <img :src="image" class="image2 imagec ma-3" @click.stop="drawer = !drawer">
          </v-flex>
          <v-flex xs8 class='indigo lighten-5 pa-0'>
            <div class="font-weight-bold mt-3">HI, {{display_name}}</div>
            <div class="">{{team_name}}</div>
            <div class="">Level {{cricket_level}}</div>
          </v-flex>
        </v-layout>
      </v-list>
      <v-list class="pt-0">

        <nuxt-link to="/profile">
          <v-list-tile avatar v-ripple class="borderb">
            <v-list-tile-avatar>
              <v-icon>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font12">My Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>

        <nuxt-link to="/wallet">
          <v-list-tile avatar v-ripple class="borderb">
            <v-list-tile-avatar>
              <v-icon>account_balance_wallet</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font12">
                My Balance 
                <span :class="`ftr pr-2 font-weight-bold ${bar_color}--text`">&#8377;{{current_balance}}</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>

        <nuxt-link to="/settings">
          <v-list-tile avatar v-ripple class="borderb">
            <v-list-tile-avatar>
              <v-icon>settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font12">My Info & Settings</span></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>

        <nuxt-link to="/point-system">
          <v-list-tile avatar v-ripple class="borderb">
            <v-list-tile-avatar>
              <v-icon>local_parking</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font12">Point System</span></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        drawer: false,
        display_name: '',
        team_name: '',
        image: '',
        cricket_level: '',
        current_balance: 0,
        is_logged_in: false
      }
    },
    mounted() {
      if (process.browser) {
        this.display_name = localStorage.getItem('me_display_name');
        this.team_name = localStorage.getItem('me_team_name');
        this.image = localStorage.getItem('me_image');
        this.cricket_level = localStorage.getItem('me_cricket_level');
        this.current_balance = localStorage.getItem('me_current_balance');
      }
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.is_logged_in = true
      }else{
        this.is_logged_in = false
      }
    },
    props: {
      title: {
        type: String
      },
      bar_color:{
        type: String,
        default: 'primary'
      }
    }
  }
</script>

<style type="text/css" scoped>
  .imagec{
    border-radius: 50%; 
    border: 1px solid #fff;
  }
  .image{
    width: 36px;
    margin-right: 20px;
  }
  .image2{
    width: 66px;
  }
</style>
