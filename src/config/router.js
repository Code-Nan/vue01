/*
 * @Author: dongnan
 * @Descripttion: 路由
 * @Date: 2020-08-10 20:22:55
 */
import VueRouter from 'vue-router'
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContainer from '../components/tabbar/MemberContainer.vue'
import ShopCarContainer from '../components/tabbar/ShopCarContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import PhotoList from '../components/photos/PhotoList.vue'
import PhotoInfo from '../components/photos/PhotoInfo.vue'
import GoodsList from '../components/goods/GoodsList.vue'
import GoodsInfo from '../components/goods/GoodsInfo.vue'
import GoodsDesc from '../components/goods/GoodsDesc.vue'
import GoodsComment from '../components/goods/GoodsComment.vue'

var router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home',
            name: 'Home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcar',
            component: ShopCarContainer
        },
        {
            path: '/search',
            component: SearchContainer
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfo
        },
        {
            path: '/home/photolist',
            component: PhotoList
        },
        {
            path: '/home/photoinfo/:id',
            component: PhotoInfo
        },
        {
            path: '/home/goodslist',
            component: GoodsList,
            name: 'GoodsList'
        },
        {
            path: '/home/goodsinfo',
            component: GoodsInfo,
            name: 'GoodsInfo'
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc,
            name: 'GoodsDesc'
        },
        {
            path: '/home/goodscomment/:id',
            component: GoodsComment,
            name: 'GoodsComment'
        }
    ],
    linkActiveClass: 'mui-active'
})

export default router