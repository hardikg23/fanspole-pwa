<template>
  <div align="center">
    <table width="95%" class="my-3" style="height:15vh;">
      <tr align="center">
        <td v-for="player in players" :key="player.id">
          <div class="white--text font6" style="height:0px;">
            <div v-if="player.id == captain" class="captain">C</div>
          </div>
          <div style="display: inline-block;">
            <div style="z-index: -5;">
              <img v-bind:src="player.team.jersey_photo" style="width:44px;height: 44px;">
            </div>
            <div v-bind:style="{backgroundColor: `${player.team.team_color}`}" class="white--text font7 box_shadow fontw600" style="min-width:66px;padding: 1px;">
              {{player.display_name}}
            </div>
            <div class="white--text font8 fontw600 pa-0">
              <span v-html="player.display_info"></span>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    players: {
      type: Array,
      required: true
    },
    captain: {
      type: Number
    }
  }
};
</script>

<style type="text/css" scoped="">
  .captain{
    position:relative;
    top:-4px;
    left:-26px;
    background: #000;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 3px;
  }
  .box_shadow{
    margin-top:-8px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 0px 1px rgba(0,0,0,0.1);
    box-shadow: 0 0 0px 1px rgba(0,0,0,0.1);
  }
</style>