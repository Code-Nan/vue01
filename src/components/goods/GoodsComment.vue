<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-05 15:35:22
-->
<template>
    <div class="goodscomment-container">
        <!-- 返回 -->
        <div class="return" @click="goBack(id)">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <!-- 评论 -->
        <com-box :id="id"></com-box>
    </div>
</template>

<script>
import Comment from "../subcomponents/Comment.vue";
export default {
    name: "",
    data() {
        return {
            id: this.$route.params.id,
        };
    },
    created() {},
    methods: {
        goBack(id) {
            this.$router.push({ name: "GoodsInfo", params: { id } });
        },
    },
    components: {
        "com-box": Comment,
    },
};
</script>

<style lang="scss" scoped>
.goodscomment-container {
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
}
</style>
