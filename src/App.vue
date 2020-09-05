<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-10 20:21:00
-->
<template>
    <div class="app-container">
        <!-- header -->
        <mt-header fixed title="爱分享更爱撩"></mt-header>
        <!-- content -->
        <transition>
            <router-view :style="{height:fullHeight + 'px'}"></router-view>
        </transition>
        <!-- bottom -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-lib" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/member">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            fullHeight: document.documentElement.clientHeight - 90,
        };
    },
    created() {},
    components: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.mint-header {
    z-index: 99;
}
.app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}
.v-enter {
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    // position: absolute;
}
.mui-bar-tab .mui-tab-item-lib.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-lib {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
