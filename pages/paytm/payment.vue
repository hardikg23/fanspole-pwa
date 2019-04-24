<template>
  <section>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "PAYTM",
        loading: true
      }
    },
    async asyncData(context) {
      console.log(context.req.body)
    },
    components: {
    },
    computed: {
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>
