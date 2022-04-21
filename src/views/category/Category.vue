<template>
  <div id="category">
      <nav-bar class="nav-bar">
        <template v-slot:center><div>商品分类</div></template>
      </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <!-- <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick" /> -->
      <better-scroll id="tab-content" 
                     :data="[categoryData]"
                      @scroll="contentScroll"
                      :pull-up-load="true"
                      @pulling-up="loadMore">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>

          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick" />
          <tab-content-detail :category-detail="showCategoryDetail" />
        </div>
      </better-scroll>
    </div>
  </div>
</template>

<script>
 //1.1公共组件或者常量
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import BetterScroll from 'components/common/scroll/BetterScroll.vue'
  import {BACK_POSITION} from "common/const.js"

  //2.子组件
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  //3.一些方法
  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  
  import {tabControlMixin} from "common/mixin.js";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      BetterScroll,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
		  return {
		    categories: [],
        categoryData: {},
        currentIndex: -1,

        //tabOffsetTop: 0,
        //isTabFixed: false,
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
        //console.log(this.currentIndex)
    
        //放回当前索引下的当前类型下的数据
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
         
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
           
        })
      },
      _getSubcategories(index) {
        //console.log(this.showCategoryDetail)
        //console.log(index)
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail("pop")
          this._getCategoryDetail("sell")
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      },

      contentScroll(position){
         //1.判断BackTop是否显示
         //this.isShowBackTop=(-position.y)>BACK_POSITION;

         //2.判断tabControl是否吸顶（position:fixed)
         //this.isTabFixed=(-position.y)>this.tabOffsetTop;
      },
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
    /* overflow: hidden;
    position: absolute;
    top: 44px; 
    bottom: 0;
    left: 100px;
    right: 0; */
  }
  .tab-control{
    /* position: absolute;
    top:0;
    left: 100px;
    width:calc(100% - 100px); */
  }
</style>
