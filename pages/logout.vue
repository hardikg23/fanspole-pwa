<template>
  <section>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      await store.dispatch('Me/LOGOUT');
    }
  }
</script>
