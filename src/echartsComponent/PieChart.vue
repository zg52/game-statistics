<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
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
      default: '300px'
    },
    pieData: {
      type: Array,
      required: true
    },
    pieTitle: {
      type: String,
      required: true
    },
    pieDataArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    pieData: {
      deep: true,
      handler(val) {
        this.initChart(val, this.pieTitle, this.pieDataArr)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.pieData, this.pieTitle, this.pieDataArr)
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
    initChart(val, title, dataArr) {
      let flag = 0
      for ( let i = 0; i <= val.length - 1; i++ ) {
        if ( val[i]['value'] == 0 ) {
          flag++
        }
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: title,
          left: 'center',
          top: 0
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '5',
          data: dataArr,
        },
        series: [
          {
            name: title,
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: flag == val.length ? [{value: 0, name: '暂无数据'}] : val,
            center: ['50%', '50%'],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            // stillShowZeroSum: false, // 无数据不显示饼状图
            itemStyle: {
              color: flag == val.length ? '#ccc' : '',
            }
          }
        ]
      })
    }
  }
}
</script>