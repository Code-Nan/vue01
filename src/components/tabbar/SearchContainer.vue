<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-13 17:35:54
-->
<template>
    <div class="search-container">
        <!-- 返回 -->
        <div class="return" @click="goBack()">
            <div class="return-img"></div>
            <p class="return-content">返回</p>
        </div>
        <h1>SearchContainer</h1>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
        goBack() {
            this.$router.push({ name: "Home" });
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.search-container {
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
}
</style>
