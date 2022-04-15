<template>
  <div>
    <nav-bar class="home-nav">
        <template v-slot:left>
          <div class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" />
          </div>
        </template>
        <template v-slot:center>
          <div class="title">
             <div v-for="(item,index) in titles" 
             :key="item" 
             class="title-item"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)">{{item}}</div>
          </div>
        </template>
      </nav-bar>
  </div>
</template>
<script>
 import NavBar from "components/common/navbar/NavBar.vue"

  export default{
      name:"DetailNavBar",
      components:{
          NavBar
      },
      data(){
        return{
          titles:["商品","参数","评论","推荐"],
          currentIndex:0
        }
      },
      methods:{
        titleClick(index){
          this.currentIndex=index;
          this.$emit("titleClick",index);
        },
        backClick(){
          //也可以写成 this.$router.go(-1);
          this.$router.back();
        }
      }
  }
</script>
<style scoped>
  .title{
    display:flex;
    font-size:12px;
  }
  .title-item{
    flex:1;
    font-size:3.73333vw;
  }
  .active{
    color:var(--color-high-text);
    /* border-bottom:1px solid var(--color-high-text); */
  }
  .back{
    margin-top:8px;
  }
</style>