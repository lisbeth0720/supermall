<template>
  <better-scroll class="content" ref="scroll">
    <!-- <div> -->
      <cart-list-item v-for="item in cartList" 
                      :key="item.iid" 
                      :item-info="item"/>
    <!-- </div> -->
  </better-scroll>
</template>

<script>
  import BetterScroll from 'components/common/scroll/BetterScroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  BetterScroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    computed: {
      
    },
    activated () {
      //购物车里面的商品增加或减少需要刷新scroll来重新计算滚动高度
      this.$refs.scroll.refresh();
    }
	}
</script>

<style scoped>

</style>
