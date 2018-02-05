import Vue from 'vue'
import Router from 'vue-router'

// components
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'

// client
import Home from '@/components/client/Home'
import Market from '@/components/client/Market'
import Order from '@/components/client/Order'
import Farm from '@/components/client/Farm'

import My from '@/components/client/personal-center/My'
import Information from '@/components/client/personal-center/Information'
import PersonalData from '@/components/client/personal-center/PersonalData'
import EditPassword from '@/components/client/personal-center/EditPassword'
import Wallet from '@/components/client/personal-center/Wallet'
import NewMamber from '@/components/client/personal-center/NewMamber'
import MyTeam from '@/components/client/personal-center/MyTeam'
import ChickenDetail from '@/components/client/personal-center/ChickenDetail'
import Notice from '@/components/client/personal-center/Notice'

// admin
import Dashboard from '@/components/admin/Dashboard'
import ClientList from '@/components/admin/client/ClientList'
import ClientDetail from '@/components/admin/client/ClientDetail'
import GoodsList from '@/components/admin/GoodsList'
import PropsList from '@/components/admin/PropsList'
import OrdersList from '@/components/admin/OrdersList'
import OperationLogs from '@/components/admin/OperationLogs'
import NoticeManagement from '@/components/admin/NoticeManagement'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'Login', component: Login },
    // client
    { path: '/home', name: 'Home', component: Home },
    { path: '/my',
      component: My,
      children: [
        { path: 'information', name: 'Information', component: Information }, // 个人信息
        { path: 'market', name: 'Market', component: Market }, // 市场
        { path: 'order', name: 'Order', component: Order }, // 订单
        { path: 'farm', name: 'Farm', component: Farm }, // 农场
        { path: '', redirect: 'information' }
      ]
    },
    { path: '/personalData', name: 'PersonalData', component: PersonalData }, // 个人信息详情
    { path: '/wallet', name: 'Wallet', component: Wallet }, // 钱包
    { path: '/new-mamber', name: 'NewMamber', component: NewMamber, meta: { requiresAuth: false } }, // 注册新会员
    { path: '/mt-team', name: 'MyTeam', component: MyTeam }, // 团队
    { path: '/chicken-detail', name: 'ChickenDetail', component: ChickenDetail }, // 养鸡明细
    { path: '/notice', name: 'Notice', component: Notice }, // 公告
    { path: '/edit-password', name: 'EditPassword', component: EditPassword }, // 修改密码
    // admin
    { path: '/dashboard',
      component: Dashboard,
      children: [
        { path: '', redirect: 'client-list' },
        { path: 'client-list', name: 'ClientList', component: ClientList },
        { path: 'goods-list', name: 'GoodsList', component: GoodsList },
        { path: 'props-list', name: 'PropsList', component: PropsList },
        { path: 'orders-list', name: 'OrdersList', component: OrdersList },
        { path: 'operation-logs', name: 'OperationLogs', component: OperationLogs },
        { path: 'notice-management', name: 'NoticeManagement', component: NoticeManagement },
        { path: 'client-detail/:id', name: 'ClientDetail', component: ClientDetail }
      ]
    },
    // 404
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const LOGIN_USER = localStorage.getItem('LOGIN_USER')
  if (LOGIN_USER) {
    if (to.path === '/login') {
      next({path: '/dashboard'})
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      if (!to.matched.some(record => record.meta.requiresAuth)) {
        next()
      } else {
        next({path: '/login'})
      }
    }
  }
})

export default router
