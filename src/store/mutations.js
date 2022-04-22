export default {
    addCounter(state, payload) {
        payload.count+=1
        //console.log(state.cartList)
    },
    addToCart(state, payload) {
        payload.checked=true
        state.cartList.push(payload)
    }
}