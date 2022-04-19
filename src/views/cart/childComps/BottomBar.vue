<template>
  <div class="bottom-menu">
    <!-- <CheckButton class="select-all" 
                 @checkBtnClick="checkBtnClick" 
                 v-model="isSelectAll" /> -->
    <CheckButton class="select-all" 
                 @click.native="checkBtnClick" 
                 :is-checked="isSelectAll" />
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <!-- <span class="buy-product">去计算({{$store.getters.cartCount}})</span> -->
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { useStore } from 'vuex'
	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      //1.总价
		  totalPrice() {
        //const cartList = this.$store.getters.cartList;
         const store = useStore()
         //可以用遍历，也可以用过滤器-计算的时候未选择的不能计算内
        //  const cartList = store.getters.cartList
        //  var sum=0;
        //  for(let i=0;i<cartList.length;i++){
        //    if(cartList[i].checked){
        //       sum+=cartList[i].newPrice*cartList[i].count;
        //    }
        //  }
        //  return sum;

         //过滤器写法
         return store.getters.cartList.filter(item=>{
              return item.checked
         }).reduce((preValue,item)=>{
             return preValue + item.newPrice*item.count
         },0).toFixed(2)

        // return cartList.filter(item => {
        //   return item.checked
        // }).reduce((preValue, item) => {
        //   return preValue + item.count * item.newPrice
        // }, 0).toFixed(2)
      },
      //2.去计算
      checkLength(){
          const store = useStore()
          return store.getters.cartList.filter(item=>item.checked).length
      },

      isSelectAll: function () {
         const store = useStore()
        //return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
        //下面代码的意思是判断是否有未选中的按钮,有的话就取反，下面这行代码的性能不怎么高，因为要遍历所有
        //其实之需要遍历出一个有未选中的即可，有一个未选中，则下下面的全选按钮就不显示全选，用find()
        //return !(store.getters.cartList.filter(item=>!item.checked).length);
        //需要判断购物车里的数据为空的时候，也是不用全选的
        if(store.getters.cartList.length===0) return false;
        //return store.getters.cartList.find(item => item.checked === false) === undefined;
        return !store.getters.cartList.find(item =>!item.checked);
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
