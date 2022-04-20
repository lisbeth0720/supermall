<template>
<div class="toast" v-show="isShow">
    <div>{{message}}</div>
</div>
</template>
<script>
   export default{
       name:"Toast",
       props:{
            message:{
                type:String,
                default:''
            },
            isShow:{
                type:Boolean,
                default:false
            }
       },
       methods:{
           show(message,duration){
               this.isShow=true;
               this.message=message
               setTimeout(()=>{
                 this.isShow=false;
                 this.message=''
               },duration)
           }
       }
   }
</script>
<style scoped>
   .toast{
       position:fixed;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       background-color:rgba(0,0,0,.6);
       color:#fff;
       padding:8px 14px;
       z-index:999;
       border-radius: 5px;
   }
   
</style>