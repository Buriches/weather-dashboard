<template>
  <div id="app">
    <h2 id="geoError" v-if="!LOCATION_IS_ALLOWED">You did not allow the use of geolocation, so you need to enter your city manually</h2>
    <search v-on:getCityName="getLocation"
    ></search>
    <weather
        v-if="ALL_INFO"
    ></weather>
  </div>
</template>

<script>

import search from '@/components/Search'
import weather from '@/components/Weather'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import store from "@/store";

export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters([
        'KEY', 'USER_POSITION', 'ALL_INFO', 'LOCATION_IS_ALLOWED', 'GET_BOOKMARKS'
    ]),


  },
  mounted() {
    navigator.geolocation.getCurrentPosition(this.success, this.error)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        store.commit('closeModal')
      }
    })
    if (JSON.parse(localStorage.getItem('bookmarks'))){
      this.SET_BOOKMARKS(JSON.parse(localStorage.getItem('bookmarks')))
    }
  },
  components: {
    search, weather
  },

  methods: {
    ...mapMutations(['SET_BOOKMARKS', 'setLocationName', 'setPosition', 'setLocation', 'locationNotAllowed']),
    ...mapActions(['GET_LOCATION', 'SEARCH_FINAL']),
    success(position){
      const userPosition = {lat: position.coords.latitude, lon: position.coords.longitude}
      this.setPosition(userPosition)
      this.setLocation(userPosition)
      this.SEARCH_FINAL()
      this.setLocationName({name: 'Your location', country: 'Your location'})

    },
    error() {
      this.locationNotAllowed()
    },
    getLocation(cityName){
      this.GET_LOCATION(cityName)
    }

  }
}
</script>

<style>

</style>
