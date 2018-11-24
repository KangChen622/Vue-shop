<template>
    <div class="comment-container">
        <h2>发表评论</h2>
        <hr>
        <textarea placeholder="请输入评论内容！最多输入120字" maxlength="120"  v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="comment-list">
            <div class="comment-item" v-for="(item,index) in commentList" :key="index">
                <div class="comment-title">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
                <div class="comment-content">
                    {{item.content || "此人尤其神秘"}}
                </div>
            </div> 
        </div>
          <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            pageIndex:1,
            commentList:[],
            msg:""
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                this.commentList=this.commentList.concat(result.body.message);
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length===0){
                return Toast("评论内容不能为空!")
            }
        
           this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(result=>{
               if(result.body.status===0){
                   var cmt={
                       user_name:'匿名用户',
                       add_time:Date.now(),
                       content:this.msg.trim()
                   };
                  this.commentList.unshift(cmt);
                   this.msg="";
               }
            })
        }
    }
};
</script>
<style lang="less">
.comment-container {
    padding: 10px;
  textarea{
      height: 80px;
      padding: 5px;
      font-size: 14px;
      color: #8f8f94;
  }
  .comment-list {
    .comment-item {
      margin: 5px 0;
      .comment-title {
        font-size: 13px;
        background-color: #ccc;
      }
      .comment-content {
        font-size: 13px;
      }
    }
  }
}
</style>

