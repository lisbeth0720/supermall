<template>
    <swiper>
         <!-- v-for后面添加:key='item' 不然报错 -->
        <swiper-item v-for="item in banners" :key='item'>
         <!-- 用变量里的属性需要加冒号 -->
            <a :href="item.link">
                <img :src="item.image" @load="imageLoad"/>
             </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

export default {
  name: 'HomeSwiper',
  props:{
     banners:{
         type:Array,
         default(){
           return []
         }
     }
  },
  data(){
      return {
         isLoad:false
      }
  },
  components: {//在components里注册组件后才能在模板里使用
     Swiper,
     SwiperItem
  },
  methods:{
     imageLoad(){
        //只需要发出一次就好
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoade=true;
        }
     }
  }
}
</script>

<style>
   .slide img{
     width:100%;
   }
</style>
