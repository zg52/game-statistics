<template>
  <div>
    <customEvent-header
			title="自定义事件"
      @getTime="handleGetTime"
      @getVersion="handleGetVersion"
      @getEvent="handleGetEvent"
    />
    <div class="newUsers-container">
      <div class="newUsers-title">
        <span>事件列表</span>
      </div>
      <div class="newUsers-tabs">
        <div class="newUsers-tables">
					<a-table
            :loading="loading"
            :pagination="pagination"
            rowKey="id"
            :columns="columns"
            :data-source="listData"
            @change="onChange"
					>
					<!-- <span slot="eventName" slot-scope="text, record">
						<template>
							<a href="javascript:;" @click="handleGoTo(record)">{{text}}</a>
						</template>
					</span> -->
					<span slot="action" slot-scope="text, record">
						<template>
							<a href="javascript:;" @click="handleGoTo(record)">详情</a>
						</template>
					</span>
					</a-table>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomEventHeader from "@/components/CustomEventHeader";
import { getYearMonthDayFromOne, getYearMonthDay } from "@/utils/functions";
import { getGmEventData } from "@/api/customEvent";

const columns = [
  {
    title: "事件ID",
    dataIndex: "eventId",
		sorter: (a, b) => a.eventId.length - b.eventId.length,
  },
  {
    title: "事件名称",
    dataIndex: "eventName",
		sorter: (a, b) => a.name.length - b.name.length,
    // scopedSlots: { customRender: "eventName" },
  },
  {
    title: "昨日消息数",
    dataIndex: "lastDayMsgCount",
		sorter: (a, b) => a.lastDayMsgCount - b.lastDayMsgCount,
  },
	{
    title: "今日消息数",
    dataIndex: "toDayMsgCount",
		sorter: (a, b) => a.toDayMsgCount - b.toDayMsgCount,
  },
	{
    title: "操作",
		dataIndex: 'action',
		scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "CustomEvent",
  data() {
    return {
      columns,
      listData: [],
      columns,
      pagination: {
        pageSize: 10,
        total: 0,
      },
      queryParam: {
        current: 1,
        size: 10,
        startDate: null,
        endDate: null,
        version: null,
        event: null,
      },
      loading: false,
    };
  },
  components: {
    CustomEventHeader,
  },
  methods: {
    async getDataFromServer() {
      this.loading = true;
      let res;
      try {
        res = await getGmEventData(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        let newRes = JSON.parse(JSON.stringify(res.data.records))
        newRes.forEach((item, index) => {
          item['id'] = index
        })
        this.listData = newRes;
        this.pagination.total = res.data.total;
      }
    },
    async onChange(pagination) {
      this.loading = true;
      this.queryParam.current = pagination.current;
      let res;
      try {
        res = await getGmEventData(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        let newRes = JSON.parse(JSON.stringify(res.data.records))
        newRes.forEach((item, index) => {
          item['id'] = index
        })
        this.listData = newRes;
        this.queryParam.current = res.data.current;
      }
    },
		handleGoTo(x) {
      console.log(x, 'handleGoTo')
			this.$router.push({
				path: `/customEventStatistics/${x.eventId}`,
			})
    },
    async handleGetTime(msg) {
      this.queryParam.startDate = msg[0];
      this.queryParam.endDate = msg[1];
      await this.getDataFromServer()
    },
    async handleGetVersion(msg) {
      this.queryParam.version = msg.key;
      await this.getDataFromServer()
    },
    async handleGetEvent(msg) {
      this.queryParam.event = msg.key;
      await this.getDataFromServer()
    },
  },
  async mounted() {
    // this.queryParam.startDate = getYearMonthDayFromOne();
    // this.queryParam.endDate = getYearMonthDay();
    await this.getDataFromServer()
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

