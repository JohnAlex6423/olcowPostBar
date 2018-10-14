<template>
  <div>
    <h1>待开发</h1>
    <br/>
    <img @click="addto" src="http://123.206.93.200/images/支付宝.png"/>
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
