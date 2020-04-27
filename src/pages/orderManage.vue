<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">订单管理</span>
    </Topbar>
    <!-- 订单分类导航 -->
    <van-tabs v-model="active" sticky>
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <!-- 商品列表 -->
    <div class="ordersList" v-if="orderList.length">
      <BScroll class="content-scroll">
        <div class="wrapper-content">
          <div class="orderInfo" v-for="(item,index) in currentOrderList" :key="index">
            <div class="orderNum">
              <p>
                订单编号：
                <span style="color:red">{{item.order_id}}</span>
              </p>
            </div>
            <van-card
              :num="item.buy_count"
              :price="item.present_price"
              :title="item.goods_name"
              :thumb="item.image_path"
              v-for="(item,index) in item.order_list"
              :key="index"
            />
            <div class="orderDetail">
              <p>共{{item.order_list.length}}件商品</p>
              <p>
                创建时间：
                <span style="color:red">{{item.createAt}}</span>
              </p>
              <p>
                收货地址：
                <span>{{item.address}}</span>
              </p>
            </div>
          </div>
        </div>
      </BScroll>
    </div>
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import BScroll from '../components/BetterScroll.vue'

export default {
  components: { Topbar, BScroll },
  data() {
    return { active: 0, orderList: [] }
  },
  computed: {
    // 计算当前分类下订单，，，
    // 没有分类接口 就这样模拟下
    currentOrderList() {
      let tmp = []
      if (this.active) {
        tmp = this.orderList.filter(item => item.status === this.active)
      } else {
        tmp = this.orderList
      }
      return tmp
    }
  },
  watch: {},
  methods: {
    //   获取订单列表
    async _getOrdersList() {
      try {
        const res = await this.$api.users.getOrdersList()
        if (res.code === 200) {
          this.orderList = res.orderList
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    }
  },
  created() {
    this._getOrdersList()
  }
}
</script>
<style lang='less' scoped>
.container {
  background-color: #eee;
}
.ordersList {
  position: fixed;
  left: 0;
  right: 0;
  top: 82px;
  bottom: 0;
  .content-scroll {
    height: 100%;
    overflow: hidden;
  }
  .orderInfo {
    background-color: #fff;
    font-size: 12px;
    color: #333;
    border: 1px #eee solid;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    .orderDetail {
      text-align: right;
      p {
        margin: 5px 0;
      }
    }
    p {
      margin: 0;
    }
  }
}
</style>
