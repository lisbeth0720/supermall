//import Vue from 'vue'//注：这句必须要有，虽然在main.js里面已经引入过Vue，但这里不要的话，就直接报错了Vue is not defined
//import VueRouter from 'vue-router'
import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'

const Home =() =>import('../views/home/Home.vue');
const Category =() =>import('../views/category/Category.vue');
const Cart =() =>import('../views/cart/Cart.vue');
const Profile =() =>import('../views/profile/Profile.vue');
const Detail =() =>import('../views/detail/Detail.vue');
// import Home from '../views/home/Home.vue'
// import Category from '../views/category/Category.vue'
// import Cart from '../views/cart/Cart.vue'
// import Profile from '../views/profile/Profile.vue'

//1.安装插件
//Vue.use(VueRouter);

//2.创建路由对象
const routes=[
   {
       path:'',
       redirect:'/home'
   },
   {
    path:'/home',
    component:Home,
    meta:{
      keepAlive:true//组件需要缓存
    }
  },
   {
    path:'/category',
    component:Category,
    meta:{
      keepAlive:true//组件需要缓存
    }
  },
  {
    path:'/cart',
    component:Cart,
    meta:{
      keepAlive:true//组件需要缓存
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      keepAlive:true//组件需要缓存
    }
  },
  {
    path:'/detail/:iid',
    component:Detail,
    meta:{
      keepAlive:false//组件不需要缓存
    }
  }
]
//const router =new VueRouter({
 //   routes
//})

//3.导出router
//export default router

const router = createRouter({
  history:createWebHashHistory(),
  routes,
 // mode:'history',//将默认的hash值变成history
})

//3.将router对象传入到vue实例中
export default router