<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-13 17:26:52
-->
<template>
    <div>
        <!-- swipe -->
        <swipe-box :lunboList="this.lunboList" :isFull="true"></swipe-box>
        <!-- 6 grid -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="/images/menu1.png" />
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="/images/menu2.png" />
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="/images/menu3.png" />
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="/images/menu4.png" />
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="/images/menu5.png" />
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="/images/menu6.png" />
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import API from "../../config/api.js";
import Swipe from "../subcomponents/Swipe.vue";
export default {
    name: "",
    data() {
        return {
            lunboList: [],
        };
    },
    created() {
        this.getImageList();
    },
    methods: {
        getImageList() {
            this.$http
                .get(API.HOME.LUNBO)
                .then((result) => {
                    if (result.status == 200) {
                        this.lunboList = result.body;
                    } else {
                        Toast("加载轮播图失败！");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    components: {
        "swipe-box":Swipe,
    },
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 64px;
        height: 64px;
    }
    .mui-media-body {
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    background-color: #fff;
    border: none;
}
</style>
