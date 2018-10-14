<template>
    <div>
      <h3>他们并不想和我合作</h3>
      <img @click="addto" src="http://123.206.93.200/images/支付宝.png"/>
      <iframe v-if="isshow" src="http://www.staggeringbeauty.com/" style="border: 1px inset #ddd" width="498" height="598"></iframe>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          to:0,
          isshow:false
        }
      },
      watch:{
        'to'(){
          if (this.to > 5){
            this.isshow = true
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
