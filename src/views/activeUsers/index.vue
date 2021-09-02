<template>
  <div>
		<application-header title="活跃用户分析"/>
		<div class="activeUsers-container">
      <div class="activeUsers-tabs">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="活跃趋势">
            <div class="chart-wrapper">
              <line-chart name="活跃用户数" :height="hourHeight" :chartData="chartDate"/>
              <el-link style="margin-left: 16px;" @click="changePutAwayStatus" type="primary" :underline="false">{{putAwayName}}明细数据<i :class="[isPutAway ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'el-icon--right']"></i></el-link>
              <div class="activeUsers-tables">
                <a-table v-if="isPutAway" :columns="columns1" :data-source="data1" @change="onChangePagination"></a-table>
              </div>
            </div>
          </a-tab-pane>
					<a-tab-pane key="2" tab="活跃构成">
            <div class="chart-wrapper">
              <line-chart name="新增用户占比" :height="hourHeight" :chartData="chartDate"/>
              <el-link style="margin-left: 16px;" @click="changePutAwayStatus" type="primary" :underline="false">{{putAwayName}}明细数据<i :class="[isPutAway ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'el-icon--right']"></i></el-link>
              <div class="activeUsers-tables">
                <a-table v-if="isPutAway" :columns="columns1" :data-source="data1" @change="onChangePagination"></a-table>
              </div>
            </div>
          </a-tab-pane>
					<a-tab-pane key="3" tab="周活跃率">
            <div class="chart-wrapper">
              <line-chart name="周活跃率" :height="hourHeight" :chartData="chartDate"/>
              <el-link style="margin-left: 16px;" @click="changePutAwayStatus" type="primary" :underline="false">{{putAwayName}}明细数据<i :class="[isPutAway ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'el-icon--right']"></i></el-link>
              <div class="activeUsers-tables">
                <a-table v-if="isPutAway" :columns="columns3" :data-source="data3" @change="onChangePagination"></a-table>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
        <a-radio-group v-model="value" @change="onChange">
          <a-radio-button value="a" disabled>
            小时
          </a-radio-button>
          <a-radio-button value="b">
            天
          </a-radio-button>
          <a-radio-button value="c" disabled>
            周
          </a-radio-button>
          <a-radio-button value="d" disabled>
            月
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ApplicationHeader from "@/components/ApplicationHeader";
import LineChart from "@/echartsComponent/LineChart.vue";

const columns1 = [
  {
    title: "日期",
    dataIndex: "date"
  },
  {
    title: "活跃用户数",
    dataIndex: "activeUsers",
  },
  {
    title: "活跃用户构成（新用户占比）",
    dataIndex: "activeUserComposition",
  },
	{
    title: "DAU/过去7日活跃用户",
    dataIndex: "dau7",
  },
	{
    title: "DAU/过去30日活跃用户",
    dataIndex: "dau30",
  }
];

const columns3 = [
  {
    title: "日期",
    dataIndex: "date"
  },
  {
    title: "活跃用户数",
    dataIndex: "activeUsers",
  },
  {
    title: "活跃用户构成（新用户占比）",
    dataIndex: "activeUserComposition",
  },
	{
    title: "用户周活跃率",
    dataIndex: "userWeeklyActivityRate",
  }
];

const data1 = [
  {
    key: "1",
    date: "2021-05-01",
    activeUsers: 'text',
    activeUserComposition: 'text',
		dau7: 'text',
		dau30: 'text'
  },
];

const data3 = [
  {
    key: "1",
    date: "2021-05-01",
    activeUsers: 'text',
    activeUserComposition: 'text',
		userWeeklyActivityRate: 'text',
  },
];

function onChangePagination(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

export default {
  name: "activeUsers",
  data() {
    return {
      value: 'a',
      hourHeight: '350px',
      chartDate: {
        x:1
      },
      isPutAway: true,
      data1,
      columns1,
			data3,
      columns3,
    }
  },
  components: {
    ApplicationHeader,
    LineChart
  },
  computed: {
    putAwayName() {
      return this.isPutAway ? '收起' : '展开'
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
    onChangePagination,
    changePutAwayStatus() {
      this.isPutAway = !this.isPutAway
    },
    callback(key) {
      console.log(key);
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    }
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style lang="scss" scoped>
.activeUsers-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .activeUsers-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .activeUsers-tabs {
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
      .activeUsers-tables {
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

