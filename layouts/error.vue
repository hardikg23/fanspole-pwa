<template>
  <section>
    <Header :title="title" :bar_color="color" />
  
    <v-layout row wrap pa-2>
       <v-flex xs12 class="text-xs-center grey--text font15 pa-3">
          Page not found
       </v-flex>
       <v-flex xs12 :class="`text-xs-center ${color}--text pa-3 font-weight-bold`" style="font-size: 8em;">
          4<v-icon style="font-size: 1.15em;" :class="`${color}--text`">error_outline</v-icon>4
       </v-flex>
       <v-flex xs12 :class="`text-xs-center ${color}--text fontw600 font15 pa-3`">
          <nuxt-link :to="`/${home_path}`">GO TO HOME</nuxt-link>
       </v-flex>
    </v-layout>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "IT'S 404",
        mode: 'da',
        color: 'primary',
        home_path: 'matches'
      }
    },
    components: {
      Header: () => import('~/components/Header')
    },
    created(){
      if(this.$route.path.indexOf('championship') != -1){
        this.mode = 'da'
        this.color = 'championship'
        this.home_path = 'championship/home'
      }
    }
  };
</script>

<style type="text/css">
</style>