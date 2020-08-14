/*
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-10 20:22:55
 */
import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

var router = new VueRouter({
    routes: [
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
        }
    ],
    linkActiveClass: 'mui-active'
})

export default router