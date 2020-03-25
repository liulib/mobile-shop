<template>
  <div>
    <div class="tabbar">
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="cart">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="manager">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang='less' scoped>
</style>
