<template>
  <div id="app" class="app-container">
    <!--<mt-header fixed title="测试别当真">-->
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button icon="back">返回</mt-button>-->
      <!--</router-link>-->
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    <!--</mt-header>-->
    <header id="header" class="mui-bar mui-bar-nav" style="z-index: 999">
      <a @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">有问题请反馈</h1>
    </header>
    <transition>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <transition>
      <nav v-if="$route.meta.isshow" class="mui-bar mui-bar-tab" style="z-index: 999">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/field">
          <span class="mui-icon mui-icon-compose"></span>
          <span class="mui-tab-label">发帖</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopping">
          <span class="mui-icon mui-icon-pengyouquan"></span>
          <span class="mui-tab-label">朋友圈</span>
        </router-link>
        <router-link class="mui-tab-item" to="setting">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .app-container{
    padding-top: 45px;
    overflow-x: hidden;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s;
  }
</style>
