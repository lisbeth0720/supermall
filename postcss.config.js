module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportwidth: 750,// 视窗的宽度，对应的是我们设计稿的宽度phone6.
      viewportHeight: 1334, //视窗的高度，对应的是我们设计稿的高度，(也可以不配置)
      unitPrecision: 5,//指定px~ 转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlacklist: ['.ignore','.tab-bar','.tab-bar-item'], //指定不需要转换的类,哪个不需要转换的话class加个ignore即可-咋不起作用呢
      minPixelvalue:1,//小于或等于1px不转换为视窗单位.mediaQuery: false//允许在媒体查询中转换^ px
      exclude:[/TabBar/,/NavBar/]//指定不需要转换的
    }
  }
}
