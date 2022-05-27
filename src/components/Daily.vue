<template>
  <div class="wrap__daily">
    <div class="wrap">
      <h3>7 days ahead</h3>
      <hr>
      <daily-list v-bind:daily="daily"/>
    </div>
    <overlay
        v-if="this.GET_OVERLAY_TYPE_DAILY"
        :type="type"
    />
  </div>
</template>

<script>
import DailyList from "@/components/DailyList";
import Overlay from "@/components/Overlay";
import {mapGetters} from "vuex";

export default {
  name: "Daily",
  data(){
    return{
      type: 'Daily',
    }
  },
  props: ['daily'],
  components: {DailyList, Overlay},
  computed:{
    ...mapGetters(['GET_OVERLAY_TYPE_DAILY'])
  }
}
</script>

<style scoped>

</style>