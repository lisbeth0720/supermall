<template>
  <div>

    <router-view></router-view>
    <!-- vue2x配置 -->
    <!-- <keep-alive exclude="Detail">
       <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> -->
    <!-- vue3x配置 -->
    <!-- <router-view v-slot="{Component}">
       <keep-alive>
         <component :is="Component" v-if="$route.meta.keepAlive" />
       </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view> -->
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
