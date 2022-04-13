<template>
<!-- 使用Object.keys取到detailInfo对象的第几个key值： -->
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
           :src="item" 
           alt="" 
           :key="index"
           @load="imagesLoad"/>
    </div>
  </div>
</template>

<script>
  //import emitter from "assets/utils/mitt.js";

	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data(){
       return{
         counter:0,
         imagesLength:0
       }
    },
    methods:{
      imagesLoad(){
        //因为这里的图片是竖排，所以每一张都会影响better-scroll滚动的高度，所以需要计算有多少张图片
        //当所有的图片都加载完成后进行一次回调就好
        if(++this.counter===this.imagesLength){
            //emitter.emit("shopGoodsImageLoad");
            this.$emit("imagesLoad");
        }
       
     }
    },
    // watch:作用是监听detailInfo值-也就是图片张数的改变时候触发
    watch:{
       detailInfo(){
         this.imagesLength=this.detailInfo.detailImage[0].list.length;
       }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>