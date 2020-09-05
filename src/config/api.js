/*
 * @Author: dongnan
 * @Descripttion: 接口地址
 * @Date: 2020-08-29 15:12:12
 */
const SERVICE_URL = '/api';
const API = {
    //评论
    COMMENT:{
        //获取评论
        GET:SERVICE_URL+'/vue_cms/comments/',
        //新增评论
        ADD:SERVICE_URL+'/vue_cms/postComment/'
    },
    //首页
    HOME:{
        //轮播图地址
        LUNBO:SERVICE_URL+'/vue_cms/lunbo',
        //新闻资讯
        NEWS:{
            //新闻列表
            LIST:SERVICE_URL+'/vue_cms/newslist',
            //新闻详情
            INFO:SERVICE_URL+'/vue_cms/newsinfo/'
        },
        //图片分享
        PHOTOS:{
            //图片分类
            CATEGORY:SERVICE_URL+'/vue_cms/getPhotoCategory',
            //获取全部列表
            ALLLIST:SERVICE_URL+'/vue_cms/getAllPhotoList',
            //获取分类列表
            LIST:SERVICE_URL+'/vue_cms/getPhotoList/',
            //获取图片详情
            INFO:SERVICE_URL+'/vue_cms/getPhotoInfo/',
            //获取图片详情中的缩略图
            IMAGES:SERVICE_URL+'/vue_cms/getImages/'
        },
        //商品购买
        GOODS:{
            //商品列表
            LIST:SERVICE_URL+'/vue_cms/getGoodsList',
            INFO:SERVICE_URL+'/vue_cms/getGoodsInfo/',
            IMAGES:SERVICE_URL+'/vue_cms/getImages/',
            DESC:SERVICE_URL+'/vue_cms/getGoodsDesc/'
        }

    }
}
export default API