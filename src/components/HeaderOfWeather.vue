<template>
  <div class="header">
    <div class="header__col">
      <div class="header__top">
        <div>
          <h2>{{this.LOCATION_NAME.country}}  <span v-if="this.LOCATION_NAME.country!=='Your location'">, {{this.LOCATION_NAME.name}}</span></h2>
          <span class="header__temp">{{this.ALL_INFO.hourly[0].temp}}°C</span>
        </div>
        <span class="header__time">{{timeInTwoCharacter(new Date(GET_LOADEDTIME).getHours())}}:{{timeInTwoCharacter(new Date(GET_LOADEDTIME).getMinutes())}}</span>
      </div>
      <div class="header__bottom">
          <div class="header__bottom_temp">
            <img :src="require(`../assets/images/icons/weather/${icon}.svg`)" alt="">
            <span>{{this.ALL_INFO.hourly[0].weather[0].description}}</span>
          </div>
          <div class="header__bottom_icon">
            <img src="../assets/images/icons/share.svg" alt="">
            <img src="../assets/images/icons/star-icon.svg" alt="" @click="addBookmark" v-if="!GET_BOOKMARK_STAR_FULL">
            <img src="../assets/images/icons/star-icon-full.svg" alt="" @click="addBookmark" v-else>
          </div>
      </div>
    </div>
    <div class="header__col">
      <div class="header__col_item"><div>Feels like</div><span>{{ this.ALL_INFO.hourly[0].feels_like }}°C</span></div>
      <div class="header__col_item"><div>Humidity</div><span>{{ this.ALL_INFO.hourly[0].humidity }}%</span></div>
      <div class="header__col_item"><div>Precipitation</div><span>{{ Math.round(this.ALL_INFO.hourly[0].pop*100)  }}%</span></div>
      <div class="header__col_item"><div>Visibility</div><span>{{ this.ALL_INFO.hourly[0].visibility }}m</span></div>
      <div class="header__col_item"><div>UVI</div><span>{{ this.ALL_INFO.hourly[0].uvi }}uW/cm²</span></div>
      <div class="header__col_item"><div>Wind speed</div><span>{{ Math.round(this.ALL_INFO.hourly[0].wind_speed) }}km/h</span></div>
      <div class="header__direction">
        <div class="header__compass">
          <span>Direction</span>
          <img src="../assets/images/icons/compass.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {setIcon, timeInTwoCharacter} from "@/scripts/service";

export default {
  name: "HeaderOfWeather",
  computed: {
    ...mapGetters([
      'LOCATION_NAME', 'ALL_INFO', 'GET_BOOKMARKS', 'GET_LOADEDTIME', 'GET_BOOKMARK_STAR_FULL'
    ]),
    icon(){
      let iconCode = this.ALL_INFO.hourly[0].weather[0].icon
      return setIcon(iconCode)
    }
  },
  methods: {
    ...mapMutations(['ADD_BOOKMARK', 'BOOKMARK_STAR_FULL']),
    addBookmark(){
      if (this.LOCATION_NAME.country === 'Your location'){
        return
      }
      let name
      let country
      if(this.LOCATION_NAME.name){
        name = this.LOCATION_NAME.name
        country = this.LOCATION_NAME.country
      }else {
        name = 'Your location'
        country = 'Your location'
      }
      let dublicate = false
      this.GET_BOOKMARKS.forEach((index) => {
          if (index.name === this.LOCATION_NAME.name && index.country === this.LOCATION_NAME.country){
            dublicate = true
          }
      })
      if (!dublicate){
        const get = {name: name, country: country, lat: this.ALL_INFO.lat, lon: this.ALL_INFO.lon}
        this.ADD_BOOKMARK(get)
        const obj = this.GET_BOOKMARKS
        const jsonObg = JSON.stringify(obj)
        localStorage.setItem('bookmarks', jsonObg)
        this.BOOKMARK_STAR_FULL(true)

      }
    },
    timeInTwoCharacter(time){
      return timeInTwoCharacter(time)
    }
  },

}
</script>

<style scoped lang="scss">
@import "src/assets/styles/styles";
h1{
  font-size: 4rem;
}
h3{
  text-transform: capitalize;
  margin-bottom: 1rem;
}
</style>