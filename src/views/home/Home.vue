<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <div class="content">
         <swiper>
               <!-- v-for后面添加:key='item' 不然报错 -->
             <swiper-item v-for="item in banner" :key='item'>
               <!-- 用变量里的属性需要加冒号 -->
                 <a :href="item.link">
                    <img :src="item.image" />
                 </a>
              </swiper-item>
         </swiper>
      </div>
  </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
//下面导入用{}的原因，因为home.js文件里未用default导出，用default导出的时候才能把大括号删除
//export导出的，你若要import必须加上{}; export default不需要、不能加
import { getHomeMultidata } from "network/home.js"
//import Swiper from 'components/common/swiper/Swiper.vue';
//import SwiperItem from 'components/common/swiper/SwiperItem.vue';
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name: 'Home',
  components: {//在components里注册组件后才能在模板里使用
     NavBar,
     Swiper,
     SwiperItem
  },
  data(){//这里需要把请求到的数据存到这里
    return {
      //组件里的result会一直存在，不会被回收
       banner:[],
       recommend:[]
    }
  },
  created(){//切记 这里是created 不是create
    //组件创建完成的时候开始发送网络请求
    //1.请求多个数据
    //created里也有this是指当前组件对象
    //console.log(this)
      getHomeMultidata().then(res=>{
        //res会被回收
        console.log(res);
        //this在箭头函数里是向上找作用域
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      },err=>{
        console.log(err)
      })
  }
}
</script>

<style>
  #home {
    /*position: relative;*/
    height: 100vh;
  }
   .home-nav{
     background-color:var(--color-tint);
     color:#fff;
   }
   .content{
     position: absolute;
     top: 44px;
     bottom: 49px;
     left: 0;
     right: 0;
   }
   .slide img{
     width:100%;
   }
</style>
