<template>
  <section>
  </section>
</template>

<script>
  export default {
    mounted() {
      if (this.$cookies.get('at') && this.$cookies.get('rt')) {
        this.$store.dispatch('Me/LOGOUT');
      }
    },
  }
</script>
