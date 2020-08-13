/*
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-09 22:37:36
 */
//导入vue包
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入bootstrap包
import  'bootstrap/dist/css/bootstrap.css'

//导入mint-ui包
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// import {Button,Toast} from 'mint-ui'
// Vue.component(Button.name,Button)
// Vue.component(Toast.name,Toast)

//导入mui
import './lib/mui/dist/css/mui.min.css'

//导入css样式




//引入app和路由
import app from './App.vue'
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})