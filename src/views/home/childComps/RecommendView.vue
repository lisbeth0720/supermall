<template>
    <div class="recommend">
         <!-- v-for后面添加:key='item' 不然报错 -->
        <div v-for="item in recommends" :key='item' class="recommend-item">
         <!-- 用变量里的属性需要加冒号 -->
            <a :href="item.link">
                <img :src="item.image" />
                <div>{{item.title}}</div>
             </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props:{
     recommends:{
         type:Array,
         default(){
           return []
         }
     }
  }
  
}
</script>

<style>
   .recommend{
       width:100%;
       display:flex;
       padding:10px 0 20px;
       border-bottom: 8px solid #eee;
   }
   .recommend-item{
       flex:1;
       font-size:12px;
       text-align: center;
   }
   .recommend-item img{
       height:70px;
       width:70px;
       margin-bottom:10px;
   }
</style>
