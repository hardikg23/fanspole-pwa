<template>
  <div>
    <v-toolbar color="primary">
      <h3 class="white--text fontw600">{{title}}</h3>
    </v-toolbar>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>