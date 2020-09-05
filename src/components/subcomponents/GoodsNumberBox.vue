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
            value="1"
            ref="number"
            @change="changeNum"
        />
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
    props:["max"],
    created() {},
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    watch:{
        "max":function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption("max",newVal);
        }
    },
    methods: {
        changeNum() {
            this.$emit("getCount", parseInt(this.$refs.number.value));
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
</style>
