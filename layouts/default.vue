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
};</script>

<style type="text/css">
  body{
    max-width: 550px;
    -webkit-box-shadow: 0 0 1px 1px #E0E0E0;
    box-shadow: 0 0 1px 1px #E0E0E0;
  }
</style>