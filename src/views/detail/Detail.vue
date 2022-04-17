<template>
  <div id="detail">
    <!-- @title-click也可写成@titleClick 但是属性中最好用"-"不要用驼峰:probe-type="3"-->
    <detail-nav-bar class="detail-nav" 
                    @title-click="titleClick" ref="nav"/>
    <!-- 注意用better-scorll的时候必须给外层div一个高度 -->
    <!-- :pull-up-load="true" 这个必传，不传不滚动-->
    <better-scroll class="content"
                   ref="scroll" 
                   :probe-type="3" 
                    @scroll="contentScroll"
                    :pull-up-load="true">
         <detail-swiper :top-images="topImages" 
                   :goods="goods"/>
         <detail-base-info :goods="goods" />
         <detail-shop-info :shop="shop" />
         <detail-goods-info :detail-info="detailInfo" @detail-images-load="imagesLoad"/>
         <detail-param-info :param-info="paramInfo" ref="params"/>
         <detail-comment-info :comment-info="commentInfo" ref="comment"/>
         <goods-list :goods="recommends" :which-page="1" ref="recommend"/>
   </better-scroll>
   <detail-bottom-bar @addToCart="addToCart" class="bottomBar"></detail-bottom-bar>
    <!-- <back-top @backTop="backTop" class="back-top" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top> -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
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
 import DetailBottomBar from "./childComps/DetailBottomBar.vue"

  //2.一些插件或公共组件或常量
 import BetterScroll from "components/common/scroll/BetterScroll.vue"
 import GoodsList from "components/content/goods/GoodsList.vue"
 //import emitter from "assets/utils/mitt.js";
 import {itemListenerMixin} from "common/mixin.js";
 import BackTop from 'components/content/backTop/BackTop'
  import {BACK_POSITION} from "common/const.js"

  import { useStore } from 'vuex'
  
 //3.一些方法
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
  import {debounce} from "common/utils.js";

  export default{
      name:"Detail",
      setup () {
     // this.$store.state.info
     // Vue3中store类似于Vue2中this.$store
     // useStore()方法创建store对象，相当于src/store/index.js中的store实例对象
     const store = useStore()
     //vue 3x 中的写法
     //console.log(store.state.carList) 
     //vue 2x的写法
     //console.log($store.state.carList)


     },
      components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          BetterScroll,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          GoodsList,
          DetailBottomBar,
          BackTop,
      },
      mixins:[itemListenerMixin],
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
              //itemImgListener:null
              bsMaxScrollY:0, //better-scroll最大高度，检测是否滚到底部
              themeTopYs:[],//顶部导航分类下的每个分类的开始区域的Y值，用于实现点击分类按钮滚动到对应的y值位置
              getThemeTopY:null,
              currentIndex:0,
              isShowBackTop:false
          }
      },
   activated(){
      
    },
    deactivated(){
      //console.log("detail leave")
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
            //console.log(this.recommends[0].image)
         })
        //第一次获取，值不对-原因是this.$refs.params.$el压根没被渲染
         //this.themeTopYs=[];
          // this.themeTopYs.push(0);//第一个值肯定是0，顶部
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
           
           //第二次获取，值不对-原因是图片没有计算在内，（下面mounted里也是这个原因)
          // this.$nextTick(() =>{//这个意思是下面的dom渲染后会执行this.$nextTick
          //     this.themeTopYs=[];
          //     this.themeTopYs.push(0);//第一个值肯定是0，顶部
          //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //     console.log(this.themeTopYs)
          // })
    
    },
      mounted(){
      //1.监听item中图片加载完成
      //  emitter.on("itemImageLoad",()=>{
      //    this.$refs.scroll.refresh();
      //  });
      //处理this.$refs.scroll.refresh();调用频繁的问题
      //下面的代码由于和home.vue中的一样，所以进行了封装用了xinmin混入写法，具体代码在mixin.js里
    //    const newRefresh = debounce(this.$refs.scroll.refresh,200);
    //  //对监听的事件进行保存 
    //   this.itemImgListener=()=>{
    //       newRefresh();
    //   }
    //    emitter.on("itemImageLoad",this.itemImgListener);

       //获取导航对应顶部位置
       //用$el的原因是因为this.$refs.params是组件不能通过this.$refs.params.offsetTop;来拿到值，组件需要加$el
       //代码不能写在这里，因为在这里拿不到元素this.$refs.params因为我在下面这几个组件中加了判断，当没有数据的时候是不能渲染dom的，也就是说在mounted里这时候数据还没请求过来-所以需要放到能拿到值的地方-updated()里是能保证是有值的，但是不能保证dom渲染完成了，所以写在那里也是不建议的，建议写法在mounted里写并且+this.$nextTick(()
          //this.themeTopYs=[];
          // this.themeTopYs.push(0);//第一个值肯定是0，顶部
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //写在下面也不对，虽然dom已经被渲染出来了，但是图片并没有被加载出来，这时候取到值是不包括图片的值--所以需要放到图片加载完成后那
          // this.$nextTick(() =>{//这个意思是下面的dom渲染后会执行this.$nextTick
          //     this.themeTopYs=[];
          //     this.themeTopYs.push(0);//第一个值肯定是0，顶部
          //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //     console.log(this.themeTopYs)
          // })
     },
     updated(){
       //获取导航对应顶部位置-这里虽然已经赋值完数据了，但是界面需要渲染一会，需要一定的时间，所以在这里写不一定拿到值
          // this.themeTopYs=[];
          // this.themeTopYs.push(0);//第一个值肯定是0，顶部
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)
     },
     methods:{
       imagesLoad(){
         //this.$refs.scroll.refresh();
        //做防抖操作，不用刷新太多次-this.$refs.scroll.refresh();进行了防抖和封装操作，具体代码在mixin.js里
          this.newRefresh();

          //获取导航对应顶部位置-防止执行多次，可以加防抖函数，目的是防止频繁获取，提高性能
          //this.getThemeTopY=debounce(() =>{//后期需要排查这里的防抖为撒不起作用
             this.themeTopYs=[];
             this.themeTopYs.push(0);//第一个值肯定是0，顶部
             this.themeTopYs.push(this.$refs.params.$el.offsetTop)
             this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
             this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
             //console.log(this.themeTopYs) 

             //下面取到的this.bsMaxScrollY值还是不对 
             //this.bsMaxScrollY=-(this.$refs.recommend.$el.offsetTop+this.$refs.recommend.$el.offsetHeight)

              this.bsMaxScrollY=-(this.$refs.recommend.$el.offsetTop+this.$refs.recommend.$el.clientHeight)
          //})
       },
      
       //监听better-scroll滚动事件
       contentScroll(position){
         //1.判断是否滚动到底部了
        //if(this.bsMaxScrollY==position.y){
           //alert("抱歉，我是有底线的")
        // }
          //2.1获取y值
          const positionY=-position.y
          //2.2 positionY和主题中的值进行对比
         // [0,2643,3463,3755]
         // positionY在0-2643之间，index=0
         // positionY在2643-3463之间，index=1
         // positionY在3463-3755之间，index=2
         // positionY超过3755，index=3
         for(let i in this.themeTopYs){//用es6中的方法遍历的话得到的i是个支付串类型
            i=i*1;//为了转变成number
            //  if(i<this.themeTopYs.length-1){
            //    if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]) {
            //       console.log(i)
            //    }
            //  }else if(i==this.themeTopYs.length-1){//最后一个值
            //    if(positionY>this.themeTopYs[i]) {
            //       console.log(i)
            //    }
            //  }
            //上面代码的另一种写法
            let length=this.themeTopYs.length;
            //下面的执行太频繁了
            // if((i<length-1&&positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i==length-1&&positionY>this.themeTopYs[i])){
            //         console.log(i)
            // }
            //处理太频繁的问题，加判断this.currentIndex!==i
             if(this.currentIndex!==i&&((i<length-1&&positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i==length-1&&positionY>this.themeTopYs[i]))){
                    this.currentIndex=i;
                   // console.log(i)
                    //this.$refs.nav.currentIndex 这样能取到组件this.$refs.nav中的变量currentIndex
                    this.$refs.nav.currentIndex=this.currentIndex;
            }
         }
         //是否显示滚动到底部
        // this.isShowBackTop=-position.y>BACK_POSITION
         //1.判断BackTop是否显示
         this.isShowBackTop=(-position.y)>BACK_POSITION;
      },
      titleClick(index){
           //console.log(index);
           this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0];
        obj.title = this.goods.title;
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        obj.checked = false;
        // 3.添加到Store中
        //this.$store.commit('addCart', obj)
        this.$store.dispatch('addCart',obj)
      },
       backTop(){ //回到顶部
        //下面两种方式都能实现回到顶部
         //1.bscroll是组件BetterScroll的滚动事件，直接调用滚动事件中的scrollTo方法
         //1.this.$refs.scroll.bscroll.scrollTo(0,0,500);
        //2.scrollToTop()是组件BetterScroll组件里的方法 （这种方式体现了封装思想，面对这个组件，而这个组件中有scrollToTop这个方法，而scrollToTop这个方法内部做了什么在这里不需要关心，只需要知道组件BetterScroll里有个scrollToTop方法，面对这个组件进行开发就好。先把scrollTo事件封装到scrollToTop方法里，再通过调用组件中的方法）
          this.$refs.scroll.scrollToTop(0,0);
      }
     },
     destroyed(){
        //2.取消全局事件的监听
        //vue3去掉了$on、$off后，使用mitt第三方库替代eventBus的原理。
       //this.$bus.$off("itemImgLoad",this.itemImgListener)

        //用mitt插件中的off
       //emitter.off("itemImgLoad",this.itemImgListener);
       emitter.off("itemImgLoad",this.itemListenerMixin);
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
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
}
.bottomBar{
  z-index:9;
}
</style>