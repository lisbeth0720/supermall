//相当于计算属性
export default {
    cartList(state) {
        return state.cartList
    },
    //   cartCount(state, getters) {
    //     return getters.cartList.length
    //   }
    cartLength(state) {
        return state.cartList.length
    }
}