export default {
    addCounter(state, payload) {
        payload.counter++
    },
    addToCart(state, payload) {
        state.cartList.push(payload)

    }
}