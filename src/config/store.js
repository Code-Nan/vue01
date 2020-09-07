/*
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-07 09:56:37
 */
import Vue from 'vue'
import Vuex from 'vuex'
import API from './api.js'
Vue.use(Vuex)

let car = localStorage.getItem("vue_car") ? JSON.parse(localStorage.getItem("vue_car")) : [];
export default new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        [API.VUEX.ADDTOCART](state, goods) {
            let flag = false;
            state.car.some(item => {
                if (item.id == goods.id) {
                    item.count += goods.count;
                    flag = true;
                    return true
                }
            })
            if (!flag) {
                state.car.push(goods);
            }
            localStorage.setItem('vue_car', JSON.stringify(state.car));
        },
        [API.VUEX.CHANGE](state, goods) {
            state.car.some(item => {
                if (item.id == goods.id) {
                    item.count = goods.count;
                    return true
                }
            })
            localStorage.setItem('vue_car', JSON.stringify(state.car));
        },
        [API.VUEX.SELECTED](state, goods) {
            state.car.some(item => {
                if (item.id == goods.id) {
                    item.selected = goods.selected;
                    return true
                }
            })
            localStorage.setItem('vue_car', JSON.stringify(state.car));
        },
        [API.VUEX.DELETE](state, id) {
            state.car.some((item, index) => {
                if (item.id == id) {
                    state.car.splice(index, 1)
                    return true
                }
            })
            localStorage.setItem('vue_car', JSON.stringify(state.car));
        }

    },
    getters: {
        getAllGoodsCount(state) {
            let counts = 0;
            state.car.forEach(item => {
                counts += item.count;
            });
            return counts
        },
        getGoodsIds(state) {
            let ids = [];
            state.car.forEach(item => {
                ids.push(item.id)
            })
            return ids.join(',')
        },
        getGoodsCount(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            })
            return obj
        },
        getGoodsSelected(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.selected;
            })
            return obj
        },
        getGoodsCountAndAmount(state) {
            let obj = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    obj.count += item.count;
                    obj.amount += item.count * item.price;
                }
            })
            return obj
        }
    }
}) 