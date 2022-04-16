// //vue2x的写法
// import Vue from 'vue'
// import Vuex from 'vuex'

// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

// Vue.use(Vuex)

// const state = {
//     cartList: []
// }

// const store = new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })

// export default store

//vue3x的写法
import { createStore } from 'vuex'

export default createStore({
    state: { //变量
        info: "hello",
        carList: []
    },
    getters: { //相当于计算属性
        // doubleNum(state) {
        //     return Math.pow(state.num, 2)
        // },
        // userVipList(state) {
        //     return state.carList.filter(v => v.range > 600)
        // }
    },
    mutations: {
        addCart(state, payload) {
            //payload新谈价的商品
            //1.查找数组中是否有该商品
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
                payload.count += 1;
            } else {
                payload.count = 1;
                state.carList.push(payload)
            }
            //console.log(oldProduct)
        },
        // increase(state, { payload = 10 }) {
        //     state.num += payload
        // },
        // setCarList(state, { payload }) {
        //     return state.carList = payload
        // },
        // delList(state, index) {
        //     state.carList.splice(index, 1);
        // },
        // updateUserInfo(state, obj) {
        //     state.userInfo = obj
        //     console.log("存储成功", state)
        // },

    },
    actions: {
        // getActionList(context) {
        //     // 模拟异步请求
        //     setTimeout(() => {
        //         context.commit("setCarList", { payload: [{ carName: "极氪001", price: 28, range: 620 }, ] })
        //     }, 1000)
        // },
        // delCarList(context, index) {
        //     setTimeout(() => {
        //         //触发mutations中的方法 变更状态
        //         context.commit("delList", index);
        //     }, 1000)
        // }
    },
    modules: {}
})