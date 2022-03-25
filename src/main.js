//import Vue from 'vue'
//import App from './App.vue'
//import router from './router/index.js'
//Vue.config.productionTip = false
// new Vue({
//   render: h => h(App),
//   router//这个忘记写 导致报错
// }).$mount('#app')

//vue-cli4的导入写法
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
//import axios from 'axios'

//createApp(App).use(插件)
createApp(App).use(router).mount("#app")
createApp(App).config.productionTip = false

// createApp(App)({
//   router//这个忘记写 导致报错
// });

//require('./assets/css/base.css');
//import {request} from "./network/request.js";