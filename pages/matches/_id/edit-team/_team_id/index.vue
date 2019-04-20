<template>
  <section>
    <div class="overflow:hidden;">
      <v-toolbar extended color="primary" height="56" style="position: fixed;top:0;z-index:10;">
        <Back/>
        <span class="white--text fontw600">{{title}}</span>
        <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
          <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
            <div v-if="!loading">
              <MatchBar :match="getMatch"></MatchBar>
            </div>
          </div>
        </v-toolbar-items>
      </v-toolbar>
      <ManageTeam :new_team="false"></ManageTeam>
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      if (store.getters['Matches/match'](params.id) == undefined){
        await store.dispatch('Matches/GET_MATCH', params.id);  
      }
      if (store.getters['Players/players'](params.id).length == 0){
        await store.dispatch('Players/GET_PLAYERS', params.id);
      }
    },
    data() {
      return {
        title: 'EDIT TEAM',
        loading: false,
      }
    },
    mounted() {
      this.getTeam();
    },
    components: {
      Back: () => import('~/components/Back'),
      ManageTeam: () => import('~/components/ManageTeam'),
      MatchBar: () => import('~/components/MatchBar'),
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      }
    },
    methods: {
      async getTeam(){
        await this.$store.dispatch('CreateTeam/GET_TEAM', this.$route.params).catch((error) => {
          this.$router.push(`/matches/${this.$route.params.id}/teams`);
          this.$nuxt.$emit('snackbarError', {
            snackbar: true,
            message: error.data.error,
            button: false
          });
          return false;
        });
      },
    }
  }
</script>

<style scoped>
</style>