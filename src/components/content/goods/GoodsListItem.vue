<template>
   <div class="goods-item" @click="itemClick">
       <img :src="showImage" alt="" @load="imageLoad"/>
       <div class="goods-info">
           <p class="title">{{goodsItem.title}}</p>
           <span class="price">{{goodsItem.price}}</span>
           <span class="collect">{{goodsItem.cfav}}</span>
       </div>
   </div>
</template>
<script>
import emitter from "assets/utils/mitt.js"

export default {
  name: 'GoodsListItem',
  props:{
     goodsItem:{
         type:Object,
         default(){
             return {}
         }
     },
    whichPage2:{//自己写的用于区分哪一页0是首页，=1详情页
       type:Number
    }
  },
  data(){
    return{
      
    }
  },
  computed:{
     showImage(){
      // return this.goodsItem.show.img||this.goodsItem.image
       //需要判断是首页还是详情页，因为数据格式不一样，在哪一页取那一页的数据
       //const imgSrc="";
       if(this.whichPage2==0){
          return this.goodsItem.show.img//首页数据
       }else{
         return this.goodsItem.image//详情页
       }
       //console.log(this.whichPage2)
      //  if(this.$router.path.indexOf("/home")){
      //      imgSrc=this.goodsItem.show.image//首页数据
      //   }else if(this.$router.path.indexOf("/detail")){
      //      imgSrc=this.goodsItem.image//详情页
      //   }
        //return imgSrc;
     }
  },
  
  methods:{
    //监听图片加载完成后-要执行的操作
     imageLoad(){
        //emitter.emit("itemImageLoad");
        //方法一：需要判断表示将这个事件发送给谁，发送给哪个界面
        // if(this.$router.path.indexOf("/home")){
        //    emitter.emit("homeItemImageLoad");
        // }else if(this.$router.path.indexOf("/detail")){
        //     emitter.emit("detailItemImageLoad");
        // }

        //方法二：需要间隔判断来表示将这个事件发送给谁，发送给哪个界面 -emitter.emit("itemImageLoad");当进入哪个界面那个界面接受这个事件，其他界面就不需要监听了，即当发现离开此界面的时候取消监听这个事件
         emitter.emit("itemImageLoad");
     },
     //跳转到详情页
     itemClick(){
       //两种方式配置路由传参数
       //1.动态路由-用这个方法取iid的界面这样取this.$route.params.iid
       this.$router.push("/detail/"+this.goodsItem.iid); 
       //2.对象-用这个方法取iid的界面这样取this.$route.query.iid
      //  this.$router.push({
      //    path:"/detail",
      //    query:{
      //      iid:this.goodsItem.iid
      //    }
      //  })
     }
  },
  components: {//在components里注册组件后才能在模板里使用
    
  }
}
</script>
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    
    width:48%;
  }
  .goods-item img {
    /* width: 100%; */
    border-radius: 5px;
    width:99%;
    margin-left:0.5%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>