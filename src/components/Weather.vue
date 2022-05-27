<template>
  <div class="wrapper">
      <div class="weather">
        <div class="wrap__main">
          <div class="caption">
            <h1>Weather broadcast</h1>
            <span>by KirilPepega & DeinsOne</span>
          </div>
          <header-of-weather></header-of-weather>
          <bookmark-list/>
          <daily :daily="ALL_INFO.daily"/>
        </div>
        <hourly :hourly="ALL_INFO.hourly"/>
      </div>
    </div>
</template>
<script>
import Hourly from '@/components/Hourly'
import Daily from "@/components/Daily"
import HeaderOfWeather from "@/components/HeaderOfWeather";
import {mapGetters} from "vuex";
import BookmarkList from "@/components/BookmarkList";
export default {
  components:{
    Hourly, Daily, HeaderOfWeather, BookmarkList
  },
  computed: {
    ...mapGetters([
      'LOCATION_NAME', 'ALL_INFO'
    ])
  },
}
</script>
<style scoped lang="scss">
@import "src/assets/styles/styles";
  .weather{
    width: 100%;
    height: calc(100vh - 60px - 44px);
    margin: 1vh auto;
    box-sizing: border-box;
    border-radius: 3px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 426px) {
    .wrapper{
      padding-left: 0;
    }

    .weather{
      height: 89vh;
    }
  }
</style>