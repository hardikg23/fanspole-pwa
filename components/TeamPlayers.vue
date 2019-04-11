<template>
  <div align="center">
    <table width="95%" class="my-3">
      <tr align="center">
        <td v-for="player in players" :key="player.id">
          <div style="display: inline-block;">
            <div style="z-index: -5;">
              <img v-bind:src="player.team.jersey_photo" style="width:40px;height: 40px;">
            </div>
            <div v-bind:style="{backgroundColor: `${player.team.team_color}`}" class="white--text font7 box_shadow fontw600" style="width:75px;padding: 2px;">
              {{player.display_name}}
            </div>
            <div class="white--text font6">
              <span>{{player.display_info}}</span>
              
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