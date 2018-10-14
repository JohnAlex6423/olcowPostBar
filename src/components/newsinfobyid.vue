<template>
    <div style="padding: 10px">
      <h4 style="text-align: left">{{newsdetails.name}}</h4>
      <p align="left">{{newsdetails.person}}</p>
      <p style="display: flex; justify-content: space-between">
        <span>⚡{{newsdetails.time}}</span>
        <span style="font-size: 15px">🔥{{newsdetails.click}}</span>
        <span v-if="isbule" style="font-size: 15px;color: cornflowerblue" @click="upplus">👍{{newsdetails.up}}</span>
        <span v-if="!isbule" style="font-size: 15px" @click="upplus">👍{{newsdetails.up}}</span>
      </p>
      <hr/>
      <!--<div style="font-size: 12px;white-space: pre-wrap;">{{newsdetails.content}}</div>-->
      <div v-html="newsdetails.htmlcontent" style="padding-bottom: 15px;font-size: 12px;white-space: pre-wrap;"></div>
      <br/><hr/>
      <div>
        <textarea style="font-size: 12px" placeholder="请输入评论，最多100个字" maxlength="100" rows="3" v-model="content"></textarea>
        <div>
          <span @click="isshow=!isshow" style="font-size: 25px;float: left;margin-top: -10px">😁</span>
          <div v-show="isshow" style="position: absolute;float: left;z-index: 500;background-color: white;margin-bottom: 55px;margin-top: 30px">
            <hr style="margin-top: 0px;margin-bottom: 10px"/>
            <ul style="list-style: none;padding-left: 0px;padding-bottom: 0px">
              <li v-for="item in emoji" :key="item.id" style="float: left;margin-left: 5px;margin-right: 5px;margin-bottom: 10px">
                <span @click="addemoji(item.emoji)" style="font-size: 20px">{{item.emoji}}</span>
              </li>
              <span class="glyphicon glyphicon-chevron-up" style="float: left;margin-left: 5px" @click="isshow=!isshow">收起</span>
            </ul>
          </div>
        </div>
        <br/>
        <div class="mui-input-row mui-input-group" v-if="!naon">
          <label>昵称</label>
          <input type="text" class="mui-input-clear mui-input" placeholder="请输入昵称最长10个字" maxlength="10" v-model="name">
        </div>
        <div style="margin-top: 10px">
          <mt-switch style="float: left" v-model="naon">匿名评论？</mt-switch>
          <mt-button @click="refresh" type="primary" style="float: right;margin-right: 5px" size="small">重置</mt-button>
        </div>
        <mt-button type="primary" size="large" @click="publish">BB你的想法</mt-button>
      </div>
      <p v-if="commentslist.length > 0" style="margin-top: 10px;margin-bottom: -10px">{{newsdetails.commentcount}}评论</p>
      <hr/>
      <p v-if="commentslist.length > 0" style="margin-top: -10px;margin-bottom: 20px">热门评论🔥</p>
      <div v-if="commentslist.length > 0">
        <ul class="list-group">
          <li v-for="(item,index) in commentslist" :key="item.id">
            <div class="panel panel-danger" style="margin-top: -15px">
              <div class="panel-heading" style="text-align: left;color: gray;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                <p style="display: flex;justify-content: space-between;font-size: 12px;margin-bottom: 0px">
                  <span>{{item.name}}<br/></span>
                  <span>{{item.time}}</span>
                </p>
              </div>
              <div class="panel-body" style="text-align: left;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                {{item.content}}
              </div>
              <p style="font-size: 12px;margin-bottom: 0px;margin-top: 5px;display: flex;justify-content: space-between;padding-left: 15px;padding-right: 15px">
                <span v-if="item.replycount>0" @click="showreply(item.id)" style="color: cornflowerblue">展开回复({{item.replycount}})</span>
                <span v-if="!item.replycount>0">暂无回复</span>
                <span @click="showreplyfield(item.id)" style="color: cornflowerblue">回复</span>
                <span :class="[item.isshow?'blue':'']" @click="commentupplus(item,index)">👍{{item.up}}</span>
              </p>
              <transition>
                <div v-if="indexreplyfield===item.id" style="margin-bottom: 0px;margin-left: 5px;margin-right: 5px">
                  <textarea style="font-size: 12px" maxlength="100" placeholder="回复内容,最多输入100个字" rows="2" v-model="replycontent"></textarea>
                  <div class="mui-input-row mui-input-group" v-if="!replynaon" style="margin-top: -10px;margin-bottom: 20px">
                    <label>昵称</label>
                    <input type="text" class="mui-input-clear mui-input" placeholder="请输入昵称最长10个字" maxlength="10" v-model="replyname">
                  </div>
                  <p style="display: flex;justify-content: space-between">
                  <span style="margin-top: -7px;color: cornflowerblue" @click="indexreplyfield = -1">
                    <span class="glyphicon glyphicon-arrow-up"></span>收起
                  </span>
                    <span @click="isreplyshow=!isreplyshow" style="font-size: 25px;float: left;margin-top: -10px">😁</span>
                    <mt-switch v-model="replynaon" style="margin-top: -25px;margin-bottom: -10px">匿名发布？</mt-switch>
                    <mt-button @click="reply(index,item)" style="font-size: 15px;float: right;margin-top: -15px" size="small" type="primary">发送</mt-button>
                  </p>
                  <div v-show="isreplyshow" style="position: absolute;float: left;z-index: 500;background-color: white;margin-bottom: 55px">
                    <hr style="margin-top: 0px;margin-bottom: 10px"/>
                    <ul style="list-style: none;padding-left: 0px;padding-bottom: 0px">
                      <li v-for="item in emoji" :key="item.id" style="float: left;margin-left: 5px;margin-right: 5px;margin-bottom: 10px">
                        <span @click="addreplyemoji(item.emoji)" style="font-size: 20px">{{item.emoji}}</span>
                      </li>
                      <span class="glyphicon glyphicon-chevron-up" style="float: left;margin-left: 5px" @click="isshow=!isshow">收起</span>
                    </ul>
                  </div>
                </div>
              </transition>
              <transition>
              <ul v-if="indexreply===item.id" class="list-group" style="margin-bottom: -12px">
                <li v-for="item in replyslist" style="margin-bottom: -15px">
                    <div class="panel panel-default" style="margin-left: 5px;margin-right: 5px">
                      <div class="panel-heading" style="text-align: left;color: gray;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                        <p style="display: flex;justify-content: space-between;font-size: 12px;margin-bottom: 0px">
                          <span>{{item.name}}<br/></span>
                          <span>{{item.time}}</span>
                        </p>
                      </div>
                      <div class="panel-body" style="text-align: left;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                        {{item.content}}
                      </div>
                    </div>
                </li>
                <div>
                    <p style="display: flex;justify-content: space-between;margin-top: -15px;margin-right: 5px;margin-left: 5px;color: cornflowerblue">
                      <span @click="stopreply">
                      <span class="glyphicon glyphicon-arrow-up"></span>收起</span>
                      <span @click="getreplymore(indexreply)">查看更多</span>
                    </p>
                </div>
              </ul>
              </transition>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="newsdetails.commentcount > 10" style="font-size: 15px;margin-top: -10px;margin-bottom: -10px">
        <a @click="gethotcommentsmore">更多热评</a>
      </div>
      <p v-if="commentslist.length < 1">暂时还没有评论,快来抢沙发~</p>
      <div v-if="newsdetails.commentcount > 10" style="margin-bottom: 20px">
          <hr style="margin-bottom: 10px"/>
          <p>根据发布时间🙏</p>
      </div>
      <div v-if="newsdetails.commentcount > 10">
        <ul class="list-group">
          <li v-for="(item,index) in commentslistbytime" :key="item.id">
            <div class="panel panel-info" style="margin-top: -15px">
              <div class="panel-heading" style="text-align: left;color: gray;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                <p style="display: flex;justify-content: space-between;font-size: 12px;margin-bottom: 0px">
                  <span>{{item.name}}<br/></span>
                  <span>{{item.time}}</span>
                </p>
              </div>
              <div class="panel-body" style="text-align: left;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                {{item.content}}
              </div>
              <p style="font-size: 12px;margin-bottom: 0px;margin-top: 5px;display: flex;justify-content: space-between;padding-left: 15px;padding-right: 15px">
                <span v-if="item.replycount>0" @click="showreplybytime(item.id)" style="color: cornflowerblue">展开回复({{item.replycount}})</span>
                <span v-if="!item.replycount>0">暂无回复</span>
                <span @click="showreplyfieldbytime(item.id)" style="color: cornflowerblue">回复</span>
                <span :class="[item.isshow?'blue':'']" @click="commentupplusbytime(item,index)">👍{{item.up}}</span>
              </p>
              <transition>
                <div v-if="indexreplyfieldbytime===item.id" style="margin-bottom: 0px;margin-left: 5px;margin-right: 5px">
                  <textarea style="font-size: 12px" maxlength="50" placeholder="回复内容,最多输入50个字" rows="2" v-model="replycontent"></textarea>
                  <div class="mui-input-row mui-input-group" v-if="!replynaon" style="margin-top: -10px;margin-bottom: 20px">
                    <label>昵称</label>
                    <input type="text" class="mui-input-clear mui-input" placeholder="请输入昵称最长10个字" maxlength="10" v-model="replyname">
                  </div>
                  <p style="display: flex;justify-content: space-between">
                  <span style="margin-top: -7px;color: cornflowerblue" @click="indexreplyfieldbytime = -1">
                    <span class="glyphicon glyphicon-arrow-up"></span>收起
                  </span>
                    <mt-switch v-model="replynaon" style="margin-top: -25px;margin-bottom: -10px">匿名发布？</mt-switch>
                    <mt-button @click="replybytime(index,item)" style="font-size: 15px;float: right;margin-top: -15px" size="small" type="primary">发送</mt-button>
                  </p>
                </div>
              </transition>
              <transition>
              <ul v-if="indexreplybytime===item.id" class="list-group" style="margin-bottom: -12px">
                <li v-for="item in replyslist" :key="item.id" style="margin-bottom: -15px">
                    <div class="panel panel-default" style="margin-left: 5px;margin-right: 5px">
                      <div class="panel-heading" style="text-align: left;color: gray;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                        <p style="display: flex;justify-content: space-between;font-size: 12px;margin-bottom: 0px">
                          <span>{{item.name}}<br/></span>
                          <span>{{item.time}}</span>
                        </p>
                      </div>
                      <div class="panel-body" style="text-align: left;font-size: 12px;padding-top: 0px;padding-bottom: 0px">
                        {{item.content}}
                      </div>
                    </div>
                </li>
                <div>
                    <p style="display: flex;justify-content: space-between;margin-top: -15px;margin-right: 5px;margin-left: 5px;color: cornflowerblue">
                      <span @click="stopreplybytime">
                      <span class="glyphicon glyphicon-arrow-up"></span>收起</span>
                      <span @click="getreplymore(indexreplybytime)">查看更多</span>
                    </p>
                </div>
              </ul>
              </transition>
            </div>
          </li>
        </ul>
        <div v-if="newsdetails.commentcount > 10" style="font-size: 15px;margin-top: -10px;margin-bottom: -10px">
          <a @click="gethotcommentsmorebytime">查看更多</a>
        </div>
      </div>
      <br/><br/><br/>
    </div>
</template>

<script>
  import { Toast,Indicator } from 'mint-ui'
    export default {
        name:'vm',
        data(){
          return {
            newsdetails:{},
            up:false,
            isbule:false,
            content:'',
            naon:true,
            name:'',
            commentslist:[],
            commentslistbytime:[],
            replyslist:[],
            indexreply:-1,
            indexreplyfield:-1,
            hotpageindex:1,
            hotpagemax:1,
            timepagemax:1,
            timepageindex:1,
            indexreplybytime:-1,
            indexreplyfieldbytime:-1,
            replycontent:'',
            replyname:'',
            replynaon:true,
            replypageindex:1,
            replypagemax:1,
            lastcid:-1,
            isshow:false,
            isreplyshow:false,
            emoji:[{id: 1, emoji: '😁'},{id: 2, emoji: '😂'},{id: 3, emoji: '😃'},{id: 4, emoji: '😄'},{id: 5, emoji: '👿'},{id: 6, emoji: '😉'},{id: 7, emoji: '😊'},{id: 8, emoji: '😌'},{id: 9, emoji: '😍'},{id: 10, emoji: '😏'},{id: 11, emoji: '😒'},{id: 12, emoji: '😓'},{id: 13, emoji: '😔'},{id: 14, emoji: '😖'},{id: 15, emoji: '😘'},{id: 16, emoji: '😚'},{id: 17, emoji: '😜'},{id: 18, emoji: '😝'},{id: 19, emoji: '😞'},{id: 20, emoji: '😠'},{id: 21, emoji: '😡'},{id: 22, emoji: '😢'},{id: 23, emoji: '😣'},{id: 24, emoji: '😥'},{id: 25, emoji: '😨'},{id: 26, emoji: '😪'},{id: 27, emoji: '😭'},{id: 28, emoji: '😰'},{id: 29, emoji: '😱'},{id: 30, emoji: '😲'},{id: 31, emoji: '😳'},{id: 32, emoji: '😷'},{id: 33, emoji: '🙃'},{id: 34, emoji: '😋'},{id: 35, emoji: '😗'},{id: 36, emoji: '😛'},{id: 37, emoji: '🤑'},{id: 38, emoji: '🤓'},{id: 39, emoji: '😎'},{id: 40, emoji: '🤗'},{id: 41, emoji: '🙄'},{id: 42, emoji: '🤔'},{id: 43, emoji: '😩'},{id: 44, emoji: '😤'},{id: 45, emoji: '🤐'},{id: 46, emoji: '🤒'}]
          }
        },
      created(){
          Indicator.open();
          this.$http.get('user/finduserbyid?id='+this.$route.params.id).then(result=>{
            this.newsdetails=result.body;
            Indicator.close();
          },result=>{
            Indicator.close();
            Toast({
              message: '初始化失败,请刷新重试!',
              duration: 2000,
              iconClass: 'glyphicon glyphicon-remove'
            });
          });
          Indicator.open();
          this.$http.get('comment/allbyuidbyup?uid='+this.$route.params.id).then(result=>{
            this.commentslist = result.body.list;
            this.hotpagemax = result.body.pages;
            Indicator.close();
          },result=>{
            Indicator.close();
            Toast({
              message: '热论初始化失败,请刷新重试!',
              duration: 2000,
              iconClass: 'glyphicon glyphicon-remove'
            });
          });
          Indicator.open();
          this.$http.get('comment/allbyuidbytime?uid='+this.$route.params.id).then(result=>{
            this.commentslistbytime = result.body.list;
            this.timepagemax = result.body.pages;
            Indicator.close();
          },result=>{
            Indicator.close();
            Toast({
              message: '评论初始化失败，请刷新重试!',
              duration: 2000,
              iconClass: 'glyphicon glyphicon-remove'
            });
          });
          Indicator.open();
          this.$http.post('user/clickplusonebyid',{
            id:this.$route.params.id},{emulateJSON:true}).then(result=>{
              this.newsdetails.click+=1;
              Indicator.close();
          },result=>{
              Indicator.close();
              Toast({
                message: '点击初始化失败,但无伤大雅!',
                duration: 2000,
                iconClass: 'glyphicon glyphicon-remove'
              })
          })
      },
      methods:{
          ref(){
            Indicator.open();
            this.$http.get('comment/allbyuidbyup?uid='+this.$route.params.id).then(result=>{
              this.commentslist = result.body.list;
              this.hotpagemax = result.body.pages;
              Indicator.close();
            },result=>{
              Indicator.close();
              Toast({
                message: '评论自动初始化失败,请刷新!',
                duration: 2000,
                iconClass: 'glyphicon glyphicon-remove'
              });
            });
            Indicator.open();
            this.$http.get('comment/allbyuidbytime?uid='+this.$route.params.id).then(result=>{
              this.commentslistbytime = result.body.list;
              this.timepagemax = result.body.pages;
              Indicator.close();
            },result=>{
              Indicator.close();
              Toast({
                message: '评论自动初始化失败，请刷新!',
                duration: 2000,
                iconClass: 'glyphicon glyphicon-remove'
              });
            });
          },
          upplus(){
            Indicator.open();
            if(!this.up){
              this.$http.post('user/upplusonebyid',{
                id:this.$route.params.id},{emulateJSON:true}).then(result=>{
                this.newsdetails.up+=1;
                Indicator.close();
                Toast({
                  message:'已点赞！',
                  duration: 500,
                  iconClass:'glyphicon glyphicon-heart'
                });
                this.isbule=true
              },result=>{
                Indicator.close();
                Toast({
                  message: '点赞失败,请刷新重试!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-remove'
                });
              });
              this.up=true
            }else {
              this.$http.post('user/uplessonebyid',{
                id:this.$route.params.id},{emulateJSON:true}).then(result=>{
                Indicator.close();
                Toast({
                  message:'取消赞！',
                  duration: 500,
                  iconClass:'glyphicon glyphicon-repeat'
                });
                this.isbule = false;
                this.newsdetails.up-=1
              },result=>{
                Indicator.close();
                Toast({
                  message: '取消赞失败,请刷新重试!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-remove'
                });
              });
              this.up=false
            }
          },
        publish(){
            if (this.content.length<1){
              Toast({
                message:'内容不能为空！',
                duration: 500
              })
            }else {
              if (this.naon){
                this.name = '匿名'
              }else if (this.name.length<1){
                Toast({
                  message:'昵称不能为空！',
                  duration: 500
                });
                return;
              }
              Indicator.open();
              this.$http.post('comment/addcomment',{
                uid:this.$route.params.id,
                name:this.name,
                content:this.content,
                time:new Date().toLocaleString(),
                up:0
              },{emulateJSON:true}).then(result=>{
                this.content = "";
                this.name = "";
                this.$http.post('user/commentplusonebyid',{
                  id:this.$route.params.id},{emulateJSON:true}).then(result=>{
                },result=>{
                    Indicator.close();
                    Toast({
                      message:'评论+1不成功,但是评论发出去了,很难受兄弟',
                      duration: 2500
                    });
                });
                Indicator.close();
                this.ref();
                this.newsdetails.commentcount=this.newsdetails.commentcount+1;
                Toast({
                  message:'发表成功',
                  duration: 500,
                  iconClass: 'glyphicon glyphicon-ok'
                });
              },result=>{
                Indicator.close();
                Toast({
                  message:'发表失败,请刷新重试!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-remove'
                })
              })
            }
        },
        reply(index,item){
          if (this.replycontent.length<1){
            Toast({
              message:'内容不能为空！',
              duration: 500
            })
          }else {
            if (this.replynaon){
              this.replyname = '匿名'
            }else if (this.replyname.length<1){
              Toast({
                message:'昵称不能为空！',
                duration: 500
              });
              return;
            }
            Indicator.open();
            this.$http.post('comment/addreply',{
              cid:item.id,
              name:this.replyname,
              content:this.replycontent,
              time:new Date().toLocaleString(),
            },{emulateJSON:true}).then(result=>{
              this.$http.post('comment/replycountplusonebyid',{
                id:item.id},{emulateJSON:true}).then(result=>{
              },result=>{
                Indicator.close();
                Toast({
                  message:'回复+1不成功,但是回复发出去了,很难受兄弟',
                  duration: 2500
                });
              });
              this.replycontent = "";
              this.replyname = "";
              this.$set(this.commentslist,index,{
                id:item.id,
                name:item.name,
                content:item.content,
                up:item.up,
                time:item.time,
                replycount:item.replycount+1
              });
              Indicator.close();
              Toast({
                message:'回复成功',
                duration: 500,
                iconClass: 'glyphicon glyphicon-ok'
              });
              this.showreply(item.id);
              this.indexreplyfield = -1;
            },result=>{
              Indicator.close();
              Toast({
                message:'发表失败,请刷新重试!',
                duration: 1000,
                iconClass: 'glyphicon glyphicon-remove'
              })
            })
          }
        },
        replybytime(index,item){
          if (this.replycontent.length<1){
            Toast({
              message:'内容不能为空！',
              duration: 500
            })
          }else {
            if (this.replynaon){
              this.replyname = '匿名'
            }else if (this.replyname.length<1){
              Toast({
                message:'昵称不能为空！',
                duration: 500
              });
              return;
            }
            Indicator.open();
            this.$http.post('comment/addreply',{
              cid:item.id,
              name:this.replyname,
              content:this.replycontent,
              time:new Date().toLocaleString(),
            },{emulateJSON:true}).then(result=>{
              this.$http.post('comment/replycountplusonebyid',{
                id:item.id},{emulateJSON:true}).then(result=>{
              },result=>{
                Indicator.close();
                Toast({
                  message:'回复+1不成功,但是回复发出去了,很难受兄弟',
                  duration: 2500
                });
              });
              this.replycontent = "";
              this.replyname = "";
              this.$set(this.commentslistbytime,index,{
                id:item.id,
                name:item.name,
                content:item.content,
                up:item.up,
                time:item.time,
                replycount:item.replycount+1
              });
              Indicator.close();
              Toast({
                message:'回复成功',
                duration: 500,
                iconClass: 'glyphicon glyphicon-ok'
              });
              this.showreplybytime(item.id);
              this.indexreplyfieldbytime = -1;
            },result=>{
              Indicator.close();
              Toast({
                message:'发表失败,请刷新重试!',
                duration: 1000,
                iconClass: 'glyphicon glyphicon-remove'
              })
            })
          }
        },
        commentupplus(item,index){
            Indicator.open();
            if (item.isshow) {
              this.$http.post('comment/uplessonebyid',{
                id:item.id},{emulateJSON:true}).then(result=>{
                this.$set(this.commentslist,index, {
                  id:item.id,
                  name:item.name,
                  content:item.content,
                  up:item.up-1,
                  time:item.time,
                  replycount:item.replycount});
                Indicator.close();
                Toast({
                  message:'已取消！',
                  duration: 500,
                  iconClass:'glyphicon glyphicon-repeat'
                });
              },result=>{
                Indicator.close();
                Toast({
                  message: '取消赞失败,请刷新重试!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-remove'
                });
              })
            }else {
              this.$http.post('comment/upplusonebyid',{
                id:item.id},{emulateJSON:true}).then(result=>{
                this.$set(this.commentslist,index, {
                  id:item.id,
                  name:item.name,
                  content:item.content,
                  up:item.up+1,
                  time:item.time,
                  replycount:item.replycount,
                  isshow:true});
                Indicator.close();
                Toast({
                  message:'已点赞!',
                  duration: 500,
                  iconClass:'glyphicon glyphicon-heart'
                });
              },result=>{
                Indicator.close();
                Toast({
                  message: '点赞失败!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-remove'
                });
              })
            }
        },
        commentupplusbytime(item,index){
          Indicator.open();
          if (item.isshow) {
            this.$http.post('comment/uplessonebyid',{
              id:item.id},{emulateJSON:true}).then(result=>{
              this.$set(this.commentslistbytime,index, {
                id:item.id,
                name:item.name,
                content:item.content,
                up:item.up-1,
                time:item.time,
                replycount:item.replycount});
              Indicator.close();
              Toast({
                message:'已取消！',
                duration: 500,
                iconClass:'glyphicon glyphicon-repeat'
              });
            },result=>{
              Indicator.close();
              Toast({
                message: '取消赞失败,请刷新重试!',
                duration: 1000,
                iconClass: 'glyphicon glyphicon-remove'
              });
            })
          }else {
            this.$http.post('comment/upplusonebyid',{
              id:item.id},{emulateJSON:true}).then(result=>{
              this.$set(this.commentslistbytime,index, {
                id:item.id,
                name:item.name,
                content:item.content,
                up:item.up+1,
                time:item.time,
                replycount:item.replycount,
                isshow:true});
              Indicator.close();
              Toast({
                message:'已点赞!',
                duration: 500,
                iconClass:'glyphicon glyphicon-heart'
              });
            },result=>{
              Indicator.close();
              Toast({
                message: '点赞失败!',
                duration: 1000,
                iconClass: 'glyphicon glyphicon-remove'
              });
            })
          }
        },
        gethotcommentsmore(){
            if(this.hotpageindex < this.hotpagemax){
              Indicator.open();
              this.hotpageindex++;
              this.$http.get('comment/allbyuidbyup?pageNum=' + this.hotpageindex + '&uid=' + this.$route.params.id).then(result=>{
                this.commentslist = this.commentslist.concat(result.body.list);
                Indicator.close();
              },result=>{
                this.hotpageindex--;
                Indicator.close();
                Toast({
                  message:'加载失败,请刷新重试!',
                  duration: 2000,
                  iconClass: 'glyphicon glyphicon-remove'
                })
              })
            } else {
              Toast({
                message:'没有更多了~',
                duration: 500
              })
            }
        },
        gethotcommentsmorebytime(){
          if(this.timepageindex < this.timepagemax){
            Indicator.open();
            this.timepageindex++;
            this.$http.get('comment/allbyuidbytime?pageNum=' + this.timepageindex + '&uid=' + this.$route.params.id).then(result=>{
              this.commentslistbytime = this.commentslistbytime.concat(result.body.list);
              Indicator.close();
            },result=>{
              this.timepageindex--;
              Indicator.close();
              Toast({
                message:'加载失败,请刷新重试!',
                duration: 2000,
                iconClass: 'glyphicon glyphicon-remove'
              })
            })
          } else {
            Toast({
              message:'没有更多了~',
              duration: 500
            })
          }
        },
        getreplymore(id){
          if(id!==this.lastcid){
            this.replypageindex = 1;
          }
          if (this.replypageindex < this.replypagemax) {
            Indicator.open();
            this.replypageindex++;
            this.$http.get('comment/allreplybycid?cid=' + id + '&pageNum=' + this.replypageindex).then(result=>{
              this.replyslist = this.replyslist.concat(result.body.list);
              this.lastcid = id;
              Indicator.close();
            },result=>{
              this.lastcid = id;
              Indicator.close();
              Toast({
                message:'加载失败,请刷新重试!',
                duration: 2000,
                iconClass: 'glyphicon glyphicon-remove'
              })
            })
          }else {
            Toast({
              message:'没有更多辣~',
              duration: 500
            })
          }
        },
        refresh(){
            this.content = "";
            this.name = "";
        },
        showreply(id){
            Indicator.open();
            this.$http.get('comment/allreplybycid?cid=' + id).then(result=>{
              this.replyslist = result.body.list;
              this.replypagemax = result.body.pages;
              this.indexreply = id;
              this.indexreplybytime = -1;
              Indicator.close();
            },result=>{
              this.indexreply = -1;
              Indicator.close();
              Toast({
                message:'加载失败,请刷请新后重试',
                duration: 1000,
                iconClass: 'glyphicon glyphicon-remove'
              })
            })
        },
        showreplyfield(id){
            this.indexreplyfield = id;
            this.indexreplyfieldbytime = -1;
        },
        showreplybytime(id){
          Indicator.open();
          this.$http.get('comment/allreplybycid?cid=' + id).then(result=>{
            this.replyslist = result.body.list;
            this.replypagemax = result.body.pages;
            this.indexreplybytime = id;
            this.indexreply = -1;
            Indicator.close();
          },result=>{
            Indicator.close();
            Toast({
              message:'加载失败,请刷请新后重试',
              duration: 1000,
              iconClass: 'glyphicon glyphicon-remove'
            })
          })
        },
        showreplyfieldbytime(id){
          this.indexreplyfieldbytime = id;
          this.indexreplyfield = -1;
        },
        stopreply(){
            this.indexreply = -1;
            this.replypageindex = 1;
        },
        stopreplybytime(){
            this.indexreplybytime = -1;
            this.replypageindex = 1;
        },
        addemoji(emoji){
          this.content = this.content + emoji
        },
        addreplyemoji(emoji){
          this.replycontent = this.replycontent + emoji
        }
      }
    }
</script>

<style scoped>
  .blue{
    color: cornflowerblue;
  }
  li{
    list-style: none;
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
