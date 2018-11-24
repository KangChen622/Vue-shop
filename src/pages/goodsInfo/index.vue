<template>
    <div class="goodsInfo-container">
        <!-- 小球 -->
        <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
        <div class="lunbotu">
            <!-- 轮播图区域 -->
          
                   <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
            
        </div>
        <div class="buy">
            <!-- 商品购买区域 -->
           <h5>{{goodsinfo.title}}</h5>
           <p class="price">
               市场价:<del>¥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">¥{{goodsinfo.sell_price}}</span>
           </p>
           <div class="buyNumber">
              <div class="bnt"> 购买数量：</div>
               <div class="number">
                  <span class="reduce" @click="reduceCount">-</span>
                  <input type="text" class="count" v-model="vcount"></input>
                  <span class="add" @click="addCount">+</span>
               </div>
           </div>
           <input type="button" value="立即购买" class="fastBuy">
           <input type="button" value="加入购物车" class="addGoods" @click="addToShopCar">
        </div>
        <div class="product-parameter">
            <!-- 商品详情 -->
            <h3>商品参数</h3>
            <hr>
            <p>商品货号:{{goodsinfo.goods_no}}</p>
            <p>商品库存:{{goodsinfo.stock_quantity}}件</p>
            <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
        </div>
         <div class="mui-card-footer">
             <mt-button type="primary" size="large"  class="top" plain @click="goDesc(id)">图文介绍</mt-button><br/>
             <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
    </div>
</template>
<script>
// 导入轮播图组件
import swiper from "../../components/swiper";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag:false,
      vcount:'1'
      
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 公用src 添加img属性
          result.body.message.forEach(item => {
            item.img = item.src;
          });

     
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 编程式导航跳转到图文详情界面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    // 小圆点动画
    addToShopCar(){
        this.ballFlag=!this.ballFlag;
        console.log('aaa')
    },
    beforeEnter(el){
      el.style.transform = "translate(0, 0)";
    },
    enter(el,done){
        el.offsetWidth;
        // 小球在页面中的位置
         const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition=document.getElementById('badge').getBoundingClientRect();
    const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 3s cubic-bezier(.4,-0.3,1,.68)";
      console.log(xDist+'-----'+yDist)
      done();

    },
    afterEnter(el){
        this.ballFlag=!this.ballFlag;
    },
    addCount(){
      // let a =document.getElementsByClassName('count').innerHTML;
    this.vcount++
    },
    reduceCount(){
      this.vcount--;
      if(this.vcount<=1){
        return this.vcount=1;
      }
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="less">
.goodsInfo-container {
  background-color: #fff;
  padding: 10px;
  .buy {
    padding: 10px;
    margin-bottom: 50px;

    h5 {
      font-size: 16px;
      color: black;
      line-height: 30px;
    }
    .price {
      color: black;
      .now_price {
        color: red;
      }
    }
    .fastBuy {
      background-color: #26a2ff;
      color: #fff;
      border: 0;
    }
    .addGoods {
      background-color: #ef4f4f;
      color: #fff;
    }
  }
  .product-parameter {
    p {
      color: #ccc;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .mui-card-footer {
    margin-top: 20px;
    display: block;
    .top {
      margin-top: 10px;
    }
  }
  .buyNumber {
    margin: 10px 0;
    height: 30px;
    > div {
      float: left;
    }
    .bnt {
      display: inline-block;
      // border: 1px solid #ccc;
      height: 30px;
      margin-right: 10px;
      text-align: center;
      font-size: 14px;
      line-height: 30px;
    }
    .number {
      display: inline-block;
      border-radius: 3px;
      height: 30px;

      width: 160px;
      border: 1px solid #ccc;
      span {
        height: 100%;
        display: inline-block;
        width: 50px;
        text-align: center;
        float: left;
        line-height: 30px;
        background-color: rgba(243, 234, 234, 0.637);
      }
      .reduce {
        border-right: 1px solid #ccc;
      }
      .add {
        border-left: 1px solid #ccc;
      }
      .count {
        height: 28px;float: left;
        text-align: center;
        border: 0;
        background-color: #fff;
        width: 58px;
      }
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 408px;
    left: 172px;
  }
}
</style>
