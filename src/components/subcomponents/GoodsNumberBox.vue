<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-05 17:59:58
-->
<template>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/dist/js/mui.min.js";
export default {
    name: "",
    data() {
        return {};
    },
    created() {},
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods: {},
    components: {},
};
</script>

<style lang="scss" scoped>
</style>
