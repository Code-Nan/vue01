<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-15 15:47:55
-->
<template>
    <div>
        <ul class="mui-table-view" v-for="item in NewsList" :key="item.id">
            <li class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.imgUrl" />
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间:{{item.createTime|dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span>点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            NewsList: [],
        };
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList() {
            this.$http.get("/api/vue_cms/newslist").then((result) => {
                if (result.status == 200) {
                    this.NewsList = result.body;
                } else {
                    Toast("获取新闻数据失败！");
                }
            });
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.mui-media-body {
    h1 {
        font-size: 14px;
    }
    .mui-ellipsis {
        font-size: 12px;
        color: cadetblue;
        display: flex;
        justify-content: space-between;
    }
}
</style>
