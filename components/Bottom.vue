<template>
  <div>
    <v-bottom-nav fixed :value="true" :active.sync="e3" class="grey lighten-3" style="max-width: 550px;">
      <v-btn flat color="primary" :to="`${home_path}`">
        <span class="">Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="primary" :to="`${results_path}`">
        <span class="">Results</span>
        <v-icon>poll</v-icon>
      </v-btn>
      <v-btn flat color="primary" to="/gangs">
        <span>Gangs</span>
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn flat color="primary" :to="`${more_path}`">
        <span class="">More</span>
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<style scoped>
  .btn {
    min-width: 60px;
  }
</style>

<script type="text/javascript">
import { HOME } from '~/constants/routes.js';
import { MORE } from '~/constants/routes.js';
import { RESULTS } from '~/constants/routes.js';
import { NOTIFICATIONS } from '~/constants/routes.js';
export default {
  data() {
    return {
      home_path: HOME,
      more_path: MORE,
      results_path: RESULTS,
      notifications_path: NOTIFICATIONS,
      e3: 0,
      e31: false
    };
  }
};</script>
