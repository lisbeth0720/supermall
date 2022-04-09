//公共的方法
//1.防抖动函数
export function debounce(func,delay){
    let timer = null;
    return function (...args){//"..."的意思是可以传入多个参数
       if(timer) clearTimeout(timer);
       timer=setTimeout(()=>{
         func.apply(this,args)
       },delay)
    }
 }