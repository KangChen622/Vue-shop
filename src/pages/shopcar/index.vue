<template>
    <div class="shopcar-container">
        <div class="goods-list" v-for="(item) in goodslist" :key="item.id">
            <mt-switch ></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
                <h1>{{item.title}}</h1>
                <p>
                    <span class="price">￥{{item.sell_price}}</span>   <a href="#">删除</a>
                       <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
                        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                        <input id="test" class="mui-input-numbox" type="number" value="0">
                        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                         </div>
                      
                </p>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="accounts">
            <div class="left">
                <p>总计(不含运费)</p>
                <p>已勾选商品<span class="red">0</span>件，总价<span class="red">￥0</span></p>
            </div>
            <div class="right">去结算</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                goodslist:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                var idArr=[];
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                });
                if(idArr.length<=0){
                    return;
                }
                this.$http.get("api/goods/getshopcarlist/"+idArr.join(',')).then(result=>{
                    if(result.body.status===0){
                        this.goodslist=result.body.message;
                        console.log(this.goodslist)
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.shopcar-container{
    .goods-list{
        display: flex;
        align-items: center;
        margin:  0 auto;
        img{
            width: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: 700;
            }
        }
    }
    
    .accounts{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        .red{
            color: red;
            font-weight: 700;
            font-size: 16px;
        }
        .right{
            width: 100px;
            height: 40px;
            background-color: red;
            text-align: center;
            color: white;
            border-radius: 5px;
            line-height: 40px;
        }
    }
}
</style>
