<template>
  <div>
    <v-bottom-nav fixed :value="true" :active.sync="e3" class="grey lighten-3" style="max-width: 550px;">
      <v-btn flat color="championship" to="/championship/home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="championship" to="/championship/results">
        <span>Results</span>
        <v-icon>poll</v-icon>
      </v-btn>
      <v-btn flat color="championship" to="/championship/leaderboard">
        <span>Leaders</span>
        <v-icon>poll</v-icon>
      </v-btn>
      <v-btn flat color="championship" to="/championship/gangs">
        <span>Gangs</span>
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn flat color="championship" to="/championship/more">
        <span>More</span>
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<style scoped>
  .v-btn {
    min-width: 50px;
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
