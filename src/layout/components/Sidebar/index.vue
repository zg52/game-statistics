<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 应用切换 -->
    <!-- <div class="change-app">
      <div class="title">
        应用名称
      </div>
      <div class="content">
        <a-select default-value="lucy" style="width: 190px" @change="handleChange">
          <div class="change-btn" slot="suffixIcon">切换</div>
          <a-select-option value="jack">
            Jack
          </a-select-option>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
          <a-select-option value="disabled" disabled>
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">
            yiminghe
          </a-select-option>
        </a-select>
      </div>
    </div> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
  mounted() {
    console.log(this.routes, '~~~~~~~~~~')
  }
}
</script>

<style lang="scss" scoped>
.change-app {
  height: 64px;
  border-bottom: 1px solid #bfbfbf;
  .title {
    font-size: 14px;
    color: #918d8d;
    padding-left: 20px;
    padding-top: 8px;
  }
  .content {
    padding-left: 10px;
    .ant-select {
      color: #000;
      font-size: 16px;
      font-weight: 600;
      >>> .ant-select-selection {
        border: 1px solid transparent;
        box-shadow: none !important;
        .ant-select-arrow {
          .change-btn {
            color: #1890ff;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
