//vue中的mixin混入-两个组件之间如何复用代码，一般用混入来封装
import {debounce} from "./utils.js";
import emitter from "assets/utils/mitt.js";

export const itemListenerMixin={
    data(){
        return{
            itemImgListener:null,
        }
    },
    mounted(){
       let refresh = debounce(this.$refs.scroll.refresh,200)
       //对监听的事件进行保存 
        this.itemImgListener=()=>{
          refresh();
       }
       emitter.on("itemImageLoad",this.itemImgListener)
       console.log("我是混入中的内容")
    }
}