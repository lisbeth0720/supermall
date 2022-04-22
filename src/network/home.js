//放的是首页的一些请求
import { request } from "./request.js";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

//下面这个接口里的数据暂时无法访问，为了测试效果访问的是本地json数据
export function getHomeGoods(type,page){
    // return request({
    //      url:'/home/data',
    //      params:{
    //          type,
    //          page
    //      }
    // })
    //axios请求本地数据，需要把数据放到public文件夹下，public是向外曝露的服务器路径，但在引用时，不用写“public”
    var url = window.location.href;//网页地址
    var serverUrl = "http://"+(url.split("//")[1]).split("/")[0]+"/"+(url.split("//")[1]).split("/")[1];//服务器地址
    if(serverUrl.indexOf("#")>=0){
        serverUrl=serverUrl.split("#")[0]
    }
   //console.log(serverUrl)
    if (serverUrl.indexOf("localhost") >= 0) {
          //serverUrl = "http://localhost:8080"
     }else{
          serverUrl=serverUrl+"/dist/";
     }
    //axios.get('../../data/home/pop.json');
    let newUrl=serverUrl+"data/home/pop.json";
    if(type=="pop"){
        //newUrl="http://localhost:8080/data/home/pop.json"
    }else if(type=="new"){
        newUrl=serverUrl+"data/home/new.json"
    }else if(type=="sell"){
        newUrl=serverUrl+"data/home/sell.json"
    }
    return request({
         url:newUrl,
         params:{
             type,
             page
         }
    })
}

//函数调用-> 压入函数栈(保存函数调用过程中的所有变量)
// 函数调用结束-> 弹出函数栈(释放函数所有的变量)
// function test(){
//     const names=['wxq',"xz"]
// }
// test()