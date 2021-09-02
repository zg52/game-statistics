<template>
  <div>
    <application-header
			title="启动次数"
      @getTime="handleGetTime"
      @getChannel="handleGetChannel"
      @getVersion="handleGetVersion"
    />
    <div class="operationCounts-container">
      <div class="operationCounts-title">
        <span>启动次数</span>
      </div>
      <div class="operationCounts-tabs">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="新增用户">
            <div class="chart-wrapper">
              <line-chart
                name="启动次数"
                :height="hourHeight"
                :chartData="chartData"
              />
              <el-link
                style="margin-left: 16px"
                @click="changePutAwayStatus"
                type="primary"
                :underline="false"
                >{{ putAwayName }}明细数据<i
                  :class="[
                    isPutAway ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                    'el-icon--right',
                  ]"
                ></i
              ></el-link>
              <div class="operationCounts-tables">
                <a-table
                  v-if="isPutAway"
                  :columns="columns"
                  :data-source="data"
                  @change="onChangePagination"
                ></a-table>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
        <a-radio-group v-model="value" @change="onChange">
          <a-radio-button value="a" disabled> 小时 </a-radio-button>
          <a-radio-button value="b"> 天 </a-radio-button>
          <a-radio-button value="c" disabled> 周 </a-radio-button>
          <a-radio-button value="d" disabled> 月 </a-radio-button>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ApplicationHeader from "@/components/ApplicationHeader";
import LineChart from "@/echartsComponent/LineChart.vue";
import { getYearMonthDayFromOne, getYearMonthDay } from "@/utils/functions";
import { selectNewUserCountByDate } from "@/api/newUsers";

const columns = [
  {
    title: "日期",
    dataIndex: "date",
  },
  {
    title: "新增用户（占比）",
    dataIndex: "newUsers",
  },
  {
    title: "新增账号（占比）",
    dataIndex: "newAccounts",
  },
];

const data = [
  {
    key: "1",
    date: "2021-05-01",
    newUsers: "text",
    newAccounts: "text",
  },
  {
    key: "2",
    date: "2021-05-01",
    newUsers: "text",
    newAccounts: "text",
  },
];

function onChangePagination(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

export default {
  name: "NewUsers",
  data() {
    return {
      value: "a",
      hourHeight: "350px",
      chartData: {
        xAxisData: [],
        yAxisData: [],
      },
      isPutAway: true,
      data,
      columns,
      selectNewUserCountByDateData: {
        startDate: null,
        endDate: null,
        channel: null,
        version: null,
      },
    };
  },
  components: {
    ApplicationHeader,
    LineChart,
  },
  computed: {
    putAwayName() {
      return this.isPutAway ? "收起" : "展开";
    },
    // applicationId() {
    //   return this.$store.state.application.applicationId
    // },
    // ...mapState('application',['applicationId'])
    // ...mapState('application', {
    // 	applicationId: 'applicationId'
    // })
    // ...mapState({
    // 	applicationId: (state) => state.application.applicationId
    // })
    // ...mapState('application', {
    // 	applicationId: (state) => state.applicationId
    // })
    ...mapGetters(["applicationId"]),
  },
  methods: {
    async handleGetTime(msg) {
      this.selectNewUserCountByDateData.startDate = msg[0];
      this.selectNewUserCountByDateData.endDate = msg[1];
      // await this.getNewUserCountByDate(this.selectNewUserCountByDateData);
    },
    async handleGetChannel(msg) {
      this.selectNewUserCountByDateData.channel = msg.key;
      // await this.getNewUserCountByDate(this.selectNewUserCountByDateData);
    },
    async handleGetVersion(msg) {
      this.selectNewUserCountByDateData.version = msg.key;
      // await this.getNewUserCountByDate(this.selectNewUserCountByDateData);
    },
    onChangePagination,
    changePutAwayStatus() {
      this.isPutAway = !this.isPutAway;
    },
    callback(key) {
      console.log(key);
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    async getNewUserCountByDate(data) {
      // 每次请求，清空数据
      this.chartData.xAxisData.length = 0;
      this.chartData.yAxisData.length = 0;
      let res;
      try {
        res = await selectNewUserCountByDate(data);
      } catch (error) {
        console.log(error);
      }
      let { code } = res;
      if (code == 0) {
        // 做些什么
        if (res.data.length == 0) {
          this.chartData.xAxisData = [];
          this.chartData.yAxisData = [];
        } else {
          res.data.forEach((item) => {
            this.chartData.xAxisData.push(item.date);
            this.chartData.yAxisData.push(item.count);
          });
        }
      }
    },
  },
  async mounted() {
    this.selectNewUserCountByDateData.startDate = getYearMonthDayFromOne();
    this.selectNewUserCountByDateData.endDate = getYearMonthDay();
    // await this.getNewUserCountByDate(this.selectNewUserCountByDateData);

    setTimeout(() => {
      this.chartData.xAxisData = ['a', 'b', 'c', 'd', 'e', 'f'];
      this.chartData.yAxisData = [3, 2, 9, 1, 4, 4];
    }, 2000)
  },
};
</script>

<style lang="scss" scoped>
.operationCounts-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .operationCounts-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .operationCounts-tabs {
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
      .operationCounts-tables {
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

