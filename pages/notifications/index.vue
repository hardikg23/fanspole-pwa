<template>
  <section>
    <Header :title="title"/>
    
    <v-layout>
      <v-flex xs12 class="text-xs-center pa-4" v-if="loading">
        <v-progress-circular
          indeterminate
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <div v-if="!loading">
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
    </div>

    <Bottom/>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "NOTIFICATIONS",
        loading: true
      }
    },
    components: {
      Header: () => import('~/components/Header'),
      Bottom: () => import('~/components/Bottom'),
      DateTime: () => import('~/components/DateTime')
    },
    computed: {
      getNotifications(){
        return this.$store.getters['Notifications/notifications'];
      }
    },
    created: function() {
      this.getApiNotifications();
    },
    methods: {
      async getApiNotifications(){
        if((this.$store.getters['ApiHits/all_notifications'] == undefined) || (this.$store.getters['ApiHits/all_notifications'] < (new Date().getTime() - 60*60*1000))){
          await this.$store.dispatch('Notifications/GET_NOTIFICATIONS');  
        }
        this.loading = false
      }
    }
  }
</script>
