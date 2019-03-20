<template>
  <v-bottom-nav fixed :value="true" :active.sync="e3" class="grey lighten-3 bottom">
    <nuxt-link :to="`${home_path}`">
      <v-btn flat color="primary">
        <span class="">Home</span>
        <v-icon>home</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to="/login">
      <v-btn flat color="primary">
        <span class="">My Matches</span>
        <v-icon>poll</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="`${home_path}`">
      <v-btn flat color="primary">
        <span class="">Notifications</span>
        <v-icon>notifications</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="`${home_path}`">
      <v-btn flat color="primary">
        <span class="">More</span>
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </nuxt-link>
  </v-bottom-nav>
</template>

<style scoped>
.btn {
  min-width: 60px;
}
</style>

<script type="text/javascript">
import { HOME } from '~/constants/routes.js';
export default {
  data() {
    return {
      home_path: HOME,
      e3: 0,
      e31: false
    };
  }
};</script>
