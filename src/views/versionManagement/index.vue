<template>
  <div>
    <settings-header title="版本管理"></settings-header>
    <div class="versionManagement-container">
      <div class="versionManagement-title">
        <span>版本列表</span>
        <a-input-search class="channel-searchInput" disabled v-model="channelValue" placeholder="请输入版本信息" enter-button @search="onSearch" />
      </div>
      <div class="versionManagement-tabs">
        <a-table
          class="versionManagement-table"
          :loading="loading"
          :pagination="pagination"
          rowKey="id"
          :columns="columns"
          :data-source="listData"
          @change="onChange"
        >
          <span slot="collectionFlag" slot-scope="text, record">
            <template>
              <span :class="[ record.collectionFlag2 ? 'collectionTextDone' : 'collectionTextFalse', 'collectionText']">{{ text }}</span>
            </template>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a
                href="javascript:;"
                @click="handleToCollection(record)"
                >{{ record.collectionAction }}</a
              >
            </template>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsHeader from "@/components/SettingsHeader";
import { getGmVersionCollection, handleGmVersionCollectionCc } from "@/api/versionManagement";

const columns = [
  {
    title: "版本",
    dataIndex: "version",
    sorter: (a, b) => a.version - b.version,
  },
  {
    title: "是否采集",
    dataIndex: "collectionFlag",
    scopedSlots: { customRender: "collectionFlag" },
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "VersionManagement",
  data() {
    return {
      channelValue: '',
      listData: [],
      columns,
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0,
      },
      queryParam: {
        current: 1,
        size: 10,
      },
    };
  },
  components: {
    SettingsHeader,
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    async getGmVersionCollectionData() {
      this.loading = true;
      let res;
      try {
        res = await getGmVersionCollection(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        const newRecords = JSON.parse(JSON.stringify(res.data.records))
        newRecords.forEach((item, index) => {
          if (item.collectionFlag == "true") {
            item.collectionFlag = '采集中'
            item.collectionFlag2 = true
            item.collectionAction = '取消采集'
          } else if (item.collectionFlag == "false") {
            item.collectionFlag = '未采集'
            item.collectionFlag2 = false
            item.collectionAction = '立即采集'
          }
        })
        this.listData = newRecords;
        this.pagination.total = res.data.total;
      }
    },
    async onChange(pagination) {
      this.loading = true;
      this.queryParam.current = pagination.current;
      let res;
      try {
        res = await getGmVersionCollectionData(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        this.listData = res.data.records;
        this.queryParam.current = res.data.current;
      }
    },
    async handleToCollection(record) {
      console.log(record)
      let res;
      try {
        res = await handleGmVersionCollectionCc({
          id: record.id,
          collectionFlag: record.collectionFlag2 ? 'FALSE' : 'TRUE'
        });
      } catch (error) {
        console.log(error);
      }
      let { code } = res;
      if (code == 0) {
        // 做些什么
        await this.getGmVersionCollectionData(this.queryParam)
      }
    }
  },
  async mounted() {
    await this.getGmVersionCollectionData();
  },
};
</script>

<style lang="scss" scoped>
.versionManagement-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .versionManagement-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-right: 20px;
    .channel-searchInput {
      width: 264px;
    }
  }
  .versionManagement-tabs {
    position: relative;
    .versionManagement-table {
      .collectionText {
        position: relative;       
        margin-left: 12px;
        &.collectionTextDone {
          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: #1890ff;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -10px;
            border-radius: 4px;
          }
        }
        &.collectionTextFalse {
          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: red;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -10px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>

