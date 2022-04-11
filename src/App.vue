<template>
  <div>
    <router-view></router-view>
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
