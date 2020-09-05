<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-05 15:35:13
-->
<template>
    <div class="goodsdesc-container">
        <!-- 返回 -->
        <div class="return" @click="goBack(id)">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <h1 class="title">{{GoodsDesc.title}}</h1>
        <hr />
        <div class="content" v-html="GoodsDesc.content"></div>
    </div>
</template>

<script>
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            id: this.$route.params.id,
            GoodsDesc: {},
        };
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        goBack(id) {
            this.$router.push({ name: "GoodsInfo", params: { id } });
        },
        getGoodsDesc() {
            this.$http.get(API.HOME.GOODS.DESC + this.id).then((result) => {
                if (result.status == 200) {
                    this.GoodsDesc = result.body[0];
                } else {
                    Toast({
                        message: "未获取到数据！",
                        duration: 1000,
                    });
                }
            });
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.goodsdesc-container {
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
    .title {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
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
