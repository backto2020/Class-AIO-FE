import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/notifications',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Notifications',
        component: () => import('@/views/notifications/index'),
        meta: { title: '公告', icon: 'notifications' }
      }
    ]
  },

  {
    path: '/activities',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Activites',
        component: () => import('@/views/activites/index'),
        meta: { title: '活动', icon: 'activites' }
      }
    ]
  },

  {
    path: '/commit',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Commit',
        component: () => import('@/views/commit/index'),
        meta: { title: '提交', icon: 'commit' }
      }
    ]
  },

  {
    path: '/courses',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Courses',
        component: () => import('@/views/courses/index'),
        meta: { title: '选课', icon: 'courses' }
      }
    ]
  },

  {
    path: '/admin',
    name: 'Admin',
    hidden: true,
    meta: { title: '管理', icon: 'admin' },
    component: Layout,
    children: [
      {
        path: 'activities',
        name: 'ActivitiesAdmin',
        component: () => import('@/views/admin/activities'),
        meta: { title: '活动管理', icon: 'activities-admin' }
      },
      {
        path: 'notifications',
        name: 'NotificationsAdmin',
        component: () => import('@/views/admin/notifications'),
        meta: { title: '公告管理', icon: 'notifications-admin' }
      },
      {
        path: 'commit',
        name: 'CommitAdmin',
        component: () => import('@/views/admin/commit'),
        meta: { title: '提交管理', icon: 'notifications-admin' }
      },
      {
        path: 'users',
        name: 'UsersAdmin',
        component: () => import('@/views/admin/users'),
        meta: { title: '用户管理', icon: 'users-admin' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
