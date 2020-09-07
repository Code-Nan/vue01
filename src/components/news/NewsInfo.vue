<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-15 23:07:39
-->
<template>
    <div class="newsinfo-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 标题 -->
        <h1 class="title">{{NewsInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{NewsInfo.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击:{{NewsInfo.click}}次</span>
        </p>
        <hr />
        <!-- 内容 -->
        <div class="content" v-html="NewsInfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
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
            NewsInfo: [],
        };
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            this.$http.get(API.HOME.NEWS.INFO + this.id).then((result) => {
                if (result.status == 200) {
                    this.NewsInfo = result.body[0];
                } else {
                    Toast({
                        message: "数据未成功加载",
                        duration: 1000,
                    });
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    components: {
        "comment-box": Comment,
    },
};
</script>

<style lang="scss">
.newsinfo-container {
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
