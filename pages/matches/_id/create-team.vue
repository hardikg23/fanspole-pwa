<template>
  <section>
    <v-toolbar extended color="primary" extension-height='40'>
      <Back/>
      <span class="white--text fontw600">{{title}}</span>

    </v-toolbar>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      // await store.dispatch('PaidLeagues/GET_PAID_LEAGUES', params.id);
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
    },
    data() {
      return {
        title: 'CREATE TEAM'
      }
    }
  }
</script>

<style scoped>
</style>