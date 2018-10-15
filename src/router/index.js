import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import shopping from '@/components/shopping'
import setting from '@/components/setting'
import newsinfobyid from '@/components/newsinfobyid'
import field from '@/components/field'
import expansion from '@/components/expansion'
import egg from '@/components/egg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',redirect:'/home',
    },{
      path:'/home',
      name: 'home',
      // component:home,
      component: resolve=>require(['@/components/home'],resolve),
      meta: {
        keepAlive:true,
        isshow:true,
        refresh: false
      }
    },{
      path:'/field',
      name:'field',
      // component:field,
      component: resolve=>require(['@/components/field'],resolve),
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:true
      }
    },{
      path: '/shopping',
      name: 'shopping',
      // component:shopping,
      component: resolve=>require(['@/components/shopping'],resolve),
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:false
      }
    },{
      path: '/setting',
      name: 'setting',
      // component:setting,
      component: resolve=>require(['@/components/setting'],resolve),
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:false
      }
    },{
      path: '/home/newsinfobyid/:id',
      name: 'newsinfobyid',
      // component:newsinfobyid,
      component: resolve=>require(['@/components/newsinfobyid'],resolve),
      meta:{
        isshow:false
      }
    },{
      path: '/expansion',
      name: 'expansion',
      // component:expansion,
      component: resolve=>require(['@/components/expansion'],resolve),
      meta:{
        isshow:false
      }
    },{
      path: '/egg',
      name: 'egg',
      // component:egg,
      component: resolve=>require(['@/components/egg'],resolve),
      meta:{
        inshow:false
      }
    }
  ],
  scrollBehavior(to,from,savedPosition){
    if (savedPosition) {
      return savedPosition
    }else {
      return{x:0,y:0}
    }
  },
  linkActiveClass: 'mui-active'
})
