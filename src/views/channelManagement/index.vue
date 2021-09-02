<template>
  <div>
    <settings-header title="渠道管理"></settings-header>
    <div class="channelManagement-container">
      <div class="channelManagement-title">
        <span>渠道列表</span>
        <a-input-search class="channel-searchInput" disabled v-model="channelValue" placeholder="请输入渠道信息" enter-button @search="onSearch" />
      </div>
      <div class="channelManagement-tabs">
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :loading="loading"
          :pagination="pagination"
          rowKey="id"
          :columns="columns"
          :data-source="listData"
          @change="onChange"
        >
          <span slot="action" slot-scope="text, record">
            <template>
              <a
                href="javascript:;"
                @click="handleToEdit(record)"
                >编辑名称</a
              >
            </template>
          </span>
        </a-table>
      </div>
    </div>
    <a-modal
      title="编辑渠道名称"
      dialogClass="channel-dialog" 
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
        <el-form-item label="渠道名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>

<script>
import SettingsHeader from "@/components/SettingsHeader";
import { getGmChannel, editGmChannelName } from "@/api/channelManagement";

const columns = [
  {
    title: "渠道名称",
    dataIndex: "name",
  },
  {
    title: "渠道ID",
    dataIndex: "channelId",
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "ChannelManagement",
  data() {
    return {
      channelValue: '',
      listData: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0,
      },
      queryParam: {
        current: 1,
        size: 10,
      },
      visible: false,
      confirmLoading: false,
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: "请输入渠道名称", trigger: "blur" }
        ],
      },
      editId: 1,
    };
  },
  components: {
    SettingsHeader,
  },
  watch: {
    visible(newVal, oldVal) {
      if (!newVal) {
        this.$refs['ruleForm'].resetFields();
      }
    }
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    async getGmChannelData() {
      this.loading = true;
      let res;
      try {
        res = await getGmChannel(this.queryParam);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
      this.loading = false;
      let { code } = res;
      if (code == 0) {
        // 做些什么
        this.listData = res.data.records;
        this.pagination.total = res.data.total;
      }
    },
    async onChange(pagination) {
      this.loading = true;
      this.queryParam.current = pagination.current;
      let res;
      try {
        res = await getGmChannel(this.queryParam);
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
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleToEdit(record) {
      const { id } = record;
      this.visible = true;
      this.editId = id;
    },
    handleOk(e) {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          let res
          try {
            res = await editGmChannelName({
              id: this.editId,
              name: this.ruleForm.name
            })
          } catch (error) {
            this.confirmLoading = false;
            console.log(error)
          } 
          this.confirmLoading = false;
          let { code } = res;
          if ( code == 0 ) {
            // 做些什么
            this.$message.success('编辑渠道名称成功！');
            this.visible = false;
            await this.getGmChannelData();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  async mounted() {
    await this.getGmChannelData();
  },
};
</script>

<style lang="scss" scoped>
.channelManagement-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .channelManagement-title {
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
  .channelManagement-tabs {
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
      .channelManagement-tables {
        margin: 24px auto 16px;
      }
    }
  }
}
>>> .channel-dialog {
  .ant-modal-content {
    .ant-modal-body {
      .el-form {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            font-size: 12px;
          }
          .el-form-item__content {
            .el-input__inner {
              width: 350px;
              height: 32px;
            }
          }
        }
      }
    }
    .ant-modal-footer {
      padding: 15px 16px;
    }
  }
}
</style>

