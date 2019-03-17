<template>
  <span>{{last_updated}}</span>
</template>

<script type="text/javascript">
export default {
  props : {
    time : {
      type: Number,
      required: true
    }
  },
  computed: {
      last_updated(){
        var date = new Date(this.time);
        var fdate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ', ' + (date.getHours()%12 == 0 ? 12 : date.getHours()%12) + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + (date.getHours() < 12 ? 'am' : 'pm');
        return fdate;
      }
    }
};
</script>
