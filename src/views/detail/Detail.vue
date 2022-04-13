<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <!-- 注意用better-scorll的时候必须给外层div一个高度 -->
    <!-- :pull-up-load="true" 这个必传，不传不滚动-->
    <better-scroll class="content"
                   ref="scroll" 
                   :probe-type="3" 
                    @scroll="contentScroll"
                    :pull-up-load="true">
         <detail-swiper :topImages="topImages" 
                   :goods="goods"/>
         <detail-base-info :goods="goods" />
         <detail-shop-info :shop="shop" />
   </better-scroll>
  </div>
</template>
<script>
 import DetailNavBar from "./childComps/DetailNavBar.vue"
 import DetailSwiper from "./childComps/DetailSwiper.vue"
 import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
 import DetailShopInfo from "./childComps/DetailShopInfo.vue"
 import BetterScroll from "components/common/scroll/BetterScroll.vue"

 import {getDetail,Goods,Shop} from "network/detail.js"


  export default{
      name:"Detail",
      components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          BetterScroll
      },
      data(){
          return{
              iid:null,
              topImages:[],
              goods:{},
              shop:{}
          }
      },
      created(){
        //1.保存传入的iid
          this.iid=this.$route.params.iid;
        //2.根据iid请求详情数据
          getDetail(this.iid).then(res=>{
            //2.1.获取顶部轮播图数据
            const data=res.result;
            this.topImages=data.itemInfo.topImages
            //2.2.获取商品信息
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //2.3创建店铺信息
             this.shop=new Shop(data.shopInfo);
         })
      }
  }
</script>
<style scoped>
  #detail{
    position:relative;
    /* z-index:9; */
    background-color:#fff;
    height:100vh;
  }
  .detail-nav{
    position:relative;
    z-index:9;
    background-color:#fff;
  }
  .content{
     /* position: absolute;
      top: 44px; 
      bottom: 49px;
      left: 0;
      right: 0;
      overflow:hidden; */
      height:calc(100% - 44px)
     
  }
</style>