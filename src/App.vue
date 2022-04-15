<template>
  <div class="app">
    <!-- <keep-alive>的作用是不被销毁，切换到这个界面的时候保持切换前的状态  -->
      <!-- vue 2x的写法 -->
    <!-- <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if=" !$route.meta.keepAlive" /> -->
      <!-- vue 3x的写法 -->
    
   <router-view v-slot="{Component}">
     <keep-alive :exclude="Detail">
       <component :is="Component" />
     </keep-alive>
   </router-view>
    
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';

export default {
  name: 'App',
  components: {//在components里注册组件后才能在模板里使用
   MainTabBar,
  }
}
</script>

<style>
  @import "assets/css/base.css";

</style>
