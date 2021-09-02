<template>
  <div class="list-container">
    <div class="list-inner">
      <div class="list-title">
        <span class="title-name">应用列表</span>
      </div>
      <div class="list-tables">
        <div class="tables-title-container">
          <span class="tables-title"> 应用列表 </span>
          <el-button class="tables-btn" type="primary" @click="goToCreateApp"
            >添加应用</el-button
          >
        </div>
        <div>
          <a-table
            :loading="loading"
            :pagination="pagination"
            rowKey="id"
            :columns="columns"
            :data-source="listData"
            @change="onChange"
          >
            <span slot="name" slot-scope="text, record">
              <template>
                <a href="javascript:;" @click="handleGoTo(record)">{{
                  text
                }}</a>
              </template>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a href="javascript:;" style="margin-right: 10px;" @click="handleToSetUp(record)">编辑</a>
                <a-popconfirm
                  title="请确认是否删除此应用，应用数据随之删除，且不可恢复！"
                  ok-text="删除"
                  cancel-text="取消"
                  @confirm="confirm(record)"
                  @cancel="cancel"
                >
                  <a href="#" style="color: red;">删除</a>
                </a-popconfirm>
              </template>
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGmApp, deleteGmApp } from "@/api/lists";

// const columns = [
//   {
//     title: "应用名",
//     dataIndex: "name",
//     sorter: (a, b) => a.name.length - b.name.length,
//     scopedSlots: { customRender: "name" },
//   },
//   {
//     title: "今日新增用户数",
//     dataIndex: "number1",
//     defaultSortOrder: "descend",
//     sorter: (a, b) => a.number1 - b.number1,
//   },
//   {
//     title: "昨日新增用户数",
//     dataIndex: "number2",
//     sorter: (a, b) => a.number2 - b.number2,
//   },
//   {
//     title: "今日活跃用户数",
//     dataIndex: "number3",
//     sorter: (a, b) => a.number3 - b.number3,
//   },
//   {
//     title: "昨日活跃用户数",
//     dataIndex: "number4",
//     sorter: (a, b) => a.number4 - b.number4,
//   },
//   {
//     title: "操作",
//     dataIndex: "action",
//     scopedSlots: { customRender: "action" },
//   },
// ];

const columns = [
  {
    title: "应用名称",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    scopedSlots: { customRender: "name" },
  },
  {
    title: "AppKey",
    dataIndex: "appkey",
  },
  {
    title: "应用类型",
    dataIndex: "appType",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "Lists",
  data() {
    return {
      listData: [],
      columns,
      pagination: {
        pageSize: 10,
        total: 0,
        // showSizeChanger:true,
        // showTotal: total => `共 ${total} 条数据`,
        // pageSizeOptions: ['5', '10', '15', '20'],
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize
      },
      queryParam: {
        current: 1,
        size: 10,
      },
      loading: false,
    };
  },
  methods: {
    formatData(data) {
      const newData = data.map((item) => {
        item.name = item.name == null ? "--" : item.name;
        item.appType = item.appType == null ? "--" : item.appType;
        item.language = item.language == null ? "--" : item.language;
        item.createTime = item.createTime == null ? "--" : item.createTime;
        return item;
      });
      return newData;
    },
    formatObj(data) {
      const newData = JSON.parse(JSON.stringify(data));
      for (let i in newData) {
        if (i !== "description") {
          if (newData[i] == null) {
            newData[i] = "--";
          }
        }
      }
      return newData;
    },
    async getDataFromServer() {
      this.loading = true;
      let res;
      try {
        res = await getGmApp(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        this.listData = this.formatData(res.data.records);
        this.pagination.total = res.data.total;
      }
    },
    async onChange(pagination) {
      this.loading = true;
      this.queryParam.current = pagination.current;
      let res;
      try {
        res = await getGmApp(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        this.listData = this.formatData(res.data.records);
        this.queryParam.current = res.data.current;
      }
    },
    handleGoTo(x) {
      // 储存applicationId
      this.$store.dispatch("application/setApplicationId", x.id);
      // 路由跳转
      this.$router.push({
        path: `/applicationStatistics/newUsers`,
      });
    },
    handleToSetUp(x) {
      // 储存applicationInfo
      this.$store.dispatch(
        "application/setApplicationInfo",
        JSON.stringify(this.formatObj(x))
      );
      // 路由跳转
      this.$router.push({
        path: `/applicationManagement/editApp`,
      });
    },
    async handleToDeleteList(record) {
      this.loading = true;
      let delRes;
      try {
        delRes = await deleteGmApp(record.id);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = delRes;
      if (code == 0) {
        // 做些什么
        // 重新请求接口
        this.$message.success('删除成功');
        this.listData.splice(this.listData.length - 1, 1);
        if (this.listData.length % 10 == 0) {
          this.queryParam.current--;
        }
        await this.getDataFromServer();
      }
    },
    goToCreateApp() {
      this.$router.push({
        path: "/applicationManagement/createApp",
      });
    },
    async confirm(record) {
      await this.handleToDeleteList(record)
    },
    cancel(e) {
      console.log(e);
      this.$message.error('取消删除');
    },
  },
  async mounted() {
    await this.getDataFromServer();
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  max-width: 1440px;
  min-width: 1280px;
  margin: 0 auto;
  .list-inner {
    height: 100%;
    margin: 0 175px;

    .list-title {
      width: 100%;
      height: 73px;
      background: #fff;
      line-height: 73px;
      padding-left: 24px;
      .title-name {
        color: #000;
        font-size: 20px;
        font-weight: 500px;
      }
    }

    .list-tables {
      margin-top: 30px;
      width: 100%;
      height: 744px;
      background: #fff;
      border-radius: 5px;
      background: #fff;
      padding: 0 16px;
      .tables-title-container {
        height: 64px;
        width: 100%;
        padding-left: 8px;
        line-height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tables-title {
          font-size: 16px;
          color: #000;
        }
        .tables-btn {
          margin-right: 8px;
          padding: 8px 20px;
        }
      }
    }
  }
}
</style>