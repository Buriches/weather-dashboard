<template>
  <div id="search">
    <div class="search__main">
      <div class="search__outer">
        <img src="../assets/images/icons/search-icon.svg">
        <form class="search" v-on:submit.prevent="$emit('getCityName', cityName)">
            <input autocomplete="off" type="text" placeholder="search city" v-model="cityName">
        </form>
      </div>
      <div class="search__bookmark">
        <img src="../assets/images/icons/bookmark-icon.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        cityName: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "src/assets/styles/styles";
  #search{
    display: flex;
    justify-content: flex-end;

  }
  .search{
    width: calc(100% - 44px);
    &__main{
      width: calc(34.87% - 20px);
      display: flex;
      justify-content: space-between;
    }
    &__outer{
      border: $border;
      border-radius: 10px;
      width: calc(100% - 64px);
      display: flex;
      align-items: center;
      padding: 10px 15px;
      height: 44px;
      box-sizing: border-box;
      justify-content: space-between;
    }
    &__bookmark{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      border: $border;

    }
  }
  input{
    color: $text-color;
    border:none;
    outline:none;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    width: 100%;
  }
</style>