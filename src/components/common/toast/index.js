import Toast from "./Toast.vue"


//用插件方式的封装实现弹框
//自己封装的一个插件
//Vue2封装弹窗插件比较简单快捷使用Vue.extend方法就可以了。
 // 在 Vue 2.x 中，Vue.extend 曾经被用于创建一个基于 Vue 构造函数的“子类”，其参数应为一个包含组件选项的对象。在 Vue 3.x 中，我们已经没有组件构造器的概念了。应该始终使用 createApp 这个全局 API 来挂载组件：
// const obj = {}
// obj.install =function(Vue){
//    // console.log("执行了obj的install函数",Vue)
//     //1.创建组件构造器
//     const toastContrustor=Vue.extend(Toast)
    
//     //2.new的方式，根据组件构造器，可以创建出来一个组件对象
//     const toast = new toastContrustor()

//     //3.将组件对象，手动挂载到某一个
//     toast.$mount(document.createElement('div'))

//     //4.toast.$el对应的就是div
//     document.body.appendChild(toast.$el)
//     Vue.prototype.$toast=Toast
// }
// export default obj

//但是Vue3移除了Vue.extend，只能通过其他方式去封装弹窗插件。我个人探索了好一会找到的方法。
//在 Vue 3.x 中，我们已经没有组件构造器的概念了。应该始终使用 createApp 这个全局 API 来挂载组件：  
    // 之后 - Vue 3

    //import { createApp } from 'vue'
   // import {axios} from 'axios'
    //import {ElDialog, ElButton} from 'element-plus'
    
   // const instance = createApp (Toast)
   // instance. component (ElDialog.name, ElDialog)
    //instance.component (ElButton.name,ElButton)
    //instance.use(axios, {target: instance.config.globalProperties.$http = [] })
   // const vm = instance.mount(document.createElement('div'))
   // console.log(vm)
    //document.body.appendChild(vm.$el.nextSibling)
    
   // export default {
      // install :app => {
        //  app.config.globalProperties.$toast = (payload) => {
           //   vm.open(payload)
         // }
       //}
   //}

// 上面的代码有些地方可能大家看的比较迷惑，为什么还要导入axios和ElDialog。如果不这么做，Vue3会报ElDialog无法识别、MessageDialog里面有发送请求的操作，会提示axios无效。因为我们使用creatApp的方式新创建了一个app实例，与main.js创建的实例毫无关系。所以弹窗组件用到什么都要导入一次。

//vue3写法报错，暂时还是用组件的方式吧
