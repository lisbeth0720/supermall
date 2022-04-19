export default {
    addCounter(state, payload) {
        payload.counter++
    },
    addToCart(state, payload) {
        payload.checked=true
        state.cartList.push(payload)
    }
}