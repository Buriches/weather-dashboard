<template>
<div class="chart" @click="paintTheChart">
  <canvas id="chart"></canvas>
<div class="chart__title">
  <img src="../assets/images/icons/bar-chart.svg" alt="">
  <span>temperature change for 24 hours</span>
</div>
</div>
</template>
<script>
import Chart from "chart.js/auto"
import {timeInTwoCharacter} from "@/scripts/service";

export default {
  name: "Graph",
  props: ['weather48h'],
  data(){
    return {
        myChart: ''
    }
  },
  mounted() {
    this.paintTheChart();
  },
  watch: {
    weather48h: function (){
      this.paintTheChart();
    }
  },
  methods: {
    paintTheChart(){
      if (this.myChart){
        this.myChart.destroy()
      }
      let labels = [];
      for (let i = 0; i < 24; i++){
        labels.push(this.dateAndTime(this.weather48h[i].dt))
      }
      let arrOfTemperatures = this.weather48h.map(i => i.temp)
      arrOfTemperatures.length = 24
      const data = {
        labels: labels,
        datasets: [{
          label: 'Temperature',
          backgroundColor: 'transparent',
          borderColor: '#00A3FF',
          data: arrOfTemperatures,

        }]
      };
      const options = {
        bezierCurve : 100,
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            tension: .3
          },
          point:{
            radius: 3
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
              lineWidth: 0.5,
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
              lineWidth: 0.5,
            },
            ticks: {
              display: false,

            }
          },
        },
      }

      const config = {
        type: 'line',
        data: data,
        options: options
      };
      this.myChart = new Chart(
          document.getElementById('chart'),
          config
      );

    },
    dateAndTime(dt){
      let time = new Date(dt*1000)
      return `${timeInTwoCharacter(time.getMonth() + 1)}.${timeInTwoCharacter(time.getDate())} ${time.getHours()}:00`
    }
  }
}
</script>

<style lang="scss">

</style>