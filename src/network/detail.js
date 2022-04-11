//放的是详情页的一些请求
import { request } from "./request.js";

//下面这个接口里的数据暂时无法访问，为了测试效果访问的是本地json数据
export function getDetail(iid){
    // return request({
    //      url:'/detail',
    //      params:{
    //          iid,        
    //      }
    // })
    //axios请求本地数据，需要把数据放到public文件夹下，public是向外曝露的服务器路径，但在引用时，不用写“public”
    var url = window.location.href;//网页地址
    var serverUrl = "http://"+(url.split("//")[1]).split("/")[0]+"/"+(url.split("//")[1]).split("/")[1];//服务器地址
    if(serverUrl.indexOf("#")>=0){
        serverUrl=serverUrl.split("#")[0]
    }
    if (serverUrl.indexOf("localhost") >= 0) {
          //serverUrl = "http://localhost:8080"
     }else{
          serverUrl=serverUrl+"/dist";
     }
    
    let newUrl=serverUrl+"/data/detail/detail.json";
    return request({
         url:newUrl,
         params:{
            iid
         }
    })
}

//函数调用-> 压入函数栈(保存函数调用过程中的所有变量)
// 函数调用结束-> 弹出函数栈(释放函数所有的变量)
// function test(){
//     const names=['wxq',"xz"]
// }
// test()