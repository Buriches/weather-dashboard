<template>
<div class="chart">
  <canvas id="chart"></canvas>
<div class="chart__title">
  <img src="../assets/images/icons/bar-chart.svg" alt="">
  <span>temperature changing</span>
</div>
</div>
</template>

<script>
export default {
  name: "Graph",
  mounted() {
    const canvas = document.getElementById('chart')
    const ctx = chart.getContext('2d');
    ctx.fillStyle = "#00A3FF";
    let maxPoint = this.weather48h[0].temp
    let minPoint = this.weather48h[0].temp
    this.weather48h.forEach((index)=>{
      if (index.temp > maxPoint){
        maxPoint = index.temp
      }
    })
    this.weather48h.forEach((index)=>{
      if (index.temp < minPoint){
        minPoint = index.temp
      }
    })

    const height = 20
    const diff = maxPoint - minPoint
    const heightUnit = diff / height
    for (let i = 0; i < this.weather48h.length; i++){
      const currentPoint = this.weather48h[i].temp - minPoint
      this.weather48h[i].position = Math.round(currentPoint / heightUnit)
    }
    let prevX = 0
    let prevY = canvas.offsetHeight / height * (height - this.weather48h[0].position)

    for (let i = 0; i < this.weather48h.length; i++){
      const y = canvas.offsetHeight / height * (height - this.weather48h[i].position)
      //ctx.fillRect(i*canvas.offsetWidth/80, y*2.5, 4, 5)
      //console.log(y)
      ctx.beginPath();
      ctx.strokeStyle = '#00A3FF'

      ctx.moveTo(prevX,prevY);
      ctx.lineTo(i*canvas.offsetWidth/68, y*2.7);
      ctx.lineWidth = 2;
      ctx.stroke();
      prevX = i*canvas.offsetWidth/68;
      prevY = y*2.7;
    }

  },
  props: {
    weather48h: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss">

</style>