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
      component:home,
      meta: {
        keepAlive:true,
        isshow:true,
        refresh: false
      }
    },{
      path:'/field',
      name:'field',
      component:field,
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:true
      }
    },{
      path: '/shopping',
      name: 'shopping',
      component:shopping,
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:false
      }
    },{
      path: '/setting',
      name: 'setting',
      component:setting,
      meta: {
        keepAlive:true,
        isshow:true,
        refresh:false
      }
    },{
      path: '/home/newsinfobyid/:id',
      component:newsinfobyid,
      meta:{
        isshow:false
      }
    },{
      path: '/expansion',
      component:expansion,
      meta:{
        isshow:false
      }
    },{
      path: '/egg',
      component:egg,
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
