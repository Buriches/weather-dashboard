<template>
  <div class="wrap__hourly">
    <div class="wrap">
      <h3>48 hours ahead:</h3>
      <hr>
      <chart :weather48h="hourly"/>
      <hourly-list :hourly="hourly"/>
    </div>
    <overlay
        v-if="this.GET_OVERLAY_TYPE_HOURLY"
        :type="type"
    />
  </div>
</template>

<script>
import Overlay from "@/components/Overlay";
import HourlyList from '@/components/HourlyList'
import Chart from "@/components/Chart";
import {mapGetters} from "vuex";
export default {
  name: "Hourly",
  props: ['hourly'],
  components: {HourlyList, Chart, Overlay},
  computed:{
    ...mapGetters(['GET_OVERLAY_TYPE_HOURLY'])
  },
  data(){
    return{
      type: 'Hourly'
    }
  }
}
</script>

<style scoped>

</style>