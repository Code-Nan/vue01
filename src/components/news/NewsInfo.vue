<template>
    <div class="newsinfo-container">
        <h1 class="title">{{NewsInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{NewsInfo.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击:{{NewsInfo.click}}次</span>
        </p>
        <hr />
        <div class="content" v-html="NewsInfo.content"></div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            id: this.$route.params.id,
            NewsInfo:[]
        };
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('/api/vue_cms/newsinfo/'+this.id).then(result=>{
                if(result.status==200){
                    this.NewsInfo = result.body[0]
                }else{
                    Toast("未获取到新闻详细！")
                }
            })
        }
    },
    components: {},
};
</script>

<style lang="scss">
.newsinfo-container {
    padding: 0 4px;
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
