export default {
    addCounter(state, payload) {
        payload.counter++
    },
    addToCart(state, payload) {
        state.carList.push(payload)
    }
}