<template>
  <div class="tab-control">
      <!-- 当index===currentIndex的时候就会有给div添加名为active的class -->
      <div class="tab-control-item" 
           :class="{active:index===currentIndex}" 
           @click="itemClick(index)"
           v-for="(item,index) in titles" :key="item">
        <span>{{item}}</span>
      </div>
      
</div>
</template>

<script>

export default {
  name: 'TabControl',
  props:{
      //封装的tabControl组件，选项卡，需要别人用的时候只需要把选项卡顶部的文字传过来即可
     titles:{
         type:Array,
         //当返回值是一个对象或则是数组的时候default必须是一个函数
         default(){
             return []
         }
     }
  },
  data(){
      return {
          currentIndex:0
      }
  },
  methods:{
    //  itemClick(index){
    //     this.currentIndex=index;
    //  }
     itemClick: function (index) {
        // 1.改变currentIndex
        this.currentIndex = index;

        // 2.发出事件
        //子组件发生点击事件传到外面用$emit，父组件到子组件用自定义事件 
        this.$emit('itemClick', index)
      }
  },
  components: {//在components里注册组件后才能在模板里使用
    
  }
}
</script>

<style>
   .tab-control{
     display:flex;
     text-align: center;
     font-size:15px;
     height:40px;
     line-height:40px;
     background:#fff;
     z-index: 9;
   }
   .tab-control-item{
       flex:1;
   }
   .tab-control-item span{
       padding:4px;
   }
   .active{
       color:var(--color-high-text);
   }
   .active span{
       border-bottom:2px solid var(--color-tint)
   }
</style>
