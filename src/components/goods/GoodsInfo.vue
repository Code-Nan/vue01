<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-03 00:28:54
-->
<template>
    <div class="goodsinfo-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 商品详情 -->
        <div class="goodsinfo">
            <!-- 小球动画 -->
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition>
            <!-- 商品轮播图展示 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <swipe-box :lunboList="this.imagesList" :isFull="false"></swipe-box>
                </div>
            </div>
            <!-- 商品信息展示 -->
            <div class="mui-card">
                <div class="mui-card-header">{{imageInfo.title}}</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p class="price">
                            市场价：
                            <del>￥{{imageInfo.marketPrice}}</del>&nbsp;&nbsp;销售价：
                            <span class="now-price">￥{{imageInfo.sellPrice}}</span>
                        </p>
                        <div class="number">
                            <p class="buy-number">
                                购买数量：
                                <number-box @getCount="getSelectNum" :max="imageInfo.stockQuantity"></number-box>
                            </p>
                        </div>
                        <p class="next-button">
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCart">加入购物车</mt-button>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 商品评价 -->
            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号：{{imageInfo.productNumber}}</p>
                        <p>库存情况：{{imageInfo.stockQuantity}}件</p>
                        <p>上架时间：{{imageInfo.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goGoodsDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goGoodsComment(id)">商品评论</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swipe from "../subcomponents/Swipe.vue";
import NumberBox from "../subcomponents/GoodsNumberBox.vue";
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            id: this.$route.params.id,
            imagesList: [],
            imageInfo: {},
            ballFlag: false,
            selectNum:1,
        };
    },
    created() {
        this.getImagesList();
        this.getImageInfo();
    },
    methods: {
        goBack() {
            this.$router.push({ name: "GoodsList" });
        },
        getImagesList() {
            this.$http.get(API.HOME.GOODS.IMAGES + this.id).then((result) => {
                if (result.status == 200) {
                    this.assembleList(result.body);
                } else {
                    Toast({
                        message: "获取数据失败！",
                        duration: 1000,
                    });
                }
            });
        },
        assembleList(list) {
            var newList = [];
            list.forEach((item, index) => {
                var json = {};
                json.imgurl = item.imgUrl;
                newList.push(json);
            });
            this.imagesList = newList;
        },
        getImageInfo() {
            this.$http.get(API.HOME.GOODS.INFO + this.id).then((result) => {
                if (result.status == 200) {
                    this.imageInfo = result.body[0];
                } else {
                    Toast({
                        message: "为获取到数据！",
                        duration: 1000,
                    });
                }
            });
        },
        goGoodsDesc(id) {
            this.$router.push({ name: "GoodsDesc", params: { id } });
        },
        goGoodsComment(id) {
            this.$router.push({ name: "GoodsComment", params: { id } });
        },
        addToShopCart() {
            this.ballFlag = !this.ballFlag;
            var goods = {
                id:this.id,
                count:this.selectNum,
                selected:true,
                price:this.imageInfo.sellPrice
            }
            this.$store.commit(API.VUEX.ADDTOCART,goods);
        },
        beforeEnter(el) {
            el.style.transform = "translate(0,0)";
        },
        enter(el, done) {
            el.offsetWidth;
            //获取小球位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
            //计算偏移位置
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectNum(count){
            this.selectNum = count;
        }

    },
    components: {
        "swipe-box": Swipe,
        "number-box": NumberBox,
    },
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
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
    .goodsinfo {
        position: relative;
        background-color: #eee;
        padding-bottom: 50px;
        .mui-card {
            margin-top: 0px;
            .now-price {
                color: red;
                font-size: 16px;
                font-weight: bold;
            }
            .number {
                width: 100%;
                height: 35px;
                float: left;
                line-height: 35px;
                .buy-number {
                    float: left;
                }
            }
            .next-button {
                float: left;
                margin-top: 20px;
                button {
                    margin-right: 20px;
                }
            }
            .mui-card-footer {
                display: block;
                button {
                    margin: 15px 0;
                }
            }
        }
        .ball {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: red;
            z-index: 99;
            position: absolute;
            left: 151px;
            top: 330px;
        }
    }
}
</style>
