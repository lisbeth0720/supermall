export default {
    //下面的代码暂时不用，用重构后的 addCart()写在了actions里了
    addCart22(state, payload) {
        //payload新添加的商品
        //1.查找之前数组中是否有该商品
        let oldProduct = null
        for (let item of state.carList) {
            if (item.iid === payload.iid) {
                oldProduct = item;
            }
        }

        //上面的循环也能用数组中的find方法实现
        //1.查找数组中是否有该商品
        // let oldProduct = state.carList.find(function(item) {
        //       return item.iid === payload.iid
        // })
        //也可以写成箭头函数
        //1.查找数组中是否有该商品
        // let oldProduct = state.carList.find(item=>item.iid === payload.iid)

        //2.判断oldProduct-购物车里已经存在该商品就在原来的基础上+1，不存在就存入新的
        if (oldProduct) {
            oldProduct.count += 1;
        } else {
            payload.count = 1;
            state.carList.push(payload)
        }
        //console.log(oldProduct)
    },

    //对上面代码进行了重构
    addCounter(state, payload) {
        payload.counter++
    },
    addToCart(state, payload) {
        state.carList.push(payload)
    }
}