<template>
  <div class="settings-header">
    <div class="settings-title">
      <span class="title">
        {{ title }}
      </span>
      <span class="desc">说明</span>
    </div>
		<div class="slot-events-btn">
			<slot name="addEvents"></slot>
		</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SettingsHeader",
  props: {
    title: {
      type: String,
      required: true
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
      selectOptionsVersion: [
        {
          key: null,
          value: "全部版本",
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
    selectVersionOption(item) {
      this.$emit("getVersion", item);
    },
  },
  async mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.settings-header {
  height: 72px;
  background: #fff;
  overflow: hidden;
	position: relative;
  .settings-title {
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
	.slot-events-btn {
		position: absolute;
		top: 50%;
    transform: translateY(-50%);
    right: 24px;
	}
}
</style>
