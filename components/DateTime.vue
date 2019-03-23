<template>
  <span>{{datetime}}</span>
</template>

<script type="text/javascript">
export default {
  props : {
    format : {
      type: Number,
      default: 1
    },
    time : {
      type: Number,
      required: true
    }
  },
  computed: {
      datetime(){
        var date = new Date(this.time);
        var day = ("0" + date.getDate()).slice(-2)
        var month = ("0" + (date.getMonth() + 1)).slice(-2)
        var year = date.getFullYear()
        var hours = ("0" + date.getHours()%12).slice(-2) 
        var minutes = ("0" + date.getMinutes()).slice(-2)  
        var seconds = ("0" + date.getSeconds()).slice(-2) 
        var notation = date.getHours() < 12 ? 'am' : 'pm'
        var final_date = ""
        switch(this.format) {
          case 1:
            final_date = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ':' + seconds + ' ' + notation;
            break;
          case 2:
            final_date = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ' ' + notation;
            break;
          default:
            "kdvksdv"
        }
        return final_date;
      }
    }
};
</script>
