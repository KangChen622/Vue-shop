import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from "../pages/home/"
import MemberComponent from "../pages/member/"
import ShopcarComponent from "../pages/shopcar/"
import SearchComponent from "../pages/search/"
import newsListComponent from '../pages/newsList/'
import newsInfoComponent from '../pages/newsInfo/'
import postListComponent from '../pages/postList/'
import postInfoComponent from '../pages/postInfo/'
import goodsListComponent from '../pages/goodsList/'
import goodsInfoComponent from '../pages/goodsInfo/'
import goodsDescComponent from '../pages/goodsDesc/'
import goodsCommentComponent from '../pages/goodsComment/'


Vue.use(Router)

export default new Router({
  routes: [
   {path:'/',redirect:'/home'},
   {path:'/home',component: HomeComponent},
   {path:'/member',component:MemberComponent},
   {path:'/shopcar',component:ShopcarComponent},
   {path:'/search',component:SearchComponent},
   {path:'/home/newsList',component:newsListComponent},
   {path:'/home/newsInfo/:id',component:newsInfoComponent},
   {path:'/home/postList',component:postListComponent},
   {path:'/home/postInfo/:id',component:postInfoComponent},
   {path:'/home/goodsList',component:goodsListComponent},
   {path:'/home/goodsInfo:id',component:goodsInfoComponent,name:'goodsInfo'},
   {path:'/home/goodsDesc:id',component:goodsDescComponent,name:'goodsdesc'},
   {path:'/home/goodsComment:id',component:goodsCommentComponent,name:'goodscomment'}
 
  ],
  linkActiveClass:'mui-active'
})
