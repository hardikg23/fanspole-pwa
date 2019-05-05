<template>
  <section class="bg text-uppercase">
    <v-card md5 ripple class="box_shadow_common ma-3 mode_card" color="primary" to="/matches">
      daily mode
    </v-card>
    <v-card md5 ripple class="box_shadow_common ma-3 mode_card" color="championship" to="/championship/home">
      championship mode
    </v-card>
  </section>
</template>

<script>
  export default {
    created(){
      console.log("mode/created" + process.browser);
    },
    mounted: function() {
      console.log("mode/mounted"+ process.server);
    }
  }
</script>

<style type="text/css" scoped="">
  .bg{
    background-color: #CFD8DC !important;
    min-height: 100vh;
  }
  .mode_card{
    text-align: center;
    color: #fff;
    font-weight: bold;
    padding: 66px 20px;
    font-size: 1.5em;
  }
</style>
