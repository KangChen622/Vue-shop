
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

// 导入 vue-resourse
import VueResource from "vue-resource"

// 注册
Vue.use(VueResource)
// 配置vue-resource请求根域名
Vue.http.options.root="http://www.lovegf.cn:8899/"

Vue.config.productionTip = false
// 导入mint-ui组件
// import "mint-ui/lib/style.css"
import {Header,Swipe, SwipeItem,Button} from 'mint-ui'

// 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button)

// 导入mui样式
import "./lib/mui/css/mui.css"
import  "./lib/mui/css/icons-extra.css"

// 初始化样式
import "./css/common.less";

// 定义全局过滤器
Vue.filter('dataFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
  })

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
 render:h=>h(App)
})
