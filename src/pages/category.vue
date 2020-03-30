<template>
  <div>
    <!-- 主体内容 -->
    <div class="container">
      <!-- 顶部导航 -->
      <Topbar>
        <span slot="title">商品分类</span>
      </Topbar>
      <van-row>
        <!-- 侧边导航 -->
        <van-col span="6">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
          </van-sidebar>
        </van-col>
        <!-- 子导航 -->
        <van-col offset="1" span="17">
          <van-tabs v-model="active">
            <van-tab title="标签 1">内容 1</van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
          </van-tabs>
        </van-col>
      </van-row>
    </div>

    <!-- Tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import Topbar from '../components/Topbar.vue'

export default {
  components: {
    Tabbar,
    Topbar
  },
  data() {
    return {
      activeKey: '',
      active: ''
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='less' scoped>
van-row {
  width: 100%;
}
</style>
