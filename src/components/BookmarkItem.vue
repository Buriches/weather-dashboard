<template>
<div class="bookmark" @click="searchForBookmark" v-if="bookmark.name !== 'location'" :class="{bookmark__active: isActive}">
  {{ bookmark.name }}
  <img src="../assets/images/icons/bookmark-icon.svg" alt="" class="bookmark__icon">
  <img src="../assets/images/icons/trash.svg" alt="" class="bookmark__close">
</div>
  <div class="bookmark" @click="toUserLocation" v-else>
    My location
    <img src="../assets/images/icons/bookmark-icon.svg" alt="">

  </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from "vuex";


export default {
  name: "BookmarkItem",
  props: {
    bookmark: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters(['USER_LOCATION', 'GET_BOOKMARK_ACCENT']),
    isActive(){
      if (this.GET_BOOKMARK_ACCENT === this.bookmark.id){
        return true
      }
      return false
    }

  },
  methods: {
    ...mapActions(['SEARCH_FINAL']),
    ...mapMutations(['SET_FOR_BOOKMARK', 'REMOVE_BOOKMARK', 'setPosition', 'setLocationName', 'BOOKMARK_STAR_FULL']),
    searchForBookmark(e){
      if (!e.target.classList.contains('bookmark__close')){
        this.SET_FOR_BOOKMARK({naming: {country: this.bookmark.country, name: this.bookmark.name}, coordinates: {lon: this.bookmark.lon, lat: this.bookmark.lat}})
      }else {
        this.removeBookmark()
      }
    },
    removeBookmark(){
      this.REMOVE_BOOKMARK(this.bookmark.id)

    },
    toUserLocation(){
      this.setPosition(this.USER_LOCATION)
      this.setLocationName({
        name: 'Your location', country: 'Your location'
      })
      this.SEARCH_FINAL()
    }
  },


}
</script>

<style scoped lang="scss">
@import "src/assets/styles/styles";

</style>