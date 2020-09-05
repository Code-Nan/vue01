<!--
 * @Author: dongnan
 * @Descripttion: 
 * @Date: 2020-09-04 17:12:30
-->
<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <img :src="item.imgurl" :class="{'full':isFull}"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
      name: "",
      props:["lunboList","isFull"],
      data () {
          return {
              
          }
      },
      created () {

      },
      methods: {

      },
      components: {

      }
    }
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
    text-align: center;
    .mint-swipe-item {
        img {
            // width: 100%;
            height: 100%;
        }
    }
} 
.full{
    width: 100%;
}
</style>
