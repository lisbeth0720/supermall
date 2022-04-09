<template>
  <div class="feature">
    <!-- <div class="feature-item" v-for="(item,index) in features" :key="item"> -->
      <a href="https://act.mogujie.com/zzlx67">
          <img src="~/assets/img/home/recommend_bg.jpg" alt=""/>
      </a>
    <!-- </div> -->
</div>
</template>

<script>

export default {
  name: 'FeatureView',
  components: {//在components里注册组件后才能在模板里使用
    
  }
}
</script>

<style>
.feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  /* .feature-item {
    flex: 1;
    text-align: center;
  } */

  .feature img {
    /* width: 80px;
    height: 80px; */
    width:100%;
    margin-bottom: 10px;
  }
</style>
