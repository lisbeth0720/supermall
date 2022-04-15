//vue中的mixin混入-两个组件之间如何复用代码，一般用混入来封装
import {debounce} from "./utils.js";
import emitter from "assets/utils/mitt.js";

export const itemListenerMixin={
    data(){
        return{
            itemImgListener:null,//方法
            newRefresh:null,//方法
        }
    },
    mounted(){
      //做防抖操作，不用刷新太多次
       this.newRefresh = debounce(this.$refs.scroll.refresh,200)
       //对监听的事件进行保存 
        this.itemImgListener=()=>{
           this.newRefresh();
       }
       emitter.on("itemImageLoad",this.itemImgListener)
       //console.log("我是混入中的内容")
    }
}