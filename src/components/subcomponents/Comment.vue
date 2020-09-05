<!--
 * @Author: dongnan
 * @Descripttion: 评论组件
 * @Date: 2020-08-17 09:37:37
-->
<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入BB的内容（最多BB120字）" maxlength="120" v-model="content"></textarea>
        <!-- 发表评论 -->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <!-- 评论列表 -->
        <div class="cmt-list" v-for="(item,i) in commentList" :key="item.id">
            <div class="cmt-item">
                <div
                    class="cmt-title"
                >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.userName}}&nbsp;&nbsp;发表时间:{{item.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</div>
                <div class="cmt-body">{{item.content}}</div>
            </div>
        </div>
        <!-- 加载更多 -->
        <mt-button type="danger" size="large" plain @click="getMoreComments">加载更多</mt-button>
    </div>
</template>

<script>
import API from "../../config/api.js";
import { Toast } from "mint-ui";
export default {
    name: "",
    data() {
        return {
            pageIndex: 1,
            pageSize: 8,
            commentList: [],
            content: "",
            userName: "dongnan",
        };
    },
    created() {
        this.getCommentsList();
    },
    methods: {
        getCommentsList() {
            this.$http
                .get(API.COMMENT.GET + this.id, {
                    params: {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                    },
                })
                .then((result) => {
                    if (result.status == 200) {
                        if (result.body.length > 0) {
                            this.commentList = this.commentList.concat(
                                result.body
                            );
                        } else {
                            if (this.commentList.length > 0) {
                                Toast({
                                    message: "所有评论已加载！",
                                    duration: 1000,
                                });
                            }
                        }
                    } else {
                        Toast({
                            message: "数据未成功加载",
                            duration: 1000,
                        });
                    }
                });
        },
        getMoreComments() {
            this.pageIndex++;
            this.getCommentsList();
        },
        postComment() {
            if (this.content == "") {
                Toast({
                    message: "评论内容不能为空！",
                    duration: 1000,
                });
                return;
            }
            let data = {
                userName: this.userName,
                createTime: this.getNowFormatDate(),
                content: this.content,
            };
            this.$http.post(API.COMMENT.ADD + this.id, data).then((result) => {
                if (result.status == 200) {
                    Toast({
                        message: "发表成功！",
                        duration: 1000,
                    });
                    this.commentList.unshift(data);
                    this.content = "";
                } else {
                    Toast({
                        message: "发表失败！",
                        duration: 1000,
                    });
                }
            });
        },
    },
    components: {},
    props: ["id"],
};
</script>

<style lang="scss" scoped>
.cmt-container {
    padding-bottom: 60px;
    h3 {
        font-size: 18px;
    }
    hr {
        margin-bottom: 10px;
    }
    textarea {
        height: 85px;
        font-size: 13px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
        font-size: 13px;
        .cmt-item {
            .cmt-title {
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body {
                line-height: 35px;
            }
        }
    }
}
</style>
