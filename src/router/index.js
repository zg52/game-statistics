import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Management from '@/layout/applicationManagement.vue'
import Statistics from '@/layout/applicationStatistics.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/applicationManagement/lists',
  },

  {
    path: '/applicationManagement',
    component: Management,
    hidden: true,
    children: [
      {
        path: 'lists',
        name: 'Lists',
        component: () => import('@/views/lists/index'),
        // meta: { title: '应用管理', icon: 'dashboard' }
        meta: { title: '应用管理'}
      },
      {
        path: 'createApp',
        name: 'CreateApp',
        component: () => import('@/views/createApp/index'),
        meta: { title: '添加应用'}
      },
      {
        path: 'editApp',
        name: 'EditApp',
        component: () => import('@/views/editApp/index'),
        meta: { title: '修改应用'}
      },
    ]
  },

  {
    path: '/applicationStatistics',
    component: Statistics,
    meta: { title: '用户分析', icon: 'el-icon-user'},
    children: [
      {
        path: 'newUsers',
        name: 'NewUsers',
        component: () => import('@/views/newUsers/index'),
        // meta: { title: '应用管理', icon: 'dashboard' }
        meta: { title: '新增用户'}
      },
      // {
      //   path: 'activeUsers',
      //   name: 'ActiveUsers',
      //   component: () => import('@/views/activeUsers/index'),
      //   meta: { title: '活跃用户'}
      // },
      // {
      //   path: 'operationCounts',
      //   name: 'OperationCounts',
      //   component: () => import('@/views/operationCounts/index'),
      //   meta: { title: '启动次数'}
      // },
      // {
      //   path: 'versionDistribution',
      //   name: 'VersionDistribution',
      //   component: () => import('@/views/versionDistribution/index'),
      //   meta: { title: '版本分布'}
      // },
    ]
  },

  // {
  //   path: '/userEngagement',
  //   component: Statistics,
  //   meta: { title: '用户参与度', icon: 'el-icon-s-custom'},
  //   children: [
  //     {
  //       path: 'newUsers',
  //       name: 'NewUsers',
  //       component: () => import('@/views/newUsers/index'),
  //       // meta: { title: '应用管理', icon: 'dashboard' }
  //       meta: { title: '使用时长'}
  //     },
  //     {
  //       path: 'activeUsers',
  //       name: 'ActiveUsers',
  //       component: () => import('@/views/activeUsers/index'),
  //       meta: { title: '使用频率'}
  //     },
  //   ]
  // },

  {
    path: '/functionalAnalysis',
    component: Statistics,
    // redirect: '/functionalAnalysis/newUsers',
    meta: { title: '功能分析', icon: 'el-icon-tickets'},
    children: [
      {
        path: 'customEvent',
        name: 'CustomEvent',
        component: () => import('@/views/customEvent/index'),
        meta: { title: '自定义事件'}
      },
      {
        path: '/customEventStatistics/:id',
        name: 'CustomEventStatistics',
        hidden: true,
        component: () => import('@/views/customEventStatistics/index'),
        meta: { title: '自定义事件统计'}
      },
    ]
  },

  {
    path: '/settings',
    component: Statistics,
    // redirect: '/functionalAnalysis/newUsers',
    meta: { title: '设置', icon: 'el-icon-setting'},
    children: [
      {
        path: 'versionManagement',
        name: 'VersionManagement',
        component: () => import('@/views/versionManagement/index'),
        meta: { title: '版本'}
      },
      {
        path: 'channelManagement',
        name: 'ChannelManagement',
        component: () => import('@/views/channelManagement/index'),
        meta: { title: '渠道'}
      },
      {
        path: 'eventsManagement',
        name: 'EventsManagement',
        component: () => import('@/views/eventsManagement/index'),
        meta: { title: '事件'}
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
