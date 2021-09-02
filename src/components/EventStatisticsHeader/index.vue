<template>
  <div class="application-header">
    <div class="application-title">
      <span class="title">
        {{ title }}
      </span>
      <span class="desc"> 说明 </span>
    </div>
    <div class="application-options">
			<a-select
        class="select-options1"
        placeholder="请选择事件"
        style="width: 210px"
        disabled
      >
        <a-select-option
          v-for="item in selectOptionsEvent"
          :key="item.value"
          :value="item.value"
          @click="selectEventOption(item)"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
      <a-select
        class="select-options2"
        placeholder="请选择渠道"
        style="width: 210px"
      >
        <a-select-option
          v-for="item in selectOptions"
          :key="item.value"
          :value="item.value"
          @click="selectChannelOption(item)"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
      <!-- 时间筛选 -->
      <a-range-picker
        style="width: 256px"
        class="range-picker"
        :default-value="[
          moment(rangeDate.startDate, dateFormat),
          moment(rangeDate.endDate, dateFormat),
        ]"
        @change="onChange"
      >
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getChannelSelectList } from '@/api/applicationHeader.js';

export default {
  name: "CustomEventHeader",
  props: {
    title: {
      type: String,
      default: "新增用户分析",
    },
  },
  data() {
    this.dateFormat = "YYYY-MM-DD";
    return {
      selectOptions: [
        {
          key: null,
          value: "全部渠道",
        },
      ],
      selectOptionsEvent: [
        {
          key: null,
          value: "全部事件",
        },
      ],
      rangeDate: {
        startDate: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-01}`,
        endDate: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
      },
    };
  },
  methods: {
    moment,
    onChange(date, dateString) {
      console.log(date, dateString);
      this.$emit("getTime", dateString);
    },
    selectChannelOption(item) {
      this.$emit("getChannel", item);
    },
    selectEventOption(item) {
      this.$emit("getEvent", item);
    },
    async handleGetChannelSelectList() {
      let res
      try {
        res = await getChannelSelectList()
      } catch (error) {
        console.log(error)
      } 
      let { code } = res;
      if ( code == 0 ) {
        // 做些什么
        if (res.data.length != 0) {
          res.data.forEach(item => {
            const newItem = JSON.parse(JSON.stringify(item));
            newItem['key'] = newItem['code'];
            newItem['value'] = newItem['name'];
            delete newItem.code;
            delete newItem.name;
            this.selectOptions.push(newItem);
          })
          console.log(this.selectOptions)
        }
      }
    }
  },
  async mounted() {
    await this.handleGetChannelSelectList()
  },
};
</script>

<style lang="scss" scoped>
.application-header {
  height: 112px;
  background: #fff;
  overflow: hidden;
  .application-title {
    display: flex;
    align-items: center;
    margin-top: 22px;
    margin-left: 24px;
    .title {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-right: 12px;
    }
    .desc {
      font-size: 14px;
    }
  }
  .application-options {
    overflow: hidden;
  }
  .range-picker {
    margin-top: 14px;
  }
  .select-options1 {
    margin-left: 24px;
  }

  .select-options1,
  .select-options2 {
    margin-right: 24px;
  }
}
</style>
