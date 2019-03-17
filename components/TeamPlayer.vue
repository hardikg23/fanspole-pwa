<template>
  <div style="display: inline-block;" class="pa-2 pb-4">
    <div style="z-index: -5;">
      <img v-bind:src="player.team.jersey_photo" style="width:46px;height: 46px;">
    </div>
    <div v-bind:style="{backgroundColor: `${player.team.team_color}`}" class="white--text font8 pa-1 box_shadow fontw600">
      {{player.name.length >= 10 ? (player.name.substring(0,10) + '..') : player.name}}
    </div>
    <div class="white--text font8 fontw600">
      <span>{{getStyle(player.style)}}</span>
      |
      <span>{{player.value}}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStyle(style){
      if(style == 1){
        return 'BAT'
      }else if(style == 3){
        return 'BAT/AL'
      }else if(style == 5){
        return 'BAT/WK'
      }else if(style == 7){
        return 'WK'
      }else if(style == 9){
        return 'AL'
      }else if(style == 11){
        return 'AL/BOWL'
      }else if(style == 13){
        return 'BOWL'
      }
    }
  }
};
</script>

<style type="text/css" scoped="">
  .box_shadow{
    margin-top:-8px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 0px 1px rgba(0,0,0,0.1);
    box-shadow: 0 0 0px 1px rgba(0,0,0,0.1);
  }
</style>