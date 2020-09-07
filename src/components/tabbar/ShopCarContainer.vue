<!--
 * @Author: dongnan
 * @Descripttion: 购物车
 * @Date: 2020-08-13 17:31:42
-->
<template>
    <div class="shopcar-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 购物车商品列表 -->
        <div class="goodslist">
            <div class="mui-card" v-for="(item,index) in shopGoodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.imgUrl" />
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sellPrice}}</span>
                                <number-box
                                    :max="item.stockQuantity"
                                    :count="$store.getters.getGoodsCount[item.id]"
                                    :id="item.id"
                                ></number-box>
                                <a @click.prevent="deleteGoods(item.id,index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算界面 -->
        <div class="mui-card total">
            <div class="mui-card-content">
                <div class="mui-card-content-inner content">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>
                            已勾选商品
                            <span>{{$store.getters.getGoodsCountAndAmount.count}}</span>件,总价
                            <span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>元
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NumberBox from "../subcomponents/ShopCarNumberBox.vue";
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            shopGoodsList: [],
        };
    },
    created() {
        this.getShopGoods();
    },
    components: {
        "number-box": NumberBox,
    },
    methods: {
        goBack() {
            this.$router.push({ name: "Home" });
        },
        getShopGoods() {
            this.$http
                .get(API.SHOPCAR.LIST + this.$store.getters.getGoodsIds)
                .then((result) => {
                    if (result.status == 200) {
                        this.shopGoodsList = result.body;
                    } else {
                        Toast({
                            message: "获取数据失败！",
                            duration: 1000,
                        });
                    }
                });
        },
        selectedChange(id, selected) {
            var obj = {
                id,
                selected,
            };
            this.$store.commit(API.VUEX.SELECTED, obj);
        },
        deleteGoods(id, index) {
            this.shopGoodsList.splice(index, 1);
            this.$store.commit(API.VUEX.DELETE, id);
        },
    },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
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
            background: url("https://dongnan185.com/images/vue_cms/icons/return.png")
                no-repeat;
            background-size: 14px 14px;
        }
        .return-content {
            color: #fff;
            font-size: 14px;
        }
    }
    .goodslist {
        display: block;
        padding: 10px 0;
        background-color: #eee;
        .mui-card {
            margin-bottom: 0;
            margin-top: 10px;
            .mui-card-content-inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                    width: 60px;
                    height: 60px;
                }
                h1 {
                    font-size: 13px;
                    margin: 10px 0px;
                }
                .mui-numbox {
                    height: 25px;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    .price {
                        color: red;
                        font-size: 14px;
                        font-weight: bold;
                    }
                }
            }
        }
        .mui-card:nth-child(1) {
            margin-top: 0px !important;
        }
    }
    .total {
        margin-bottom: 60px;
        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                color: red;
                font-weight: bold;
            }
        }
    }
}
</style>
