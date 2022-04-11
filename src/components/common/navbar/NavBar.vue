<template>
    <div id="nav-bar">
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
</template>

<script>

export default {
  name: 'NavBar',
  components: {
   
  }
}
</script>

<style scoped>
  #nav-bar {
    /* position: relative; */
    /* z-index: 10; */
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    width:100%;
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 1px rgba(100,100,100,.08);
  }
  .left,.right{
      width:60px;
  }
  .center{
      /* 设置flex=1其他区域有确定的宽度，这个将会自动占据剩下的宽度 */
      flex:1;
  }
</style>
