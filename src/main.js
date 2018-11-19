
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入 vue-resourse
import VueResource from "vue-resource"

// 注册
Vue.use(VueResource)

Vue.config.productionTip = false
// 导入mint-ui组件
// import "mint-ui/lib/style.css"
import {Header,Swipe, SwipeItem} from 'mint-ui'

// 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入mui样式
import "./lib/mui/css/mui.css"
import  "./lib/mui/css/icons-extra.css"

// 初始化样式
import "./css/common.less";

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
 render:h=>h(App)
})
