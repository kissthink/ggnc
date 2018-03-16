import Vue from 'vue'
import Router from 'vue-router'

// service
import tokenService from '@/assets/js/tokenService'

// components
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import PageNotFound from '@/components/PageNotFound'

// client
import Home from '@/components/client/Home'
import Order from '@/components/client/order/Order'
import Market from '@/components/client/market/Market'

import Farm from '@/components/client/farm/Farm'
import HatchRoom from '@/components/client/farm/HatchRoom'
import InviterHatchRoom from '@/components/client/farm/InviterHatchRoom'
import Hatched from '@/components/client/farm/Hatched'
import chickenFarm from '@/components/client/farm/ChickenFarm'
import HarvestList from '@/components/client/farm/HarvestList'

import My from '@/components/client/personal-center/My'
import Information from '@/components/client/personal-center/Information'
import PersonalData from '@/components/client/personal-center/PersonalData'
import EditPassword from '@/components/client/personal-center/EditPassword'
import Wallet from '@/components/client/personal-center/wallet/Wallet'
import TransferAccount from '@/components/client/personal-center/wallet/TransferAccount'
import TopUp from '@/components/client/personal-center/wallet/TopUp'
import NewMamber from '@/components/client/personal-center/NewMamber'
import InvitingNewMember from '@/components/client/personal-center/InvitingNewMember'
import RealName from '@/components/client/personal-center/RealName'
import MyTeam from '@/components/client/personal-center/MyTeam'
import ChickenDetail from '@/components/client/personal-center/ChickenDetail'
import Notice from '@/components/client/personal-center/Notice'

// admin
import Admin from '@/components/admin/Admin'
import ClientList from '@/components/admin/client/ClientList'
import ClientDetail from '@/components/admin/client/ClientDetail'
import GoodsList from '@/components/admin/goods/GoodsList'
import GoodsDetail from '@/components/admin/goods/GoodsDetail'
import PropsList from '@/components/admin/props/PropsList'
import PropsDetail from '@/components/admin/props/PropsDetail'
import OrdersList from '@/components/admin/OrdersList'
import Profit from '@/components/admin/profit/profit'
import OperationLogs from '@/components/admin/operationLogs/OperationLogs'
import IndexImgs from '@/components/admin/indexImgs/IndexImgs'
import IndexImgDetail from '@/components/admin/indexImgs/IndexImgDetail'
import NoticeManagement from '@/components/admin/noticeManagement/NoticeManagement'
import NoticeDetail from '@/components/admin/noticeManagement/NoticeDetail'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
    // client
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: false } },
    { path: '/my',
      component: My,
      meta: { requiresAuth: true },
      children: [
        { path: 'information', name: 'Information', component: Information }, // 个人信息
        { path: 'market', name: 'Market', component: Market }, // 市场
        { path: 'order', name: 'Order', component: Order }, // 订单
        { path: 'farm', name: 'Farm', component: Farm }, // 农场
        { path: '', redirect: 'information' }
      ]
    },
    { path: '/personalData', name: 'PersonalData', component: PersonalData, meta: { requiresAuth: true } }, // 个人信息详情
    { path: '/wallet', name: 'Wallet', component: Wallet, meta: { requiresAuth: true } }, // 钱包
    { path: '/transfer-account', name: 'TransferAccount', component: TransferAccount, meta: { requiresAuth: true } }, // 转账
    { path: '/topUp', name: 'TopUp', component: TopUp, meta: { requiresAuth: true } }, // 转账
    { path: '/new-mamber', name: 'NewMamber', component: NewMamber, meta: { requiresAuth: false } }, // 注册新会员
    { path: '/inviting-new-mamber', name: 'InvitingNewMember', component: InvitingNewMember, meta: { requiresAuth: false } }, // 邀请新会员
    { path: '/real-name', name: 'RealName', component: RealName, meta: { requiresAuth: true } },
    { path: '/mt-team', name: 'MyTeam', component: MyTeam, meta: { requiresAuth: true } }, // 团队
    { path: '/chicken-detail', name: 'ChickenDetail', component: ChickenDetail, meta: { requiresAuth: true } }, // 养鸡明细
    { path: '/notice', name: 'Notice', component: Notice, meta: { requiresAuth: true } }, // 公告
    { path: '/edit-password', name: 'EditPassword', component: EditPassword, meta: { requiresAuth: true } }, // 修改密码
    { path: '/hatch-room', name: 'HatchRoom', component: HatchRoom }, // 孵化房
    { path: '/inviter-hatch-room', name: 'InviterHatchRoom', component: InviterHatchRoom }, // 师傅孵化房
    { path: '/hatched', name: 'Hatched', component: Hatched }, // 孵化记录
    { path: '/chicken-farm', name: 'chickenFarm', component: chickenFarm }, // 养鸡场
    { path: '/harvest-list', name: 'HarvestList', component: HarvestList }, // 养鸡场收获记录
    // admin
    { path: '/admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: 'client-list' },
        { path: 'client-list', name: 'ClientList', component: ClientList },
        { path: 'goods-list', name: 'GoodsList', component: GoodsList },
        { path: 'props-list', name: 'PropsList', component: PropsList },
        { path: 'orders-list', name: 'OrdersList', component: OrdersList },
        { path: 'profit', name: 'Profit', component: Profit },
        { path: 'operation-logs', name: 'OperationLogs', component: OperationLogs },
        { path: 'index-imgs', name: 'IndexImgs', component: IndexImgs },
        { path: 'new-index-img', name: 'IndexImgDetail', component: IndexImgDetail },
        { path: 'notice-management', name: 'NoticeManagement', component: NoticeManagement },
        { path: 'new-notice', name: 'NoticeDetail', component: NoticeDetail },
        { path: 'client-detail/:id', name: 'ClientDetail', component: ClientDetail },
        { path: 'goods-detail/:id', name: 'GoodsDetail', component: GoodsDetail },
        { path: 'props-detail/:id', name: 'PropsDetail', component: PropsDetail },
        { path: 'notice-detail/:id', component: NoticeDetail },
        { path: 'index-img-detail/:id', component: IndexImgDetail }
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
  if (!tokenService.isOverdue()) {
    if (to.path === '/login') {
      next({path: '/my'})
    } else if (to.path === '/admin-login') {
      next({path: '/admin'})
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else if (to.path === '/admin-login') {
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
