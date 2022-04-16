export default {
    addCart(context, payload) {
        //1.查找之前数组中是否有该商品
        let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
            //2.判断oldProduct
        if (oldProduct) {
            //oldProduct.count += 1;
            context.commit('addCounter', oldProduct)
        } else {
            payload.count = 1;
            // state.carList.push(payload)
            context.commit('addToCart', payload)
        }
    }
}