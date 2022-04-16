<template>
  <div id="cart">
    <!-- vue 2x的写法 -->
    <!-- <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar> -->
     <nav-bar class="nav-bar">
        <template v-slot:center><div>购物车{{cartLength}}</div></template>
      </nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar> 
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  import { useStore } from 'vuex'
	export default {
		name: "Cart",
    setup () {
      const store = useStore()
      //console.log(store.state.cartList.length)
     },
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
      cartLength(){
        //vue2x的写法
        //return this.$store.state.cartLish.length
        const store = useStore()
        //vue3x的写法
        //return store.state.cartList.length
        //封装了gitter.js里了
        console.log(store.getters.cartLength)
        return store.getters.cartLength
      },
		   cartList() {
		    //return this.$store.getters.cartList
         const store = useStore()
         return store.getters.cartList
       }
    }
	}
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
