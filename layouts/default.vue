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
