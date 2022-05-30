<template>
  <div class="wrap__inner" id="hourlyList" :style="{maxHeight: `calc(100% - ${heightOfChart}px - 121px)`}">
    <weather-item
        v-for="(item, index) of hourly" v-bind:key="index"
        v-bind:hour="item"
        v-bind:type="type"
        v-bind:index="index"
    ></weather-item>


  </div>
</template>
<script>
import weatherItem from "@/components/WeatherItem";
export default {
  props: ['hourly'],

  components:{weatherItem},
  data(){
    return{
      type: 'Hourly',
      heightOfChart: 100
    }
  },

  mounted() {
    const forThis = this
    const chart = document.getElementById('chart')
    this.setHeightOfList(chart.offsetHeight)
    window.addEventListener('resize', function(event){
      forThis.setHeightOfList(chart.offsetHeight)}, true);
  },
  methods: {
    setHeightOfList(chartHeight){
      this.heightOfChart = chartHeight
    }
  }
}
</script>
<style scoped lang="scss">

</style>