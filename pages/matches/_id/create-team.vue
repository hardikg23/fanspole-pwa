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
      <ManageTeam :new_team="true"></ManageTeam>
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
        await store.dispatch('Players/GET_PLAYERS', {id: params.id, fields: 'id,name,display_name,display_info,value,style,last_series_score,team{name_attr,jersey_photo,team_color}'});
      }
    },
    data() {
      return {
        title: 'CREATE TEAM',
        loading: false
      }
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      }
    },
    mounted(){
      if (!this.$cookies.get('at')) {
        this.$router.push('/login');
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      ManageTeam: () => import('~/components/ManageTeam'),
      MatchBar: () => import('~/components/MatchBar'),
    }
  }
</script>
<style scoped>
</style>