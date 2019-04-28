<template>
  <v-app>
    <nuxt/>
    <SnackBar/>
  </v-app>
</template>

<script>
export default {
  components: {
    SnackBar: () => import('~/components/SnackBar')
  },
  watch: {
    '$route.path': function(val) {
      if(val.indexOf('/login') == -1 && val.indexOf('/signup') == -1){
        this.$store.commit('Common/SET_LAST_VISITED_URL', val);  
      }
    }
  },
};</script>
<style type="text/css">
</style>