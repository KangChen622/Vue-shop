<template>
    <div class="postInfo-container">
        <p class="title">{{postInfo.title}}</p>
        <p class="subtitle">
            <span>发表时间:{{postInfo.add_time | dateFormat }}</span>
            <span>点击:{{postInfo.click}}</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
            <div class="thumbs">
                <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
            </div>
         <!-- 图片内容区域 -->
        <div class="content" v-html="postInfo.content"></div>
        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
import comment from "../../components/comment/index.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      postInfo: {},
      list: []
    };
  },
  created() {
    this.getPostInfo();
    this.getThumbs();
  },
 
  methods: {
    getPostInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.postInfo = result.body.message[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        result.body.message.forEach(item => {
          item.w = 600;
          item.h = 400;
        });
        this.list = result.body.message;
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style lang="less">
.postInfo-container {
  padding: 3px;
  .title {
    text-align: center;
    color: #26a2ff;
    margin: 15px 0;
    font-size: 15px;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
    margin-bottom: 50px; 
  }
  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
