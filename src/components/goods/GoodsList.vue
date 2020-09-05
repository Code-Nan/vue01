<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-31 09:59:35
-->
<template>
    <div class="goodslist-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadControl.loading"
            :infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10"
            class="goodslist"
        >
            <li class="goods-item" v-for="item in GoodsList" :key="item.id" @click="toGoodsInfo(item.id)">
                <div class="goods-img">
                    <img v-lazy="item.imgUrl" />
                </div>
                <h1 class="title">{{item.title}}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{item.sellPrice}}</span>
                        <span class="old">￥{{item.marketPrice}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{item.stockQuantity}}件</span>
                    </p>
                </div>
            </li>
            <!-- 菊花loading -->
            <div class="loading-box tc" v-if="loadControl.isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
            </div>
            <!-- no more 提示 -->
            <div class="no-more" v-if="loadControl.noMore">已全部加载~</div>
        </ul>
    </div>
</template>

<script>
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            //商品列表
            GoodsList: [],
            //分页信息
            pageInfo: {
                pageIndex: 1,
                pageSize: 6,
            },
            //懒加载参数
            loadControl: {
                loading: false,
                isLoading: false,
                noMore: false,
            },
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            this.$http
                .get(API.HOME.GOODS.LIST, {
                    params: this.pageInfo,
                })
                .then((result) => {
                    if (result.status == 200) {
                        if (result.body.length > 0) {
                            this.GoodsList = this.GoodsList.concat(result.body);
                            this.loadControl.loading = false;
                            this.loadControl.isLoading = true;
                            this.pageInfo.pageIndex++;
                            console.log(this.pageInfo.pageIndex);
                        } else {
                            this.loadControl.loading = true;
                            this.loadControl.isLoading = false;
                            this.loadControl.noMore = true;
                        }
                    } else {
                        Toast({
                            message: "未成功获取数据！",
                            duration: 1000,
                        });
                    }
                });
        },
        loadMore() {
            setTimeout(() => {
                this.getGoodsList();
            }, 1000);
        },
        goBack(){
            this.$router.push({name:"Home"});
        },
        toGoodsInfo(id){
            this.$router.push({name:"GoodsInfo",params:{id}})
        }
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.goodslist-container {
    .return {
        position: fixed;
        left: 10px;
        top: 13px;
        z-index: 100;
        width: 44px;
        height: 14px;
        display: flex;
        justify-content: space-between;
        line-height: 14px;
        .return-img {
            width: 14px;
            height: 14px;
            background: url("https://dongnan185.cn/vue_cms/icons/return.png")
                no-repeat;
            background-size: 14px 14px;
        }
        .return-content {
            color: #fff;
            font-size: 14px;
        }
    }
    .goodslist {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 280px;
            .goods-img{
                background-color: #ccc;
            }
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
            }
            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
        .loading-box {
            width: 100%;
            text-align: center;
            padding-bottom: 80px;
            padding-top: 30px;
            .loading-more {
                display: inline-block;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
            .loading-more-txt {
                vertical-align: middle;
                font-size: 0.22rem;
            }
        }
        .no-more {
            width: 100%;
            color: red;
            font-size: 0.16rem;
            padding-top: 10px;
            padding-bottom: 50px;
            text-align: center;
        }
    }
    img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
}
</style>