<template>
  <v-app style="max-width: 550px;">
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
