<template>
  <div>
		<eventStatistics-header
			title="自定义事件"
      @getTime="handleGetTime"
      @getChannel="handleGetChannel"
      @getEvent="handleGetEvent"
    />
		<div class="newUsers-container">
      <div class="newUsers-title">
        <span>事件统计</span>
      </div>
      <div class="newUsers-tabs">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="消息数量">
            <div class="chart-wrapper">
              <line-chart name="消息数量" :height="hourHeight" :chartData="chartData"/>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import EventStatisticsHeader from "@/components/EventStatisticsHeader";
import LineChart from "@/echartsComponent/LineChart.vue";
import { getYearMonthDayFromOne, getYearMonthDay } from "@/utils/functions";
import { channelSelectListVO } from "@/api/customEventStatistics";

export default {
  name: "customEventStatistics",
  data() {
    return {
      hourHeight: '350px',
      chartData: {
        xAxisData: [],
        yAxisData: []
      },
      channelSelectListVOData: {
        startDate: null,
        endDate: null,
        channel: null,
        event: null,
      }
    }
  },
  components: {
    EventStatisticsHeader,
    LineChart
  },
  computed: {
    ...mapGetters(["applicationId"]),
  },
  methods: {
    async handleGetTime(msg) {
      this.channelSelectListVOData.startDate = msg[0];
      this.channelSelectListVOData.endDate = msg[1];
			await this.getChannelSelectListVO(this.channelSelectListVOData)
    },
    async handleGetChannel(msg) {
      this.channelSelectListVOData.channel = msg.key;
			await this.getChannelSelectListVO(this.channelSelectListVOData)
    },
    async handleGetEvent(msg) {
      this.channelSelectListVOData.event = msg.key;
			await this.getChannelSelectListVO(this.channelSelectListVOData)
    },
    callback(key) {
      console.log(key);
    },
    async getChannelSelectListVO(data) {
      // 每次请求，清空数据
      this.chartData.xAxisData.length = 0;
      this.chartData.yAxisData.length = 0;
      let res;
      try {
        res = await channelSelectListVO(data)
      } catch (error) {
        console.log(error)
      }
      let { code } = res;
      if ( code == 0 ) {
        // 做些什么
        if (res.data.length == 0) {
          this.chartData.xAxisData = [];
          this.chartData.yAxisData = [];
        } else {
          res.data.forEach(item => {
            this.chartData.xAxisData.push(item.date)
            this.chartData.yAxisData.push(item.count)
          })
        }
      }
    }
  },
  async mounted() {
    this.channelSelectListVOData.startDate = getYearMonthDayFromOne();
    this.channelSelectListVOData.endDate = getYearMonthDay();
		await this.getChannelSelectListVO(this.channelSelectListVOData)
  },
};
</script>

<style lang="scss" scoped>
.newUsers-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .newUsers-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .newUsers-tabs {
    position: relative;
    >>> .ant-tabs {
      .ant-tabs-bar {
        border-bottom: none;
        .ant-tabs-nav-container {
          .ant-tabs-nav-wrap {
            .ant-tabs-tab {
              padding: 12px 0;
            }
            .ant-tabs-ink-bar {
              width: 56px;
            }
          }
        }
      }
      .newUsers-tables {
        margin: 24px auto 16px;
      }
    }
    >>> .ant-radio-group {
      position: absolute;
      top: 3px;
      right: 0px;
      padding: 4px 0;
      .ant-radio-button-wrapper {
        margin-right: 8px;
      }
    }
    // chart
    .chart-wrapper {
      background: #fff;
      padding: 16px 0 0;
      margin-bottom: 32px;
    }
  }
}
</style>

