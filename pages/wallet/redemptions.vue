<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "WITHDRAW"
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    },
    computed: {
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>
