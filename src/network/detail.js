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

//由于请求的数据过于复杂，所以这里我自定义了对象
export class Goods {
     constructor(itemInfo, columns, services) {
       this.title = itemInfo.title;
       this.desc = itemInfo.desc;
       this.newPrice = itemInfo.price;
       this.oldPrice = itemInfo.oldPrice;
       this.discount = itemInfo.discountDesc;
       this.columns = columns;
       this.services = services;
       this.nowPrice = itemInfo.highNowPrice;
     }
   }

   export class Shop {
     constructor(shopInfo) {
       this.logo = shopInfo.shopLogo;
       this.name = shopInfo.name;
       this.fans = shopInfo.cFans;
       this.sells = shopInfo.cSells;
       this.score = shopInfo.score;
       this.goodsCount = shopInfo.cGoods
     }
    }
     export class GoodsParam {
      constructor(info,rule) {
        //注意，images可能没有值，某些商品有值，某些商品没有值
        this.image = info.images?info.images[0]:"";
        this.infos = info.set;
        this.sizes = rule.tables
        
      }
   }
  //获取商品推荐信息
   export function getRecommend(){
    // return request({
    //      url:'/recomment'
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
    
    let newUrl=serverUrl+"/data/detail/recommend.json";
    return request({
         url:newUrl
    })
}