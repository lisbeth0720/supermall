//放的是首页的一些请求
import { request } from "./request.js";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}