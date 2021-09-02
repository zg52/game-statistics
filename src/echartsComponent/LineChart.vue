<template>
  <div class="chart-original" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
			// console.log(this.$el, '~~~')
      // this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions(expectedData) {
      this.chart.setOption({
        xAxis: {
          data: expectedData.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: true
          },
        },
        grid: {
          left: 30,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          name: this.name,
          nameLocation: 'middle',
          nameGap: 30,
          nameRotate: 90,
          minInterval: 1,
          axisTick: {
            show: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        legend: {
          right: 30,
          data: [{
            name: this.name,
            icon: 'rect'
          }]
        },
        series: [{
          name: this.name,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#40a9ff',
              lineStyle: {
                color: '#40a9ff',
                width: 2
              }
            }
          },
          // smooth: true, // 曲线
          type: 'line',
          data: expectedData.yAxisData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-original {
  margin: 0 16px;
}
</style>