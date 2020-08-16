<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-10 20:21:00
-->
<template>
    <div class="app-container">
        <!-- header -->
        <mt-header fixed title="南游商店"></mt-header>
        <!-- content -->
        <transition>
            <router-view></router-view>
        </transition>
        <!-- bottom -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-email">
                    <span class="mui-badge">9</span>
                </span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
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
        return {};
    },
    created() {},
    components: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
}
.v-enter-active,
.v-leave-active{
    transition: all .5s ease;
}
.v-enter{
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}

</style>
