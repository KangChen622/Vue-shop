
import Vue from 'vue'
import App from './App'
import router from './router'
// 格式化时间
import moment from 'moment'

// 导入 vue-resourse
import VueResource from "vue-resource"

// 注册vuex 创建一个全局仓库，来进行状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站 调用main.js  先把购物车中的数据读取出来，放到store中
var car=JSON.parse(localStorage.getItem('car')||'[]')
var store=new Vuex.Store({
  state:{ //this.$store.state.****
    car:car //将购物车商品信息存储起来 以对象方式储存
  },
  mutations:{  //this.$store.commit("方法的名称",'按需传递唯一的参数')
    addToCar(state,GoodsInfo){
        // 如果car中有这个商品就只用更新数量
        // 没有就添加信息
        var flag=false;
        // 进入循环则说明该商品之前就有
        state.car.some(item=>{
          if(item.id==GoodsInfo.id){
            item.count+=parseInt(GoodsInfo.count)
            flag=true
            return true
          }
        })
        // flag没变则说明没有该商品
        if(!flag){
           state.car.push(GoodsInfo)
        }
        //  存储car数组
        localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{ //this.$store.getters.***
      getAllCount(state){
        var c=0;
        state.car.forEach(item=>{
          c+=item.count
        })
        return c
      }
    }
    
  })


// 注册
Vue.use(VueResource)
// 配置vue-resource请求根域名
Vue.http.options.root="http://www.lovegf.cn:8899/"
Vue.http.options.emulateJSON=true;

Vue.config.productionTip = false
// 导入mint-ui组件
// import "mint-ui/lib/style.css"
// import {Header,Swipe, SwipeItem,Button} from 'mint-ui'

// // 注册组件
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name,Button)
// Vue.component(Lazyload.name,Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入mui样式
import "./lib/mui/css/mui.css"
import  "./lib/mui/css/icons-extra.css"

// 初始化样式
import "./css/common.less";
// 图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 定义全局过滤器
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
  })

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
 render:h=>h(App),
 store  //挂载状态管理对象 
})
