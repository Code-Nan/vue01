<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-15 15:47:55
-->
<template>
    <div class="newslist-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 新闻列表 -->
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadControl.loading"
            :infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10"
            class="mui-table-view"
        >
            <li v-for="item in NewsList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.imgUrl" />
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间:{{item.createTime|dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span>点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <!-- 菊花loading -->
        <div class="loading-box tc" v-if="loadControl.isLoading">
            <mt-spinner type="snake" class="loading-more"></mt-spinner>
            <span class="loading-more-txt">加载中...</span>
        </div>
        <!-- no more 提示 -->
        <div class="no-more" v-if="loadControl.noMore">已全部加载~</div>
    </div>
</template>

<script>
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            NewsList: [],
            pageInfo: {
                pageIndex: 1,
                pageSize: 12,
            },
            loadControl: {
                loading: false,
                isLoading: false,
                noMore: false,
            },
        };
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList() {
            this.$http
                .get(API.HOME.NEWS.LIST, {
                    params: this.pageInfo,
                })
                .then((result) => {
                    if (result.status == 200) {
                        if (result.body.length > 0) {
                            this.NewsList = this.NewsList.concat(result.body);
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
                            message: "未成功获取新闻！",
                            duration: 1000,
                        });
                    }
                });
        },
        loadMore: function () {
            setTimeout(() => {
                this.getNewsList();
            }, 1000);
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.newslist-container {
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
    .mui-table-view .mui-media,
    .mui-table-view .mui-media-body {
        overflow: scroll;
    }
    .test {
        height: 100px;
        background-color: aqua;
    }
    .mui-media-body {
        h1 {
            font-size: 14px;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: cadetblue;
            display: flex;
            justify-content: space-between;
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
        padding-top: 10px;
        padding-bottom: 60px;
        text-align: center;
    }
}
</style>
