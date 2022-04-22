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

//图片懒加载-使用插件vue-lazyload-这个插件只针对vue2，目前vue3不可以用
//import VueLazyLoad from 'vue-lazyload'
//需要注意的是当使用vue-lazyload插件懒加载的时候，img :src需要改成：v-lazy
//vue3使用插件vue3-lazy实现懒加载
import LazyLoad from 'vue3-lazy'

//postcss-px-to-viewport 将px转化为vw插件

//createApp(App).use(插件)
//createApp(App).use(router).mount("#app")
createApp(App).config.productionTip = false
    //下面代码这样挂载多个模块是错误的
    //createApp(App).use(router, store).mount("#app")
const app = createApp(App)
app.use(router)
app.use(store)
//app.use(toast)
//app.use(VueLazyLoad)
// app.use(VueLazyLoad,{
//     preLoad: 1.3,
//     error: 'http://tc.qdscitech.net/images/2021/06/17/404.jpg', //加载出错时显示的图片
//     loading: 'http://tc.qdscitech.net/images/2021/06/17/loading.gif', //加载中显示的图片
//     attempt: 1
// })

// app.use(LazyLoad, {
//     loading: 'loading.png',
//     error: 'error.png'
// })

app.use(LazyLoad,{
    error: require('./assets/img/common/404.jpg'), //加载出错时显示的图片
    loading: require('./assets/img/common/loading.gif'), //加载中显示的图片
})
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