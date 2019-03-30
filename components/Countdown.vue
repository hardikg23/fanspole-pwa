<template>
  <div v-if="remaining < 0">
    <div class="red--text darken-4">locked</div>
  </div>
  <div v-else-if="days >= 2">
    {{ days }}d
  </div>
  <div v-else-if="days < 2 && days >= 1">
    {{ days }}d {{ hours }}h
  </div>
  <div v-else-if="days < 1 && hours >= 1">
    {{ hours }}h {{ minutes }}m {{ seconds }}s
  </div>
  <div v-else>
    {{ minutes }}m {{ seconds }}s
  </div>
</template>

<script>
  export default {
    props : {
        date : {
            type: Number,
            coerce: str => Math.trunc(Date.parse(str) / 1000)
        }
    },
    mounted() {
      if (process.browser) {
        window.setInterval(() => {
          this.now = Math.trunc((new Date()).getTime() / 1000);
        }, 1000);
      }
    },
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000)
        }
    },
    computed: {
      remaining(){
        return (this.date - this.now);
      },
      seconds() {
        return (this.date - this.now) % 60;
      },

      minutes() {
        return Math.trunc((this.date - this.now) / 60) % 60;
      },

      hours() {
        return Math.trunc((this.date - this.now) / 60 / 60) % 24;
      },

      days() {
        return Math.trunc((this.date - this.now) / 60 / 60 / 24);
      }
    }
  }
</script>