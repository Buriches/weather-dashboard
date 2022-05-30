<template>
  <div>
    <div  v-if="type==='Hourly'">
      <div class="hourweather" @click="overlayActive">
        <div class="hourweather__time col" >{{new Date(hour.dt * 1000).getHours()}}:00</div>
        <div class="hourweather__weather col">
          <img class="hourweather__icon" :src="require(`../assets/images/icons/weather/${setIcon}.svg`)" alt="">
          <span>{{hour.weather[0].main}}</span>
        </div>
        <div class="hourweather__temp col">{{Math.round(hour.temp)}}°C</div>
      </div>
      <div class="newDay" v-if="new Date(hour.dt * 1000).getHours() === 23">
        The next day {{timeInTwoCharacter(new Date(hour.dt * 1000).getMonth() + 1)}}.{{timeInTwoCharacter(new Date(hour.dt * 1000).getDate() + 1)}}
      </div>
    </div>


    <div class="hourweather daily" v-else-if="type==='Daily'" @click="overlayActive">
      <div class="hourweather__time daily__date col">{{ dayAWeek() }}</div>
      <div class="col"></div>
      <div class="hourweather__description col">
        <img class="hourweather__icon" :src="require(`../assets/images/icons/weather/${setIcon}.svg`)" alt="">
        <span>{{day.weather[0].main}}</span>
      </div>
      <div class="hourweather__temp col">{{Math.round(day.temp.max)}} / {{Math.round(day.temp.min)}}°C</div>
    </div>
  </div>
</template>
<script>
import {setIcon, timeInTwoCharacter} from "@/scripts/service";
import {mapMutations} from "vuex";

export default {
  props: ['day', 'hour', 'type', 'index'],
  data(){
    return{

    }
  },
  methods:{
    ...mapMutations(['ACTIVATE_OVERLAY', 'SET_OVERLAY_KEY']),
    overlayActive(){
      const output = {
        type: this.type,
        index: this.index
      }
      this.SET_OVERLAY_KEY(output)
    },
    dayAWeek(){
      let res
      const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const numberOfWeek = String(new Date(this.day.dt * 1000).getDay())


      if (this.index === 0){
        res = 'Today'
      }else if(this.index === 1){
        res = 'Tomorrow'
      }else{
        res = week[numberOfWeek]
      }
      this.day.name = res
      return res
    },
    timeInTwoCharacter(time){
      return timeInTwoCharacter(time)
    }
  },
  computed: {
    setIcon(){
      let iconCode
      if (this.type==='Hourly'){
        iconCode = this.hour.weather[0].icon
      }else if (this.type==='Daily'){
        iconCode = this.day.weather[0].icon
      }
      return setIcon(iconCode)
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/styles/styles";
.newDay{
  text-align: center;
}
.daily .col{
  width: 22%;
  &:nth-last-of-type(2){
    text-align: left;

  }
}
.col{
  width: 33.33%;

}
.hourweather{
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 30px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.03em;
  color: $text-color;
  &__icon{
    width: 22px;
    height: 22px;
    margin-right: 6px;
  }
  &:hover{
    background-color: $bk-selection;
  }
  &__temp{
    text-align: right;
  }
  &__weather{
    display: flex;
    text-transform: lowercase;
    justify-content: center;
  }
  &__description{
    text-align: center;
    display: flex;
    text-transform: lowercase;
  }
}
.newDay{
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.03em;
  color: #3C3C3C;
  opacity: 0.8;
  margin: 15px auto;
  margin-bottom: 5px;
}

h1{
  font-size: 4rem;
}
h3{
  text-transform: capitalize;
  margin-bottom: 1rem;
}
h4{
  font-size: 1.3rem;
}
</style>