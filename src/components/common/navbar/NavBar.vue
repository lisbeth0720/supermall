<template>
  <div id="app">
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
      <div class="center">
           <slot name="center">购物街</slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
   
  }
}
</script>

<style scoped>
  .nav-bar{
    display:flex;
    background:pink;
    height:44px;
    line-height:44px;
    position:fixed;
    top:0;
    left:0;
    right:0;
    color:#fff;
    text-align: center;
    box-shadow: 0px -1px 1px rgba(100,100,100,.1)
  }
  .left,.right{
      width:60px;
  }
  .center{
      /* 设置flex=1其他区域有确定的宽度，这个将会自动占据剩下的宽度 */
      flex:1;
  }
</style>
