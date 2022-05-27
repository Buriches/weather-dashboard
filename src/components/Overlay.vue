<template>
<div class="overlay">
  <div class="overlay__head" @click="close(type)">
    <img src="../assets/images/icons/left.svg">
    <span>Back</span>
  </div>
  <hr>
  <div v-if='type==="Daily"'>
  <h3 class="overlay__title">{{this.GET_OVERLAY_DAILY.name}}<img :src="require(`../assets/images/icons/weather/${setIcon}.svg`)" alt=""></h3>

  <div class="overlay__content">
    <div class="overlay__col">
      <div class="overlay__item">
        <span>Temperature:</span>
        <span>{{this.GET_OVERLAY_DAILY.temp.max}} / {{this.GET_OVERLAY_DAILY.temp.min}}°C</span>
      </div>
      <div class="overlay__item">
        <span>Feels like:</span>
        <span>{{this.GET_OVERLAY_DAILY.feels_like.eve}} / {{this.GET_OVERLAY_DAILY.feels_like.morn}}°C</span>
      </div>
      <div class="overlay__item">
        <span>Dew point:</span>
        <span>{{this.GET_OVERLAY_DAILY.dew_point}}°C</span>
      </div>
      <div class="overlay__item">
        <span>Pressure:</span>
        <span>{{this.GET_OVERLAY_DAILY.pressure}}mm</span>
      </div>
      <div class="overlay__item">
        <span>Humidity:</span>
        <span>{{this.GET_OVERLAY_DAILY.humidity}}%</span>
      </div>
      <div class="overlay__item">
        <span>PoP🌧️</span>
        <span>{{Math.round(this.GET_OVERLAY_DAILY.pop) * 100}}%</span>
      </div>
    </div>
    <div class="overlay__vertical_line"></div>
    <div class="overlay__col">
      <div class="overlay__item">
        <span>Sunrise/set</span>
        <span>
          {{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.sunrise * 1000).getHours())}}:{{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.sunrise * 1000).getMinutes())}}
          / {{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.sunset * 1000).getHours())}}:{{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.sunset * 1000).getMinutes())}}
        </span>
      </div>
      <div class="overlay__item">
        <span>Moonrise/set</span>
        <span>
          {{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.moonrise * 1000).getHours())}}:{{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.moonrise * 1000).getMinutes())}}
          / {{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.moonset * 1000).getHours())}}:{{timeInTwoCharacter(new Date(this.GET_OVERLAY_DAILY.moonset * 1000).getMinutes())}}
        </span>
      </div>
      <div class="overlay__item">
        <span>Wind speed:</span>
        <span>{{Math.round(this.GET_OVERLAY_DAILY.wind_speed)}}km/h</span>
      </div>
      <div class="overlay__item">
        <span>Wind deg:</span>
        <span>{{this.GET_OVERLAY_DAILY.wind_deg}}°</span>
      </div>
      <div class="overlay__item">
        <span>UVI:</span>
        <span>{{this.GET_OVERLAY_DAILY.uvi}}uW/cm²</span>
      </div>
      <div class="overlay__item">
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
  </div>
  <div v-if='type === "Hourly"'>
    <h3 class="overlay__title">{{day}} {{timeInTwoCharacter(new Date(this.GET_OVERLAY_HOURLY.dt * 1000).getHours())}}:{{timeInTwoCharacter(new Date(this.GET_OVERLAY_HOURLY.dt * 1000).getMinutes())}}<img :src="require(`../assets/images/icons/weather/${setIcon}.svg`)" alt=""></h3>
    <div class="overlay__content">
      <div class="overlay__one-column">
        <div class="overlay__item">
          <span>Temperature:</span>
          <span>{{this.GET_OVERLAY_HOURLY.temp}}°C</span>
        </div>
        <div class="overlay__item">
          <span>Feels like:</span>
          <span>{{this.GET_OVERLAY_HOURLY.feels_like}}°C</span>
        </div>
        <div class="overlay__item">
          <span>Dew point:</span>
          <span>{{this.GET_OVERLAY_HOURLY.dew_point}}°C</span>
        </div>
        <div class="overlay__item">
          <span>Pressure:</span>
          <span>{{this.GET_OVERLAY_HOURLY.pressure}}mm</span>
        </div>
        <div class="overlay__item">
          <span>Humidity:</span>
          <span>{{this.GET_OVERLAY_HOURLY.humidity}}%</span>
        </div>
        <div class="overlay__item">
          <span>PoP🌧️</span>
          <span>{{Math.round(this.GET_OVERLAY_HOURLY.pop) * 100}}%</span>
        </div>
        <div class="overlay__item">
          <span>Wind speed:</span>
          <span>{{Math.round(this.GET_OVERLAY_HOURLY.wind_speed)}}km/h</span>
        </div>
        <div class="overlay__item">
          <span>Wind deg:</span>
          <span>{{this.GET_OVERLAY_HOURLY.wind_deg}}°</span>
        </div>
        <div class="overlay__item">
          <span>UVI:</span>
          <span>{{this.GET_OVERLAY_HOURLY.uvi}}uW/cm²</span>
        </div>
        <div class="overlay__item">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
  <p class="overlay__time">
    updated on {{timeInTwoCharacter(new Date(GET_LOADEDTIME).getMonth() + 1)}}.{{timeInTwoCharacter(new Date(GET_LOADEDTIME).getDate())}} at {{timeInTwoCharacter(new Date(GET_LOADEDTIME).getHours())}}:{{timeInTwoCharacter(new Date(GET_LOADEDTIME).getMinutes())}}
  </p>
</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {timeInTwoCharacter, setIcon} from "@/scripts/service";
export default {
  name: "Overlay",
  methods: {
    ...mapMutations(['DEACTIVATE_OVERLAY']),
    close(type){
      this.DEACTIVATE_OVERLAY(type)
    },
    timeInTwoCharacter(time){
      return timeInTwoCharacter(time)
    }
  },
  props:{
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['GET_LOADEDTIME', 'GET_OVERLAY_DAILY', 'GET_OVERLAY_HOURLY']),

    setIcon(){
      let iconCode
      if (this.type === 'Daily'){
        iconCode = this.GET_OVERLAY_DAILY.weather[0].icon
      }else if(this.type === 'Hourly'){
        iconCode = this.GET_OVERLAY_HOURLY.weather[0].icon
      }
      return setIcon(iconCode)
    },
    day(){
      let day
      if (this.type === 'Daily'){
        day = this.GET_OVERLAY_DAILY.dt * 1000
      }else if(this.type === 'Hourly'){
        day = this.GET_OVERLAY_HOURLY.dt * 1000
      }
      if (new Date(day).getDate() === new Date(Date.now()).getDate()){
        return "Today"
      }else if(new Date(day).getDate() === new Date(Date.now()).getDate() + 1){
        return "Tomorrow"
      }else{
        return `${timeInTwoCharacter(new Date(day).getMonth() + 1)}.${timeInTwoCharacter(new Date(day).getDate())}`
      }

    }
  }
}
</script>

<style scoped>

</style>