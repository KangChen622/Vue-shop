<template>  
    <mt-swipe :auto="4000" class="banner-container">
       <mt-swipe-item v-for="(item,index) in lunbotuList" :key='index'>
           <!-- 动态输出img 是否全屏 -->
           <!-- <a :href="item.url" > -->
           <img :src="item.img" alt="" :class="{'full':isfull}">
           <!-- </a> -->
       </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
    props:['lunbotuList','isfull']
};
</script>
<style lang="less">
  .banner-container {
    height: 200px;
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: yellow;
      }
      &:nth-child(2) {
        background-color: blue;
      }
      &:nth-child(3) {
        background-color: skyblue;
      }
      a {
        display: block;
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
  }
</style>
