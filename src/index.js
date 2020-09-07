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
Vue.filter('dateFormat', (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(dateStr).format(pattern)
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

//导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//引入app、路由、vuex
import app from './App.vue'
import router from './config/router.js'
import store from './config/store.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})

//获取当前时间
Vue.prototype.getNowFormatDate = function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return moment(dateStr).format('YYYY-MM-DD HH:mm:ss')
};

