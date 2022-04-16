<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages" :key="item" class="slide">
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
/* .slide{
    height: 360px; 
    width:360px; 
    transition: all 300ms ease 0s;
    transform: translate3d(0px, 0px, 0px);
    z-index: 10; 
  }   */

  .detail-swiper img{
    height:360px;
    width:100%;
    /* position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    max-width: 100%;
    max-height: 100%;
    line-height: 100%;
    visibility: middle;  */
  }
</style>