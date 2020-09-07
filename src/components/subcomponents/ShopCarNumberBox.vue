<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-05 17:59:58
-->
<template>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input
            id="test"
            class="mui-input-numbox"
            type="number"
            :value="count"
            ref="number"
            @change="changeNum"
            readonly
        />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/dist/js/mui.min.js";
import API from "../../config/api.js";
export default {
    name: "",
    data() {
        return {};
    },
    props: ["max", "count", "id"],
    created() {},
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    watch: {
        max: function (newVal, oldVal) {
            mui(".mui-numbox").numbox().setOption("max", newVal);
        },
    },
    methods: {
        changeNum() {
            var obj = {
                id: this.id,
                count: parseInt(this.$refs.number.value),
            };
            this.$store.commit(API.VUEX.CHANGE, obj);
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
</style>
