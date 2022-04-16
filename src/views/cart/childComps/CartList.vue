<template>
  <better-scroll>
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
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
    }
	}
</script>

<style scoped>

</style>
