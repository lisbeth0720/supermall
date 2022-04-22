//放的是详情页的一些请求
import { request } from "./request.js";

//下面这个接口里的数据暂时无法访问，为了测试效果访问的是本地json数据
export function getDetail(iid) {
    // return request({
    //      url:'/detail',
    //      params:{
    //          iid,        
    //      }
    // })
    //axios请求本地数据，需要把数据放到public文件夹下，public是向外曝露的服务器路径，但在引用时，不用写“public”
    var url = window.location.href; //网页地址
    var serverUrl = "http://" + (url.split("//")[1]).split("/")[0] + "/" + (url.split("//")[1]).split("/")[1]; //服务器地址
    if (serverUrl.indexOf("#") >= 0) {
        serverUrl = serverUrl.split("#")[0]
    }
    if (serverUrl.indexOf("localhost") >= 0) {
        //serverUrl = "http://localhost:8080"
    } else {
        serverUrl = serverUrl + "/dist/";
    }

    let newUrl = serverUrl + "data/detail/detail.json"; //李宁
    if (iid == "ytc_kafei") {
        newUrl = serverUrl + "data/detail/detail2.json"; //隅田川_咖啡
    } else if (iid == "slr_kuaizi") {
        newUrl = serverUrl + "data/detail/detail3_0.json"; //双立人-筷子
    } else if(iid =="slr_menshaobei"){
        newUrl = serverUrl + "data/detail/detail3.json"; //双立人-焖烧杯
    }else if(iid == "slr_daoju"){
        newUrl = serverUrl + "data/detail/detail3_1.json"; //双立人-刀具
    }else if (iid == "kxz_huoguo") {
        newUrl = serverUrl + "data/detail/detail4_2.json"; //开小灶-火锅
    } else if (iid == "kxz_mifan") {
        newUrl = serverUrl + "data/detail/detail4_1.json"; //开小灶-米饭
    } else if (iid == "kxz_huntun") {
        newUrl = serverUrl + "data/detail/detail4.json"; //开小灶-馄饨
    } else if (iid == "ms") {
        newUrl = serverUrl + "data/detail/detail5.json"; //陌森
    } else if (iid == "bqs_jiangxiaoyan") {
        newUrl = serverUrl + "data/detail/detail6.json"; //倍轻松-江小言按摩器
    } else if (iid == "bqs_m2") {
        newUrl = serverUrl + "data/detail/detail6_1.json"; //倍轻松-m2按摩器
    }else if(iid =="bqs_hujingyi"){
        newUrl = serverUrl + "data/detail/detail6_2.json"; //倍轻松-护颈仪
    }else if (iid == "dl_xiaoduye") {
        newUrl = serverUrl + "data/detail/detail7.json"; //滴露-消毒液
    }else if (iid == "bskl") {
        newUrl = serverUrl + "data/detail/detail8.json"; //百事可乐
    }else if (iid == "lflk_xiangshui") {
        newUrl = serverUrl + "data/detail/detail9.json"; //拉夫劳伦
    }else if (iid == "llm_quanjiatong") {
        newUrl = serverUrl + "data/detail/detail10.json"; //溜溜梅——全家桶
    }else if (iid == "llm_meidong") {
        newUrl = serverUrl + "data/detail/detail10_1.json"; //溜溜梅——梅冻
    }else if (iid == "df") {
        newUrl = serverUrl + "data/detail/detail11.json"; //德芙
    }
    console.log(newUrl)
    return request({
        url: newUrl,
        params: {
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
    constructor(info, rule) {
        //注意，images可能没有值，某些商品有值，某些商品没有值
        this.image = info.images ? info.images[0] : "";
        this.infos = info.set;
        this.sizes = rule.tables

    }
}
//获取商品推荐信息
export function getRecommend() {
    // return request({
    //      url:'/recomment'
    // })
    //axios请求本地数据，需要把数据放到public文件夹下，public是向外曝露的服务器路径，但在引用时，不用写“public”
    var url = window.location.href; //网页地址
    var serverUrl = "http://" + (url.split("//")[1]).split("/")[0] + "/" + (url.split("//")[1]).split("/")[1]; //服务器地址
    if (serverUrl.indexOf("#") >= 0) {
        serverUrl = serverUrl.split("#")[0]
    }
    if (serverUrl.indexOf("localhost") >= 0) {
        //serverUrl = "http://localhost:8080"
    } else {
        serverUrl = serverUrl + "/dist";
    }

    let newUrl = serverUrl + "/data/detail/recommend.json";
    return request({
        url: newUrl
    })
}