<template>
  <v-card>
    <v-snackbar
      :timeout="timeout"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
      auto-height
    >
      {{ text }}

      <v-btn
        v-if="buttonShow"
        :to="path"
        flat
        block
        class="deep-orange--text theme--dark">{{ pathText }}</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      snackbar: false,
      mode: '',
      timeout: 5000,
      text: '',
      buttonShow: false,
      path: '',
      pathText: ''
    };
  },
  mounted() {
    this.$nuxt.$on('snackbarError', (data) => {
      this.snackbar = data.snackbar;
      this.text = data.message;
      this.buttonShow = data.button;
      if (data.buttonDetails) {
        this.path = data.buttonDetails.path;
        this.pathText = data.buttonDetails.text;
      }
    });
  },
  destroyed() {
    this.$nuxt.$off('snackbarError');
  }
};
</script>
