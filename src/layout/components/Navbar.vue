<template>
  <div class="navbar">
    <!--  -->
    <!-- 面包屑 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="navbar-inner">
      <div class="navbar-content">
        <!-- 调节左右 -->
        <hamburger v-if="key" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <div class="navbar-title" @click="goToHome"></div>
        <div class="product-menu">
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <!-- <img src="@/assets/images/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="user-avatar"> -->
              <span class="avatar-my">我的</span>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      // 'avatar'
    ]),
    key() {
      return this.$route.path.indexOf('applicationManagement') > 0 ? false : true
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    goToHome() {
      this.$router.push(`/`)
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #002766;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .navbar-inner {
    padding: 0;
    width: 100%;
    // max-width: 1440px;
    min-width: 1280px;
    margin: 0 auto;
    height: 64px;

    .navbar-content {
      height: 64px;

      .hamburger-container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 200px;
      }

      .navbar-title {
        width: 96px;
        height: 36px;
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        background: url('../../assets/images/logo.png');
        background-size: 96px 36px;
        cursor: pointer;
      }

      .product-menu {
        float: right;
        line-height: 64px;
        .avatar-container {
          margin-right: 53px;

          .avatar-wrapper {
            color: #fff;
            position: relative;
            .avatar-my {
              cursor: pointer;
            }

            .user-avatar {
              cursor: pointer;
              width: 40px;
              height: 40px;
              border-radius: 10px;
            }

            .el-icon-caret-bottom {
              cursor: pointer;
              position: absolute;
              right: -15px;
              top: 25px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
