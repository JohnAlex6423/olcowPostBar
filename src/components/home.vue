<template>
  <div style="background-color: #ffffff">
    <mt-swipe :auto="4000" ref="mtswipe">
      <mt-swipe-item>
        <img src="http://123.206.93.200/images/轮播图1.jpg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://123.206.93.200/images/轮播图2.jpg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://123.206.93.200/images/轮播图3.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <div class="mui-content">
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/M.81fa6ba.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">麦当劳</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/kfc.5b06622.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">KFC</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/便利店.cd80d12.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">便利店</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/pizzahut.86ee479.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">pizzahut</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/快餐休闲.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">德克士</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/expansion">
          <img src="http://123.206.93.200/images/starbucks.17894b5.png" style="height: 50px; width: 50px">
          <div class="mui-media-body">星巴克</div>
        </router-link>
      </li>
    </ul>
  </div>
    <div align="right"  style="color: gray;font-size: 15px;margin-top: 10px;margin-right: 15px;margin-bottom: 5px" @click="popupVisible=!popupVisible">{{listsort}}
      <span v-if="!popupVisible" class="glyphicon glyphicon-chevron-down" STYLE="font-size: 12px"></span>
      <span v-if="popupVisible" class="glyphicon glyphicon-chevron-up" STYLE="font-size: 12px;color: cornflowerblue"></span>
    </div>
    <div align="right" style="float: right; z-index:500;position: relative; display: inline-block;width: 100%">
      <transition>
        <div v-if="popupVisible" style="position: absolute;display: block;width: 100%;background-color: white;">
          <p STYLE="color:gray;font-size: 15px;margin-right: 30px" @click="sortfortime">按发表时间⚡</p>
          <hr/>
          <p STYLE="color:gray;font-size: 15px;margin-right: 30px" @click="sortforclick">按阅读次数🔥</p>
          <hr/>
          <p STYLE="color:gray;font-size: 15px;margin-right: 30px" @click="sortforup">按点赞次数👍</p>
        </div>
      </transition>
    </div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfobyid/'+item.id">
          <div class="mui-media-body">
            {{item.name}}
            <p>{{item.content}}</p>
            <p class='mui-ellipsis' style="display: flex; justify-content: space-between">
              <span style="font-size: 12px">⚡{{item.time}}</span>
              <span>🔥:{{item.click}}</span>
              <span>👍:{{item.up}}</span>
            </p>
          </div>
        </router-link>
        <img v-if="item.isimg===1" style="width: 100%" v-lazy="item.imgsrc">
      </li>
    </ul>
    <mt-button type="primary" plain style="margin-top: 10px" size="large" @click="getmore">点击加载更多</mt-button>
    <transition>
      <div class="scrollTop" v-show="showTop" @click="toTop">
        <div class="radius">
          <span class="glyphicon glyphicon-arrow-up" style="font-size: 30px;line-height: 45px"></span>
        </div>
      </div>
    </transition>
    <br/><br/><br/>
  </div>
</template>

<script>
  import {Toast,Indicator} from 'mint-ui'
    export default {
        data(){
          return{
            newsList:[],
            listsort:'按发表时间⚡',
            popupVisible:false,
            pageindex:1,
            pageMax:-1,
            scrollTop: 0,
            time: 0,
            dParams: 20,
            scrollState: 0
          }
        },
      created(){
          Indicator.open();
          this.$http.get('user/allbytime').then(result=>{
            this.newsList = result.body.list;
            this.pageMax=result.body.pages;
            this.$refs.mtswipe.$el.style.height = this.$refs.mtswipe.$el.offsetWidth/2 + 'px';
            Indicator.close();
          },reason => {
            Indicator.close();
            Toast({
              message:'数据初始化失败',
              duration: 1000,
              iconClass: 'glyphicon glyphicon-remove'
            });
          })
      },
      computed:{
        showTop: function(){
          let value = this.scrollTop>200?true:false;
          return value;
        }
      },
      mounted(){
        window.addEventListener('scroll', this.getScrollTop);
      },
      activated(){
          if (this.$route.params.isref==='yes') {
            this.sortfortime()
          }
      },
      methods:{
          sortfortime(){
            Indicator.open();
            this.pageindex=1;
            this.$http.get('user/allbytime').then(result=>{
              this.popupVisible = false;
              this.newsList = result.body.list;
              this.listsort = '按发表时间⚡';
              Indicator.close();
              Toast({
                message:'已切换',
                duration: 500
              });
            },result=>{
              Indicator.close();
              Toast({
                message:'切换失败请刷新重试',
                duration: 500,
                iconClass: 'glyphicon glyphicon-remove'
              });
            })
          },
        sortforup(){
          Indicator.open();
          this.pageindex=1;
          this.$http.get('user/allbyup').then(result=>{
            this.popupVisible = false;
            this.newsList = result.body.list;
            this.listsort = '按点赞次数👍';
            Indicator.close();
            Toast({
              message:'已切换',
              duration: 500
            });
          },result=>{
            Indicator.close();
            Toast({
              message:'切换失败请刷新重试',
              duration: 500,
              iconClass:'glyphicon glyphicon-remove'
            })
          })
        },
        sortforclick(){
          Indicator.open();
          this.pageindex=1;
          this.$http.get('user/allbyclick').then(result=>{
            this.popupVisible = false;
            this.newsList = result.body.list;
            this.listsort = '按阅读次数🔥';
            Indicator.close();
            Toast({
              message:'已切换',
              duration: 500
            });
          },result=>{
            Indicator.close();
            Toast({
              message:'切换失败请刷新重试',
              duration: 500,
              iconClass:'glyphicon glyphicon-remove'
            });
          });
        },
        getmore(){
            if (this.listsort==='按发表时间⚡'){
              if (this.pageindex < this.pageMax) {
                Indicator.open();
                this.pageindex++;
                this.$http.get('user/allbytime?pageNum='+this.pageindex).then(result=>{
                  this.newsList = this.newsList.concat(result.body.list);
                  Indicator.close();
                  Toast({
                    message:'已切换',
                    duration: 500
                  });
                },result=>{
                  this.pageindex--;
                  Indicator.close();
                  Toast({
                    message:'切换失败请刷新重试',
                    duration: 2000,
                    iconClass: 'glyphicon glyphicon-remove'
                  });
                })
              }else {
                Toast({
                  message:'呀好痛,已经到底了，别戳了~',
                  duration: 500
                })
              }
            } else if(this.listsort==='按点赞次数👍'){
              if (this.pageindex < this.pageMax) {
                Indicator.open();
                this.pageindex++;
                this.$http.get('user/allbyup?pageNum='+this.pageindex).then(result=>{
                  this.newsList = this.newsList.concat(result.body.list);
                  Indicator.close();
                  Toast({
                    message:'已切换',
                    duration: 500
                  });
                },result=>{
                  Indicator.close();
                  Toast({
                    message:'切换失败请刷新重试',
                    duration: 500,
                    iconClass: 'glyphicon glyphicon-remove'
                  });
                })
              }else {
                Toast({
                  message:'呀好痛,已经到底了，别戳了~',
                  duration: 500
                })
              }
            } else if(this.listsort==='按阅读次数🔥'){
              if (this.pageindex < this.pageMax) {
                Indicator.open();
                this.pageindex++;
                this.$http.get('user/allbyclick?pageNum='+this.pageindex).then(result=>{
                  this.newsList = this.newsList.concat(result.body.list);
                  Indicator.close();
                  Toast({
                    message:'已切换',
                    duration: 500
                  });
                },result=>{
                  Indicator.close();
                  Toast({
                    message:'切换失败请刷新重试',
                    duration: 500,
                    iconClass: 'glyphicon glyphicon-remove'
                  });
                })
              }else {
                Toast({
                  message:'呀好痛,已经到底了，别戳了~',
                  duration: 500
                })
              }
            }
        },



        toTop(e) {
          if(!!this.scrollState){
            return;
          }
          this.scrollState = 1;
          e.preventDefault();
          let distance = document.documentElement.scrollTop || document.body.scrollTop;
          let _this = this;
          this.time = setInterval(function(){ _this.gotoTop(_this.scrollTop-_this.dParams) }, 10);
        },
        gotoTop(distance){
          this.dParams += 20;
          distance = distance>0 ? distance : 0;
          document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
          if(this.scrollTop < 10){
            clearInterval(this.time);
            this.dParams = 20;
            this.scrollState = 0;
          }
        },
        getScrollTop() {
          this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        }
      }
    }
</script>

<style scoped>
  .mint-swipe{
    height: 150px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .mui-content > .mui-table-view:first-child {
    margin-top: 0px;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    margin: 0;
    padding: 11px 15px;
    vertical-align: top;
    border-right: 0px;
    border-bottom: 0px;
  }
  .scrollTop {
    position: fixed;
    right: 20px;
    bottom: 80px;
    cursor: pointer;
  }
  .radius{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    opacity: 0.7;
    box-shadow: 2px 2px 20px gray;
  }
  image[lazy=loading] {
    height: 100px;
    margin: auto;
  }
</style>
