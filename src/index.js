/*
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-08-09 22:37:36
 */
//导入vue包
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入vue-resource包
import VueResource from 'vue-resource'
Vue.use(VueResource)

//配置http默认请求
Vue.http.options.emulateJSON = true

//过滤器
import moment from 'moment'
Vue.filter('dateFormat', (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(dataStr).format(pattern)
})

//导入bootstrap包
import 'bootstrap/dist/css/bootstrap.css'

//导入mint-ui包
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// import {Button,Toast} from 'mint-ui'
// Vue.component(Button.name,Button)
// Vue.component(Toast.name,Toast)

//导入mui样式
import './lib/mui/dist/css/mui.min.css'
import './lib/mui/dist/css/icons-extra.css'

//导入css样式


//引入app和路由
import app from './App.vue'
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})