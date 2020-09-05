<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-19 22:12:12
-->
<template>
    <div class="photolist-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div
                id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
            >
                <div class="mui-scroll">
                    <a
                        v-for="item in categoryList"
                        :key="item.id"
                        :class="['mui-control-item',item.id==0?'mui-active':'']"
                        @click="changeCategory(item.id)"
                    >{{item.title}}</a>
                </div>
            </div>
        </div>
        <!-- 图片列表区域 -->
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadControl.loading"
            :infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10"
        >
            <router-link
                v-for="item in PhotoList"
                :key="item.id"
                :to="'/home/photoinfo/'+item.id"
                tag="li"
            >
                <img v-lazy="item.imgUrl" />
                <div class="info">
                    <div class="info-title">{{item.title}}</div>
                    <div class="info-body">{{item.content}}</div>
                </div>
            </router-link>
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
import mui from "../../lib/mui/dist/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
    name: "",
    data() {
        return {
            //存储顶部分类标签列表
            categoryList: [],
            //当前选中分类索引
            type: 0,
            //存储当前页面的图片列表
            PhotoList: [],
            //分页信息
            pageInfo: {
                pageIndex: 1,
                pageSize: 3,
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
        this.getPhotoCategory();
        this.getPhotoList(this.type);
    },
    mounted() {
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getPhotoCategory() {
            this.$http.get(API.HOME.PHOTOS.CATEGORY).then((result) => {
                if (result.status == 200) {
                    result.body.unshift({ id: 0, title: "全部" });
                    this.categoryList = result.body;
                } else {
                    Toast({
                        message: "获取数据失败！",
                        duration: 1000,
                    });
                }
            });
        },
        getALLPhotoList() {
            this.$http
                .get(API.HOME.PHOTOS.ALLLIST, {
                    params: this.pageInfo,
                })
                .then((result) => {
                    if (result.status == 200) {
                        if (result.body.length > 0) {
                            this.PhotoList = this.PhotoList.concat(result.body);
                            this.loadControl.loading = false;
                            this.loadControl.isLoading = true;
                            this.pageInfo.pageIndex++;
                        } else {
                            this.loadControl.loading = true;
                            this.loadControl.isLoading = false;
                            this.loadControl.noMore = true;
                        }
                    } else {
                        Toast({
                            message: "获取数据失败！",
                            duration: 1000,
                        });
                    }
                });
        },
        getSingleList() {
            this.$http
                .get(API.HOME.PHOTOS.LIST + this.type, {
                    params: this.pageInfo,
                })
                .then((result) => {
                    if (result.status == 200) {
                        if (result.body.length > 0) {
                            this.PhotoList = this.PhotoList.concat(result.body);
                            this.loadControl.loading = false;
                            this.loadControl.isLoading = true;
                            this.pageInfo.pageIndex++;
                        } else {
                            this.loadControl.loading = true;
                            this.loadControl.isLoading = false;
                            this.loadControl.noMore = true;
                        }
                    } else {
                        Toast({
                            message: "获取数据失败！",
                            duration: 1000,
                        });
                    }
                });
        },
        getPhotoList(type) {
            if (type) {
                this.getSingleList();
            } else {
                this.getALLPhotoList();
            }
        },
        loadMore() {
            setTimeout(() => {
                this.getPhotoList(this.type);
            }, 1000);
        },
        changeCategory(id) {
            this.type = id;
            this.PhotoList = [];
            this.pageInfo.pageIndex = 1;
            this.loadControl.loading = false;
            this.loadControl.isLoading = false;
            this.loadControl.noMore = false;
            this.getPhotoList(this.type);
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    components: {},
};
</script>
<style lang="scss" scoped>
* {
    touch-action: pan-y;
}
.photolist-container {
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
    ul {
        list-style: none;
        margin: 0;
        padding: 10px;
        li {
            position: relative;
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            img {
                width: 100%;
                vertical-align: middle;
            }
            .info {
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                color: white;
                text-align: left;
                max-height: 50px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
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
            color: red;
            font-size: 0.16rem;
            padding-top: 0px;
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
