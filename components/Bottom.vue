<template>
  <v-bottom-nav fixed :value="true" :active.sync="e3" class="grey lighten-3 bottom">
    <v-btn to="/" flat color="primary" class="btn">
      <span class="caption roboto-medium">Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn to="/coupons" flat color="primary" class="btn">
      <span class="caption roboto-medium">Friends</span>
      <v-icon>people</v-icon>
    </v-btn>
    <v-btn to="/forums" flat color="primary" class="btn">
      <span class="caption roboto-medium">Create</span>
      <v-icon>ico-discussion</v-icon>
    </v-btn>
    <v-btn to="/groups" flat color="primary" class="btn">
      <span class="caption roboto-medium">Notifications</span>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn to="/notifications" flat color="primary" class="btn">
      <span class="caption roboto-medium">Me</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<style scoped>
.btn {
  min-width: 60px;
}
</style>

<script type="text/javascript">
export default {
  data() {
    return {
      e3: 0,
      e31: false
    };
  }
};</script>
