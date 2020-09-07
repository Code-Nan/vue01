<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-27 09:24:17
-->
<template>
    <div class="photoinfo-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 标题 -->
        <h1 class="title">{{PhotoInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{PhotoInfo.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击:{{PhotoInfo.click}}次</span>
        </p>
        <hr />
        <!-- 缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="this.slideList" @close="handleClose"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="PhotoInfo.content"></div>
        <!-- 评论组件 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
import API from "../../config/api.js";
import Comment from "../subcomponents/Comment.vue";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            id: this.$route.params.id,
            PhotoInfo: [],
            slideList: [],
            slide1: [
                {
                    src: "https://dongnan185.com/images/vue_cms/PhotoList/21/1.jpg",
                    msrc: "https://dongnan185.com/images/vue_cms/PhotoList/21/1.jpg",
                    alt: "picture1",
                    title: "Image Caption 1",
                    w: 900,
                    h: 1000,
                },
                {
                    src:
                        "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
                    msrc:
                        "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
                    alt: "picture2",
                    title: "Image Caption 2",
                    w: 1200,
                    h: 900,
                },
                {
                    src: "https://dongnan185.com/images/vue_cms/PhotoList/21/1.jpg",
                    msrc: "https://dongnan185.com/images/vue_cms/PhotoList/21/1.jpg",
                    alt: "picture3",
                    title: "Image Caption 1",
                    w: 900,
                    h: 1000,
                },
            ],
        };
    },
    created() {
        this.getPhotoInfo();
        this.getSlideList();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get(API.HOME.PHOTOS.INFO + this.id).then((result) => {
                if (result.status == 200) {
                    this.PhotoInfo = result.body[0];
                } else {
                    Toast({
                        message: "获取数据失败！",
                        duration: 1000,
                    });
                }
            });
        },
        getSlideList() {
            this.$http.get(API.HOME.PHOTOS.IMAGES + this.id).then((result) => {
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
                json.src = item.imgUrl;
                json.msrc = item.imgUrl;
                json.alt = "picture" + (index + 1);
                json.title = "图" + (index + 1);
                json.w = item.width;
                json.h = item.height;
                newList.push(json);
            });
            this.slideList = newList;
        },
        handleClose() {
            console.log("close event");
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    components: {
        "cmt-box": Comment,
    },
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 0 4px;
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
    .title {
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    hr {
        margin-top: 0px;
    }
    .thumbs {
        /deep/ .my-gallery {
            display: flex;
            flex-wrap: wrap;
            figure {
                width: 30%;
                margin: 5px;
                img {
                    width: 100%;
                    min-height: 156px;
                }
            }
        }
    }
    .content {
        img {
            width: 100%;
        }
        p {
            text-indent: 2em;
            margin: 10px 0;
        }
        span {
            display: block;
            text-align: center;
            font-size: 13px;
            margin: 5px auto;
        }
    }
}
</style>
