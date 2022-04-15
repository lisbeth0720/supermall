//公共的方法
//将时间戳转变成时间格式化字符串(真正开发的时候服务器一般从数据库里去的数据返给前端时间格式是时间戳1535694719这样，前端根据需求进行转化，2022-04-01还是2022/04/01)
//formatDate(new Date(1535694719*1000), 'yyyy-MM-dd')
//1.先将时间戳转变成Date的对象-const date=new Date(1535694719*1000)
//2.将date进行格式化，转变成对应的字符串
export function formatDate(date, fmt) {
   //正则表达式-用于字符串匹配
   //1.获取年份
   if (/(y+)/.test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   //2.获取
   let o = {
     'M+': date.getMonth() + 1,
     'd+': date.getDate(),
     'h+': date.getHours(),
     'm+': date.getMinutes(),
     's+': date.getSeconds()
   };
   for (let k in o) {
     if (new RegExp(`(${k})`).test(fmt)) {
       let str = o[k] + '';
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
     }
   }
   console.log(fmt)
   return fmt;
 };
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

 function padLeftZero(str){
    return ('00'+str).substr(str.length);
 }