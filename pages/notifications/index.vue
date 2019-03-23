<template>
  <section>
    <Header :title="title"/>
    
    <div v-if="getNotifications.length != 0">
      <v-layout row wrap class="white" v-ripple v-for="notification in getNotifications" :key="notification.id">
        <v-flex xs1 class="borderb pa-2">
          <v-icon>notifications</v-icon>
        </v-flex>
        <v-flex xs9 class="font11 borderb pa-2">
          <div class="font9">{{notification.body}}</div>
        </v-flex>
        <v-flex xs2 class="font11 borderb pa-2">
          <div class="font7"><DateTime :time="notification.created_at_in_millis" :format="2"></DateTime></div>
        </v-flex>
      </v-layout>
    </div>
    <div v-else class="text-xs-center pa-2 pt-5 mt-5">
      No Notifications
    </div>

    <Bottom/>
  </section>
</template>

<script>
  export default {
    async asyncData({store, params}) {
      if((store.getters['ApiHits/all_notifications'] == undefined) || (store.getters['ApiHits/all_notifications'] < (new Date().getTime() - 60*60*1000))){
        await store.dispatch('Notifications/GET_NOTIFICATIONS');  
      }
    },
    computed: {
      getNotifications(){
        return this.$store.getters['Notifications/notifications'];
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom'),
      DateTime: () => import('~/components/DateTime')
    },
    data() {
      return {
        title: "NOTIFICATIONS",
        
      }
    }
  }
</script>
