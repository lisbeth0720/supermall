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
         <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"/>
         <detail-param-info :param-info="paramInfo" />
         <detail-comment-info :comment-info="commentInfo" />
         <goods-list :goods="recommends"/>
   </better-scroll>
  </div>
</template>
<script>
 //1.一些子组件
 import DetailNavBar from "./childComps/DetailNavBar.vue"
 import DetailSwiper from "./childComps/DetailSwiper.vue"
 import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
 import DetailShopInfo from "./childComps/DetailShopInfo.vue"
 import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
 import DetailParamInfo from "./childComps/DetailParamInfo.vue"
 import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"

  //2.一些插件或公共组件
 import BetterScroll from "components/common/scroll/BetterScroll.vue"
 import GoodsList from "components/content/goods/GoodsList.vue"

 //import emitter from "assets/utils/mitt.js";

 //3.一些方法
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
  import {debounce} from "common/utils.js";

  export default{
      name:"Detail",
      components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          BetterScroll,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          GoodsList
      },
      data(){
          return{
              iid:null,
              topImages:[],
              goods:{},
              shop:{},
              detailInfo:{},
              paramInfo:{},//商品参数信息
              commentInfo:{},//商品评论信息
              recommends:[],//商品推荐信息
              itemImgListener:null
          }
      },
   activated(){
       //1.取消全局事件的监听
       emitter.bus$off("itemImgLoad",this.itemImgListener)
    },
    deactivated(){
      console.log("detail leave")
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
            //2.4保存商品详情数据
            this.detailInfo=data.detailInfo;
            //2.5取出商品参数信息
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
            //2.6取出商品评论信息-评论信息不一定有 所以需要加判断
            if(data.rate.cRate!==0){
              //当某个商品有多条评论的时候，这里虽然有多条评论信息，但是只需要展示一条，当点击更多的时候展示全部的 全部评论会在更一个界面
               this.commentInfo=data.rate.list[0];
            }
            
         })
     
         //3.请求推荐数据
         getRecommend().then(res=>{
            this.recommends=res.data.list;
         })
    
    },
      mounted(){
      //1.监听item中图片加载完成
      //  emitter.on("itemImageLoad",()=>{
      //    this.$refs.scroll.refresh();
      //  });
      //处理this.$refs.scroll.refresh();调用频繁的问题
       const refresh = debounce(this.$refs.scroll.refresh,200);
     //对监听的事件进行保存 
      this.itemImgListener=()=>{
          refresh();
      }
       emitter.on("itemImageLoad");
     },
     methods:{
       imagesLoad(){
         this.$refs.scroll.refresh();
       }
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
     position: absolute;
      top: 44px; 
      bottom: 49px;
      left: 0;
      right: 0;
      overflow:hidden;
      /* height:calc(100% - 44px) */
     
  }
</style>