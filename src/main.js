//import Vue from 'vue'
//import App from './App.vue'
//import router from './router/index.js'
//Vue.config.productionTip = false
// new Vue({
//   render: h => h(App),
//   router//这个忘记写 导致报错
// }).$mount('#app')

//vue-cli4的导入写法
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import axios from 'axios'

import store from './store'

//createApp(App).use(插件)
//createApp(App).use(router).mount("#app")
createApp(App).config.productionTip = false
    //下面代码这样挂载多个模块是错误的
    //createApp(App).use(router, store).mount("#app")
const app = createApp(App)
app.use(router)
app.use(store)
app.mount("#app")

// createApp(App)({
//   router,//这个忘记写 导致报错
//store
// });
// createApp(App)({
//     router, //这个忘记写 导致报错
//     store
// }).mount("#app");

//require('./assets/css/base.css');
//import {request} from "./network/request.js";