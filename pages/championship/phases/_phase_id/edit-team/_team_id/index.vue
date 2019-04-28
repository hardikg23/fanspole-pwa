<template>
  <section>
    <v-toolbar color="championship">
      <BackChampionship />
      <span class="white--text fontw600">{{loading == false ? getPhase.name : ''}}</span>
    </v-toolbar>
    <ManageTeamChampionship :new_team="false"></ManageTeamChampionship>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "EDIT TEAM",
        loading: true
      }
    },
    components: {
      BackChampionship: () => import('~/components/BackChampionship'),
      ManageTeamChampionship: () => import('~/components/ManageTeamChampionship')
    },
    computed: {
      getPhase() {
        return this.$store.getters['SeriesPhases/series_phase'](this.$route.params.phase_id);
      },
      getPlayer() {
        return this.$store.getters['Players/phase_players'](this.$route.params.phase_id);
      }
    },
    mounted: function() {
      this.getApiSeriesPhase();
    },
    methods: {
      async getApiSeriesPhase(){
        if (this.$store.getters['SeriesPhases/series_phases'].length == 0){
          await this.$store.dispatch('SeriesPhases/GET_PHASES', {fields: 'id,name,current_user_classic_team,transfer_windows,prizes'});
        }
        if (this.$store.getters['Players/phase_players'](this.$route.params.phase_id).length == 0){
          await this.$store.dispatch('Players/GET_PHASE_PLAYERS', {id: this.$route.params.phase_id, fields: 'id,name,display_name,display_info,value,style,last_series_score,team{name_attr,jersey_photo,team_color}'})
        }
        await this.$store.dispatch('ClassicCreateTeam/GET_TEAM', {phase_id: this.$route.params.phase_id, team_id: this.$route.params.team_id, fields: 'id,budget,captain,team_players,free_transfers,paid_transfers'})
          .catch((error) => {
            this.$nuxt.$emit('snackbarError', {
              snackbar: true,
              message: error.data.error,
              button: false
            });
            return false;
          });
        this.loading = false
      },
    }
  }
</script>

<style type="text/css" scoped>
</style>
