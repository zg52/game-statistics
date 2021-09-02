<template>
  <div>
    <settings-header title="事件管理">
      <div slot="addEvents">
        <a-button type="primary" @click="showModal">添加事件</a-button>
      </div>
    </settings-header>
    <div class="eventsManagement-container">
      <div class="eventsManagement-title">
        <span>事件列表</span>
      </div>
      <div class="eventsManagement-tabs">
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
              <a href="javascript:;" style="margin-right: 10px;" @click="handleToEdit(record)">编辑</a>
            </template>
          </span>
        </a-table>
      </div>
    </div>
    <a-modal
      dialogClass="events-dialog"    
      :closable="closable"
      width="550px"
      :maskClosable="maskClosable"
      :title="isEditTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item label="事件ID：" prop="eventId">
          <el-input v-model="ruleForm.eventId" placeholder="请输入事件ID" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="显示名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入显示名称"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="eventType">
          <el-radio-group v-model="ruleForm.eventType">
            <el-radio label="1">多参数类型事件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" class="desc-formItem">
          <div class="desc">
            <p class="desc-title">说明：</p>
            <p class="desc-content">事件ID不可更改，与代码中 “String event_id” 保持一致；参数</p>
            <p class="desc-content">（key）无须手动注册，每个事件下最多支持100个参数同时计</p>
            <p class="desc-content">算。为保证数据准确性,请使用（英文、数字、下划线（_）、中</p>
            <p class="desc-content">划线（-）、小数点（.）以及加号（+））定义事件ID或参数ID</p>
          </div>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>

<script>
import SettingsHeader from "@/components/SettingsHeader";
import { getGmEvent, addGmEvent, editGmEvent } from "@/api/eventsManagement";

const columns = [
  {
    title: '事件ID',
    dataIndex: 'eventId',
  },
  {
    title: '显示名称',
    dataIndex: 'name',
  },
  {
    title: '事件类型',
    dataIndex: 'eventType',
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "EventsManagement",
  data() {
    return {
      isEdit: false,
      maskClosable: false,
      closable: false,
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
        size: 10
      },
      visible: false,
      confirmLoading: false,
      ruleForm: {
        eventId: '',
        eventType: '',
        name: ''
      },
      rules: {
        eventId: [
          { required: true, message: "请输入事件ID", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入显示名称", trigger: "blur" }
        ],
        eventType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
      },
      editId: 1,
		};
  },
  components: {
    SettingsHeader,
  },
  watch: {
    isEdit(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  computed: {
    isEditTitle() {
      return this.isEdit ? '编辑事件' : '添加事件'
    }
  },
  methods: {
    async getGmEventData() {
      this.loading = true;
      let res
      try {
        res = await getGmEvent(this.queryParam)
      } catch (error) {
        this.loading = false;
        console.log(error)
      } 
      this.loading = false;
      let { code } = res;
      if ( code == 0 ) {
        // 做些什么
        this.listData = res.data.records
        this.pagination.total = res.data.total
      }
    },
		async onChange(pagination) {
      this.loading = true
      this.queryParam.current = pagination.current
      let res
      try {
        res = await getGmEvent(this.queryParam)
      } catch (error) {
        this.loading = false
        console.log(error)
      } 
      this.loading = false
      let { code } = res;
      if ( code == 0 ) {
        // 做些什么
        this.listData = res.data.records
        this.queryParam.current = res.data.current
      }
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (this.isEdit) {
            let resEdit
            try {
              resEdit = await editGmEvent({
                id: this.editId,
                name: this.ruleForm.name
              })
            } catch (error) {
              this.confirmLoading = false;
              console.log(error)
            } 
            this.confirmLoading = false;
            let { code } = resEdit;
            if ( code == 0 ) {
              // 做些什么
              this.$message.success('修改事件成功！');
              this.visible = false;
              this.isEdit = false;
              this.$refs['ruleForm'].resetFields();
              await this.getGmEventData();
            }
          } else {
            let res
            try {
              res = await addGmEvent(this.ruleForm)
            } catch (error) {
              this.confirmLoading = false;
              console.log(error)
            } 
            this.confirmLoading = false;
            let { code } = res;
            if ( code == 0 ) {
              // 做些什么
              this.$message.success('添加事件成功！');
              this.visible = false;
              this.$refs['ruleForm'].resetFields();
              await this.getGmEventData();
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.$refs['ruleForm'].resetFields();
      this.visible = false;
      if (this.isEdit) {
        setTimeout(() => {
          this.isEdit = false;
        }, 200)
      }
    },
    async handleToEdit(record) {
      console.log('111111111', record)
      this.isEdit = true;
      this.visible = true;
      const { eventId, name, eventType, id } = record;
      this.ruleForm.eventId = eventId;
      this.ruleForm.name = name;
      this.ruleForm.eventType = eventType;
      this.editId = id;
    }
  },
  async mounted() {
    await this.getGmEventData()
  },
};
</script>

<style lang="scss" scoped>
.eventsManagement-container {
  margin: 24px 22px 20px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .eventsManagement-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .eventsManagement-tabs {
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
      .eventsManagement-tables {
        margin: 24px auto 16px;
      }
    }
  }
}
>>> .events-dialog {
  .ant-modal-content {
    .ant-modal-header {
      padding-top: 48px;
      padding-left: 48px;
      .ant-modal-title {
        color: #000;
      }
      border-bottom: none;
    }
    .ant-modal-body {
      padding-top: 16px;
      padding-left: 48px;
      padding-right: 48px;
      .el-form {
        .el-form-item {
          .el-form-item__label {
            font-size: 12px;
          }
          .el-form-item__content {
            .el-input__inner {
              height: 32px;
            }
          }
          &.desc-formItem {
            padding-top: 15px;
            .el-form-item__content {
              .desc {
                border-top: 1px solid #e8e8e8;
                border-bottom: 1px solid #e8e8e8;
                padding-top: 27px;
                padding-bottom: 27px;
                font-size: 12px;
                color: #7d7a7b;
                p {
                  line-height: 18px;
                  margin-bottom: 0;
                  letter-spacing: 1px;
                }
              }
            }
          }
        }
      }
    }
    .ant-modal-footer {
      border-top: none;
      padding-bottom: 48px;
      padding-right: 48px;
      padding-top: 0px;
    }
  }
}
</style>

