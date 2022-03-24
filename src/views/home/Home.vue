<template>
  <div id="home">
      <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'Home',
  components: {//在components里注册组件后才能在模板里使用
     NavBar
  }
}
</script>

<style>
  
</style>
