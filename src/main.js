// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap-3.3.7-dist/css/bootstrap.css'
import {Button,Header,Tabbar,TabItem,Swipe,SwipeItem,Field,Switch,Popup,Loadmore,Actionsheet,Lazyload} from 'mint-ui'
import 'mui/dist/css/mui.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.component('mtButton', Button);
Vue.component('mtHeader', Header);
Vue.component('mtTabbar', Tabbar);
Vue.component('mtTabItem', TabItem);
Vue.component('mtSwipe', Swipe);
Vue.component('mtSwipeItem', SwipeItem);
Vue.component('mtField', Field);
Vue.component('mtSwitch', Switch);
Vue.component('popup', Popup);
Vue.component('mtLoadmore', Loadmore);
Vue.component('mtActionsheet', Actionsheet);

Vue.use(Lazyload);
Vue.use(VueResource);
Vue.http.options.root = 'http://47.93.239.37:8080/';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
