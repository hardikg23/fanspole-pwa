<template>
  <section>
    <Header :title="title"/>
  
    <v-layout row wrap pa-2>
       <v-flex xs12 class="text-xs-center grey--text font15 pa-3">
          Page not found
       </v-flex>
       <v-flex xs12 class="text-xs-center primary--text pa-3 font-weight-bold" style="font-size: 8em;">
          4<v-icon style="font-size: 1.15em;" class="primary--text">error_outline</v-icon>4
       </v-flex>
       <v-flex xs12 class="text-xs-center primary--text fontw600 font15 pa-3">
          <nuxt-link to="/matches">GO TO HOME</nuxt-link>
       </v-flex>
    </v-layout>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "IT'S 404",
      }
    },
    components: {
      Header: () => import('~/components/Header')
    }
  };
</script>

<style type="text/css">
</style>