<template>
  <div>
    <h1>待开发</h1>
    <br/>
    <img @click="addto" src="http://123.206.93.200/images/支付宝.png"/>
    <h3>源码已上传，有兴趣可以自行查看：</h3>
    <a href="https://github.com/JohnAlex6423/Vue-" target="_blank">https://github.com/JohnAlex6423/Vue-</a>
    <h3 style="margin-bottom: 55px">有问题联系QQ642385985</h3>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          to:0
        }
      },
      watch:{
        'to'(){
          if (this.to > 26){
            this.$router.push({path:'egg'})
          }
        }
      },
      methods:{
        addto(){
          this.to++;
        }
      }
    }
</script>

<style scoped>

</style>
