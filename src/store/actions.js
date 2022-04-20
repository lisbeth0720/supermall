export default {
    //下面的代码暂时不用，用重构后的
    addCart22(state, payload) {
        //payload新添加的商品
        //1.查找之前数组中是否有该商品
        let oldProduct = null
        for (let item of state.cartList) {
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
    },

    //对上面代码进行了重构
    addCart(context, payload) {
        // //1.查找之前数组中是否有该商品
        // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //     //2.判断oldProduct
        // if (oldProduct) {
        //     //oldProduct.count += 1;
        //     context.commit('addCounter', oldProduct)
        // } else {
        //     payload.count = 1;
        //     //context.cartList.push(payload)
        //     context.commit('addToCart', payload)
        // }
        
        //如果你在vuex里做了默写操作，想让外界知道，就需要用到peomise
        return new Promise((resolve,reject)=>{
             //1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //2.判断oldProduct
            if (oldProduct) {
            //oldProduct.count += 1;
               context.commit('addCounter', oldProduct)
                resolve("当前的商品数量+1")
            } else {
                payload.count = 1;
                 //context.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve("添加了新商品")
           }
        })
    }
}