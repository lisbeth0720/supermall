<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages" :key="item">
            <img :src="item" alt=""/>
        </swiper-item>
    </swiper>
</template>
<script>
 import {Swiper,SwiperItem} from "components/common/swiper/index.js"
 
  export default{
      name:"DetailSwiper",
      components:{
          Swiper,
          SwiperItem
      },
      props:{
        topImages:{
            type:Array,
            default(){
             return []
            }
         }
      },
      created(){
          //console.log(this.topImages)
      }
  }
</script>
<style scoped>
  .detail-swiper img{
      height:240px;
      width:100%;
  }
</style>