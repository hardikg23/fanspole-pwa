<template>
  <section>
    <v-btn
      icon
      flat
      color="white"
      @click="back">
      <v-icon>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn
      v-show="showhome"
      icon
      flat
      color="white"
      :to="`/${home_path}`">
      <v-icon>home</v-icon>
    </v-btn>
  </section>
</template>

<script type="text/javascript">
import { HOME } from '~/constants/routes.js';
export default {
  props: {
    showhome: {
      type: Boolean
    }
  },
  data() {
    return {
      home_path: HOME
    };
  },
  methods: {
    back() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        window.location = 'https://www.fanspole.com';
      }
    }
  }
};
</script>
