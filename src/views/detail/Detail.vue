<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>
<script>
 import DetailNavBar from "./childComps/DetailNavBar.vue"
 import DetailSwiper from "./childComps/DetailSwiper.vue"


 import {getDetail} from "network/detail.js"

  export default{
      name:"Detail",
      components:{
          DetailNavBar,
          DetailSwiper
      },
      data(){
          return{
              iid:null,
              topImages:[]
          }
      },
      created(){
        //1.保存传入的iid
          this.iid=this.$route.params.iid;
        //2.根据iid请求详情数据
          getDetail(this.iid).then(res=>{
            //2.1.获取顶部轮播图数据
            this.topImages=res.result.itemInfo.topImages
            //console.log(this.topImages)
          })
      }
  }
</script>
<style scoped>
</style>