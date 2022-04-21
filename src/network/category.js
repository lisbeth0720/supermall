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

//用本地数据进行模拟的
var url = window.location.href; //网页地址
var serverUrl = "http://" + (url.split("//")[1]).split("/")[0] + "/" + (url.split("//")[1]).split("/")[1]; //服务器地址
if (serverUrl.indexOf("#") >= 0) {
    serverUrl = serverUrl.split("#")[0]
}

if (serverUrl.indexOf("localhost") >= 0) {

} else {
    serverUrl = serverUrl + "/dist/";
}

// post请求的参数写在params，get请求参数写在data里
export function getCategory() {
    let newUrl = serverUrl + "data/category/category.json";
    return request({
        url: newUrl
    })
}

export function getSubcategory(maitKey) {
    let newUrl = serverUrl + "data/category/subcategory_recommend.json";

    if (maitKey == "001") {

    } else if (maitKey  == "002") {
        newUrl = serverUrl + "data/category/subcategory_boy.json";
    } else if (maitKey  == "003") {
        newUrl = serverUrl + "data/category/subcategory_girl.json";
    }

    return request({
        url: newUrl,
        // params: {
        //     maitKey
        // }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    //console.log(type,miniWallkey)
    let newUrl = serverUrl + "data/category/recommend_pop.json";
    if (miniWallkey == "0001") {//热门推荐
        if (type == "pop") {//综合
            newUrl = serverUrl + "data/category/recommend_pop.json";
        } else if (type == "sell") {//新品
            newUrl = serverUrl + "data/category/recommend_sell.json";
        } else if (type == "new") {//销量
            newUrl = serverUrl + "data/category/recommend_new.json";
        }
    } else if (miniWallkey == "0002") {//男装
        if (type == "pop") {//综合
            newUrl=serverUrl + "data/category/boy_pop.json";
        } else if (type == "sell") {//新品
            newUrl = serverUrl + "data/category/boy_sell.json";
        } else if (type == "new") {//销量
            newUrl = serverUrl + "data/category/boy_new.json";
        }
    } else if (miniWallkey == "0003") {//女装
        if (type == "pop") {//综合
            newUrl=serverUrl + "data/category/girl_pop.json";
        } else if (type == "sell") {//新品
            newUrl = serverUrl + "data/category/girl_sell.json";
        } else if (type == "new") {//销量
            newUrl = serverUrl + "data/category/girl_new.json";
        }
    }


    return request({
        url: newUrl,
        //    params: {
        //      miniWallkey,
        //      type
        //    }
    })
}