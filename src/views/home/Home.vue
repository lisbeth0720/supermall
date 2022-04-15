<template>
  <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center><div>购物街</div></template>
      </nav-bar>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @itemClick="homeTabClick" 
                   ref="tabControl1"
                   v-show="isTabFixed" />
      <better-scroll class="content" 
                     ref="scroll" 
                     :probe-type="3" 
                     @scroll="contentScroll"
                     :pull-up-load="true"
                     @pulling-up="loadMore">
         <home-swiper :banners="banners" @swiper-image-load="swiperImageLoad"/>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']"
                   @itemClick="homeTabClick" 
                   ref="tabControl2" />
                   <!-- :class="{fixed:isTabFixed}" -->
             <goods-list :goods="showGoodsList" :which-page="0"></goods-list>
      </better-scroll>
      <!-- 组件事不能直接监听点击事件的，要想监听的话需要加".native",下面所示 -->
      <!-- v-show="true" 直接这样写不行，这是指令,有时候会把true当成一个变量,就算没被当成一个变量但是直接在这里写死了true也不好，没法控制显示与否，通过设置变量来确定什么时候显示，什么时候不显示 -->
      <!-- <back-top @click.native="backClick" v-show="true"/> -->
      <!--  .native修饰符vue 2x ，vue 3x中已经抛弃了这个-->
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
 //1.1公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BetterScroll from 'components/common/scroll/BetterScroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
 
 //2.子组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import RecommendView from './childComps/RecommendView.vue'
  
  //3.一些方法
  import {getHomeMultidata,getHomeGoods} from "network/home.js";
  //import {debounce} from "common/utils.js";
  import {itemListenerMixin} from "common/mixin.js";

  //4.一些插件-下面的进行了封装
  //import emitter from "assets/utils/mitt.js"

  export default {
		name: "Home",
    components: {
		  NavBar,
      
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BetterScroll,
      BackTop,
    },
    mixins:[itemListenerMixin],
    data() {
		  return {
		    banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        currentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0,
       // itemImgListener:null,

      }
    },
    computed: {
		  showGoodsList() {
		    return this.goods[this.currentType].list
      }
    },
    activated(){
      console.log("home enter,设置位置");
      //设置位置
      console.log(this.saveY)
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      console.log("home leave,记录位置")
       //记录位置
      this.saveY=this.$refs.scroll.getScrollY();
      
      console.log(this.saveY)
    },
    created() {
      //created里拿不到标签的class名字 是undefined
      //console.log('创建Home');
      // 1.请求多个数据
      this.getHomeMultidata();
      // 2.请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
      
      //在created()里this.$refs.aaa有可能拿不到，拿到的是空，导致报错,放到mounted()里面
      //3.监听item中图片加载完成
      // Vue组件中父子组件通信，兄弟组件通信都很常见，而父子组件通信就很简单，父组件会通过props向下传递数据给子组件，当子组件有事情要告诉父组件时会通过$emit事件告诉父组件，那么如果说两个页面没有任何引入与被引入的关系，改如何通信呢？用事件总线
      //  emitter.on("itemImageLoad",()=>{
      //    this.$refs.scroll.refresh();
      //  });
    },
    mounted(){
      //1.监听item中图片加载完成
      //  emitter.on("itemImageLoad",()=>{
      //    this.$refs.scroll.refresh();
      //  });
      //处理this.$refs.scroll.refresh();调用频繁的问题
       //下面的代码由于和home.vue中的一样，所以进行了封装用了xinmin混入写法，具体代码在mixin.js里
      // const refresh = debounce(this.$refs.scroll.refresh,200);
      // //对监听的事件进行保存 
      // this.itemImgListener=()=>{
      //     refresh();
      // }
      //  emitter.on("itemImageLoad",this.itemImgListener);
      
      //2.获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      //在mounted()里拿到的offsetTop不准，这时候组件事挂载完成了，但是图片并没加载完成
      //所以需要图片加载完成后计算出真正的高度才对
      // this.tobOffsetTop=this.$refs.tabControl.$el.offsetTop;
    },
    // activated: function () {
    //   this.$refs.hSwiper.startTimer()
    // },
    // deactivated: function () {
    //   this.$refs.hSwiper.stopTimer()
    // },
    // updated() {
    //    //this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    //   // console.log(this.tabOffsetTop);
    // },
    destroyed(){
        //2.取消全局事件的监听
        //vue3去掉了$on、$off后，使用mitt第三方库替代eventBus的原理。
       //this.$bus.$off("itemImgLoad",this.itemImgListener)
       //用mitt插件中的off
       //emitter.off("itemImgLoad",this.itemImgListener);
       emitter.off("itemImgLoad",this.itemListenerMixin);
    },
    methods: {
      // 1.事件监听方法
		  homeTabClick(index) { //分类导航
		    switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      backTop(){ //回到顶部
        //下面两种方式都能实现回到顶部
         //1.bscroll是组件BetterScroll的滚动事件，直接调用滚动事件中的scrollTo方法
         //1.this.$refs.scroll.bscroll.scrollTo(0,0,500);
        //2.scrollToTop()是组件BetterScroll组件里的方法 （这种方式体现了封装思想，面对这个组件，而这个组件中有scrollToTop这个方法，而scrollToTop这个方法内部做了什么在这里不需要关心，只需要知道组件BetterScroll里有个scrollToTop方法，面对这个组件进行开发就好。先把scrollTo事件封装到scrollToTop方法里，再通过调用组件中的方法）
          this.$refs.scroll.scrollToTop(0,0);
      },
      contentScroll(position){
         //1.判断BackTop是否显示
         this.isShowBackTop=(-position.y)>1000;

         //2.判断tabControl是否吸顶（position:fixed)
         this.isTabFixed=(-position.y)>this.tabOffsetTop;
         //console.log(this.isTabFixed,this.tabOffsetTop)
      },
      // contentScroll(position) {
		  //   // 1.决定tabFixed是否显示
      //   this.isTabFixed = position.y < -this.tabOffsetTop

      //   // 2.决定backTop是否显示
      //   this.showBackTop = position.y < -BACKTOP_DISTANCE
      // },
      loadMore() {//下拉加载更多
		    this.getHomeGoods(this.currentType);
      },
      swiperImageLoad (){
        //只需要拿到一次就好
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
        //console.log(this.tabOffsetTop)
      },

      // /**
      //  * 网络请求相关方法
      //  */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
          // this.$nextTick(() => {
          //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          // })
        })
      },
      getHomeGoods(type) {//获取首页导航相关数据
        let page=this.goods[type].page+1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //执行下面这个方法才能加载更多数据-//better-scroll默认只能加载更多一次
          this.$refs.scroll.finishPullUp();
        })
      }
    }
	}
</script>

<style scoped>
/* scoped作用域的意思 下面设置的样式只对本界面中的元素起作用*/
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  /* .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  } */

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
   
   .home-nav{
     background-color: var(--color-tint);
     font-weight: 700;
     color: #fff;
     /*下面的代码是用浏览器原生滚动时防止顶部导航随着滚动而滚动设置的，现在用了better-scroll所以不用设置了 */
     /* position:fixed;
     top:0;
     left:0;
     z-index:9; */
   }

   .content {
     /* 上下两部分高度已定，计算中间部分的高度，两种方式，1.用calc属性；2，使用定位 top,bottom给个值,left,right=0*/
      position: absolute;
      top: 44px; 
      bottom: 49px;
      left: 0;
      right: 0;
      /* margin-top:44px; */
      /* calc(100%-93px)不加空格无效 */
      /* height:calc(100% - 93px); */
      overflow:hidden;
    }
   .tab-control{
     /* position:sticky;
     top:44px; */
     position:relative;
     z-index:9;
   }
   
</style>
