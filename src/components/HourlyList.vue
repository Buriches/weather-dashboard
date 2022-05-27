<template>
  <div class="wrap__inner">
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
    }
  },
}
</script>
<style scoped>

</style>