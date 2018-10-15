<template>
  <div style="margin-right: 5px;margin-left: 5px">
    <label style="margin-top: 10px">标题</label>
    <textarea @click="isshow=false" placeholder="输入标题，最多30个字" maxlength="30" v-model="name"></textarea>
    <label>内容</label>
    <textarea ref="textarea" @click="isshow=false" style="font-size: 12px" placeholder="输入内容，最多一万字" maxlength="10000" rows="10" v-model="content">
    </textarea>
    <div style="">
      <span @click="isshow=!isshow" style="font-size: 25px;float: left;margin-top: -10px;margin-right: 30px">😁</span>
      <span class="glyphicon glyphicon-picture" style="font-size: 25px;float: left;overflow: hidden;color: gray;margin-top: -14px;width: 30px">
      <input @change="filess" ref="file" type="file" multiple="multiple" accept="image/*" style="position: absolute;right: 0px;top: 0px;opacity: 0;">
      </span>
      <span v-if="srcshow" style="font-size: 15px;float: left;margin-top: -10px;margin-left: 30px">提示：每个回车为一段哦~</span>
    </div>
    <br/>
      <div v-show="isshow" style="position: absolute;float: left;z-index: 500;background-color: white;margin-bottom: 55px">
        <hr style="margin-top: 0px;margin-bottom: 10px"/>
        <ul style="list-style: none;padding-left: 0px;padding-bottom: 0px">
          <li v-for="item in emoji" :key="item.id" style="float: left;margin-left: 5px;margin-right: 5px;margin-bottom: 10px">
            <span @click="addemoji(item.emoji)" style="font-size: 20px">{{item.emoji}}</span>
          </li>
          <span class="glyphicon glyphicon-chevron-up" style="float: left;margin-left: 5px" @click="isshow=!isshow">收起</span>
        </ul>
      </div>
    <div v-if="srcshow" style="display: inline-block;">
      <ul style="padding: 0px">
        <li v-for="(item,index) in imgsrc" style="float: left;list-style: none;margin: 5px;display: inline-block;">
          <p style="margin-right: 5px">在第{{item.rows}}段后插入</p>
          <img :src="item.src" style="float: left"/>
          <span @click="delimg(index)" class="glyphicon glyphicon-remove-sign" style="font-size: 30px;margin-left: -15px;margin-top: -15px;float: left"></span>
        </li>
      </ul>
    </div>
    <div class="mui-input-row mui-input-group" v-if="!naon" style="margin-top: 10px">
      <label>昵称</label>
      <input type="text" class="mui-input-clear mui-input" placeholder="请输入昵称最长10个字" maxlength="10" v-model="person">
    </div>
    <div style="margin-top: 10px">
        <mt-switch style="float: left" v-model="naon">匿名发布？</mt-switch>
        <mt-button @click="refresh" type="primary" style="float: right;margin-top:-5px;margin-right: 5px">重置</mt-button>
    </div>
    <mt-button style="margin-top: 60px" type="primary" size="large" @click="post">发表帖子</mt-button>
    <br/><br/><br/><br/><br/>
  </div>
</template>

<script>
  import { Toast,Indicator,MessageBox } from 'mint-ui';
    export default {
        data(){
          return {
            naon:true,
            name:'',
            content:'',
            htmlcontent:'',
            person:'',
            isshow:false,
            imgsrc: [],
            srcshow:false,
            imgsname:[],
            formdata:new FormData(),
            emoji:[{id: 1, emoji: '😁'},{id: 2, emoji: '😂'},{id: 3, emoji: '😃'},{id: 4, emoji: '😄'},{id: 5, emoji: '👿'},{id: 6, emoji: '😉'},{id: 7, emoji: '😊'},{id: 8, emoji: '😌'},{id: 9, emoji: '😍'},{id: 10, emoji: '😏'},{id: 11, emoji: '😒'},{id: 12, emoji: '😓'},{id: 13, emoji: '😔'},{id: 14, emoji: '😖'},{id: 15, emoji: '😘'},{id: 16, emoji: '😚'},{id: 17, emoji: '😜'},{id: 18, emoji: '😝'},{id: 19, emoji: '😞'},{id: 20, emoji: '😠'},{id: 21, emoji: '😡'},{id: 22, emoji: '😢'},{id: 23, emoji: '😣'},{id: 24, emoji: '😥'},{id: 25, emoji: '😨'},{id: 26, emoji: '😪'},{id: 27, emoji: '😭'},{id: 28, emoji: '😰'},{id: 29, emoji: '😱'},{id: 30, emoji: '😲'},{id: 31, emoji: '😳'},{id: 32, emoji: '😷'},{id: 33, emoji: '🙃'},{id: 34, emoji: '😋'},{id: 35, emoji: '😗'},{id: 36, emoji: '😛'},{id: 37, emoji: '🤑'},{id: 38, emoji: '🤓'},{id: 39, emoji: '😎'},{id: 40, emoji: '🤗'},{id: 41, emoji: '🙄'},{id: 42, emoji: '🤔'},{id: 43, emoji: '😩'},{id: 44, emoji: '😤'},{id: 45, emoji: '🤐'},{id: 46, emoji: '🤒'}]
          }
        },
      methods:{
        post(){
          if (this.name.length<1){
            Toast({
              message:'标题不能为空',
              duration:500
            });
          } else if (this.content.length < 1 && this.imgsrc.length < 1) {
            Toast({
              message:'内容不能为空',
              duration:500
            });
          } else{
            if (this.naon) {
              this.person = '匿名'
            }else if(this.person.length<1){
              Toast('昵称不能为空');
              return;
            }
              this.imgsupload();
          }
        },
        refresh(){
          this.name='';
          this.content='';
          this.person='';
          this.imgsrc=[];
          this.formdata.delete('file');
          this.htmlcontent=[];
        },
        addemoji(emoji){
          this.content = this.content + emoji
        },
        filess(){
          if (this.content==='') {
            for (let i = 0;i < this.$refs.file.files.length;i++){
              this.imgsrc.push({src:window.URL.createObjectURL(this.$refs.file.files[i]),rows:0});
              this.formdata.append('file',this.$refs.file.files[i])
            }
          } else{
            for (let i = 0;i < this.$refs.file.files.length;i++){
              this.imgsrc.push({src:window.URL.createObjectURL(this.$refs.file.files[i]),rows:this.content.split('\n').length});
              this.formdata.append('file',this.$refs.file.files[i])
            }
          }
          this.srcshow = true;
        },
        delimg(index){
          this.imgsrc.splice(index,1);
          let files = this.formdata.getAll('file');
          this.formdata.delete('file');
          files.splice(index,1);
          for (let i = 0; i < files.length; i++) {
            this.formdata.append('file',files[i])
          }
        },
        findchar(str,cha,num){
          let x=str.indexOf(cha);
          for(let i=0;i<num;i++){
            x=str.indexOf(cha,x+1);
          }
          return x;
        },
        addimg(n){
          this.htmlcontent = this.content;
          let f = 0;
          for (let i = 0;i < this.imgsrc.length;i++){
            if (this.imgsrc[i].rows === 0){
              f++;
            } else if (this.imgsrc[i].rows === this.content.split('\n').length) {
              this.htmlcontent = this.htmlcontent + '<br/><img src="'+'http://123.206.93.200/uploadimg/'+n[i]+'" style="width: 100%"><br/>';
            } else {
              this.htmlcontent = this.htmlcontent.substring(0,this.findchar(this.htmlcontent,'\n',this.imgsrc[i].rows-1)) +'<br/><img src="'+'http://123.206.93.200/uploadimg/'+n[i]+'" style="width: 100%"><br/>' + this.htmlcontent.substring(this.findchar(this.htmlcontent,'\n',this.imgsrc[i].rows-1))
            }
          }
          if (f > 0){
            for (let i = 0;i < f;i++){
              this.htmlcontent = '<br/><img src="'+'http://123.206.93.200/uploadimg/'+n[f-i-1]+'" style="width: 100%"><br/>' + this.htmlcontent
            }
          }
        },
        imgsupload(){
          MessageBox.confirm('', {
            message: '确定发帖吗？',
            title: '提示',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            if (action == 'confirm') {     //确认的回调
              if (this.imgsrc.length>10) {
                Toast({
                  message:'最多上传10张照片!',
                  duration: 1000,
                  iconClass: 'glyphicon glyphicon-exclamation-sign'
                });
                return;
              } else {
                Indicator.open('正在上传图片...');
                this.$http.post('http://123.206.93.200:8080/upload',
                  this.formdata,
                  {headers: {'Content-Type':'multipart/form-data'}}).then(result=>{
                  this.addimg(result.body);
                  Indicator.close();
                  Toast({
                    message:'上传成功!',
                    duration: 500
                  });
                  if(result.body.length===0){
                    Indicator.open();
                    this.$http.post('user/add',{
                      name:this.name,
                      person:this.person,
                      up:0,
                      click:0,
                      content:this.content.substring(0,30),
                      htmlcontent:this.htmlcontent,
                      time:this.getdateformat(),
                      isimg:0,
                      imgsrc:'0'}, {emulateJSON:true}).then(result=>{
                      this.refresh();
                      Indicator.close();
                      Toast({
                        message:'发表成功',
                        duration: 500,
                        iconClass:'glyphicon glyphicon-ok'
                      });
                      this.$router.push({name:'home', params:{ isref:'yes'}});
                    },result=>{
                      Toast({
                        message:'发表失败',
                        duration: 1000,
                        iconClass:'glyphicon glyphicon-remove'
                      });
                      Indicator.close();
                    })
                  } else {
                    Indicator.open();
                    this.$http.post('user/add',{
                      name:this.name,
                      person:this.person,
                      up:0,
                      click:0,
                      content:this.content.substring(0,30),
                      htmlcontent:this.htmlcontent,
                      time:this.getdateformat(),
                      isimg:1,
                      imgsrc:'http://123.206.93.200/uploadimg/'+result.body[0]}, {emulateJSON:true}).then(result=>{
                      this.refresh();
                      Indicator.close();
                      Toast({
                        message:'发表成功',
                        duration: 500,
                        iconClass:'glyphicon glyphicon-ok'
                      });
                      this.$router.push({name:'home', params:{ isref:'yes'}});
                    },result=>{
                      Toast({
                        message:'发表失败',
                        duration: 1000,
                        iconClass:'glyphicon glyphicon-remove'
                      });
                      Indicator.close();
                    })
                  }
                },result=>{
                  Toast({
                    message:'上传失败!请不要选择大于5M的图片!',
                    duration: 2000,
                    iconClass: 'glyphicon glyphicon-remove'
                  });
                  Indicator.close();
                  return ;
                })
              }
            }
          }).catch(err => {
            if (err == 'cancel') {     //取消的回调
            }
          });
        },
        getdateformat(){
          let date=new Date();
          let seconds = date.getSeconds();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          if (seconds < 10) {
            seconds = '0' + seconds
          }
          if (hours < 10){
            hours = '0' + hours
          }
          if (minutes < 10) {
            minutes = '0' + minutes
          }
          return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate()+' '+hours+':'+minutes+':'+seconds
        }
      },
      watch:{
          'content'(){
            if (this.content === "" && this.imgsrc.length>0) {
              for (let i = 0; i < this.imgsrc.length; i++) {
                this.$set(this.imgsrc,i,
                  {src:this.imgsrc[i].src,rows:0})
              }
            } else if (this.imgsrc.length > 0) {
              for (let i = 0; i < this.imgsrc.length; i++) {
                if (this.content.split('\n').length < this.imgsrc[i].rows){
                  this.$set(this.imgsrc,i,
                    {src:this.imgsrc[i].src,rows:this.content.split('\n').length})
                }
              }
            }
          }
      }
    }
</script>

<style scoped>
  img{
    height: 100px;
  }
</style>
