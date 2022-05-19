<template>
  <div id="profile">
     <nav-bar class="profile-nav">
       <template v-slot:center>
            <div>沐雪</div>
       </template>
        
     </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'Profile',
  components: {//在components里注册组件后才能在模板里使用
     NavBar
  }
}
</script>

<style>
  
</style>
