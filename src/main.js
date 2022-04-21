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

//弹框暂时还是用组件的方式
//import toast from './components/common/toast/index.js'

//使用fastclick，三步即可
//1.安装，2导入，3调用FastClick.attach(document.body)
import FastClick from 'fastclick'//解决移动端300ms延迟的插件
FastClick.attach(document.body)

//createApp(App).use(插件)
//createApp(App).use(router).mount("#app")
createApp(App).config.productionTip = false
    //下面代码这样挂载多个模块是错误的
    //createApp(App).use(router, store).mount("#app")
const app = createApp(App)
app.use(router)
app.use(store)
//app.use(toast)

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