<template>
<div class="goods">
   <goods-list-item v-for="item in goods" 
                    :key="item" 
                    :goods-item="item" :which-page2="this.whichPage"/>
</div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"
  export default {
     name: 'GoodsList',
     props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        },
        whichPage:{//自己写的用于区分哪一页0是首页，=1详情页
             type:Number
        }
     },
     components: {//在components里注册组件后才能在模板里使用
        GoodsListItem
     },
     
   }
</script>
<style scoped>
   .goods{
       display: flex;
       flex-wrap:wrap;
       justify-content: space-around;
       padding:2px;
   }
   
</style>