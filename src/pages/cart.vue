<template>
  <div>
    <!-- 主体内容 -->
    <div class="container">
      <!-- 顶部导航 -->
      <Topbar>
        <span slot="title">购物车</span>
      </Topbar>
      <!-- 商品列表 -->
      <van-checkbox-group v-model="result">
        <van-checkbox name="a">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-button size="mini">按钮</van-button>
              <van-button size="mini">按钮</van-button>
            </template>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 提交订单 -->
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar>
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
      result: [],
      checked: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit: function() {
      console.log('object')
    },
    onClickEditAddress: function() {
      console.log('object')
    }
  }
}
</script>
<style lang='less' scoped>
.van-card {
  width: 100%;
}
.van-submit-bar {
  bottom: 50px;
}
</style>
