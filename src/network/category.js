import { request } from "./request.js";

//下面这个接口里的数据暂时无法访问，为了测试效果访问的是本地json数据
// export function getCategory() {
//   return request({
//     url: '/category'
//   })
// }

// export function getSubcategory(maitKey) {
//   return request({
//     url: '/subcategory',
//     params: {
//       maitKey
//     }
//   })
// }

// export function getCategoryDetail(miniWallkey, type) {
//   return request({
//     url: '/subcategory/detail',
//     params: {
//       miniWallkey,
//       type
//     }
//   })
// }

var url = window.location.href;//网页地址
var serverUrl = "http://"+(url.split("//")[1]).split("/")[0]+"/"+(url.split("//")[1]).split("/")[1];//服务器地址
if(serverUrl.indexOf("#")>=0){
    serverUrl=serverUrl.split("#")[0]
}

if (serverUrl.indexOf("localhost") >= 0) {
      
 }else{
      serverUrl=serverUrl+"/dist";
 }
 console.log(serverUrl)
 
// post请求的参数写在params，get请求参数写在data里
export function getCategory() {
  let newUrl=serverUrl+"/data/category/category.json";
  return request({
    url:newUrl
  })
}

export function getSubcategory(maitKey) {
  let newUrl=serverUrl+"/data/category/pop.json";
  return request({
    url:newUrl,
    params:{
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  let newUrl=serverUrl+"/data/category/pop.json";
  return request({
    url:newUrl,
    params:{
        miniWallkey,
        type
    }
 })
}
