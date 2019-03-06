<template>
  <v-btn
    icon
    flat
    color="white"
    @click="back">
    <v-icon>keyboard_arrow_left</v-icon>
  </v-btn>
</template>

<script type="text/javascript">
export default {
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
