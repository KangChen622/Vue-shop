<template>
    <div>
        <div id="slider" class="mui-slider">
            <!-- 顶部导航栏区域 -->
          <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                 <div class="mui-scroll">
                    <!-- 判断id是否为0 即是为全部就加上mui-active样式 -->
                    <span :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getPhotoListCateId(item.id)">
                       {{item.title}}
                     </span>
                 </div>
            </div>
        </div>
        <!-- 图片列表区域 -->
        <div class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/postInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
// 导入mui样式
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListCateId(0);
  },
  mounted() {
    //   mui初始化滑动
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // a标签默认跳转
    mui("body").on("tap", "a", function() {
      window.top.location.href = this.href;
    });
  },
  methods: {
    getAllCategory() {
      //   获取所有图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 后台没有全部分类需手动添加
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListCateId(cateId) {
      //   根据id获取图文列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
          console.log(this.list)
        }
      });
    }
  }
};
</script>
<style lang="less">
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
        overflow: hidden;
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height:74px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
