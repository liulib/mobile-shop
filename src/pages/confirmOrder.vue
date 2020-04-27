<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar hasBack>
      <span slot="title">确认订单</span>
    </Topbar>
    <!-- 选择地址 -->
    <div class="address">
      <!-- 默认地址显示 -->
      <div
        class="addressList"
        v-if="defAddress._id"
        @click="$router.push({ name: 'AddressManage' })"
      >
        <van-icon name="location" />
        <div class="address-text">
          <p>
            <span>收货人:{{defAddress.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>电话:{{defAddress.tel}}</span>
          </p>
          <p>
            <span>地址:{{defAddress.address}}</span>
          </p>
          <p>
            <span>(收货不便时,可选择免费待收货服务)</span>
          </p>
        </div>
        <van-icon name="arrow" />
      </div>
      <!-- 没有地址显示 -->
      <div class="addAddress" v-else @click="$router.push({ name: 'AddressManage' })">
        <van-icon name="add-o" />
        <span>点击添加收货地址</span>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="shopList" v-if="confirmOrders.length">
      <BScroll class="content-scroll">
        <div class="wrapper-content">
          <van-card
            v-for="(item, index) in confirmOrders"
            :key="index"
            :num="item.buy_count"
            :price="item.present_price"
            :title="item.goods_name"
            :thumb="item.image_path"
          />
        </div>
      </BScroll>
    </div>
    <div class="confirm">
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="_submitOrder" />
    </div>
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import BScroll from '../components/BetterScroll.vue'
import { GoodsMixin } from '@/mixins/goodsMixin'

export default {
  components: { Topbar, BScroll },
  mixins: [GoodsMixin],
  data() {
    return { confirmOrders: [], addressList: [], defAddress: {} }
  },
  computed: {
    // 计算总价格
    totalPrice() {
      let totalPrice = 0
      this.confirmOrders.forEach(item => {
        if (item.checked) {
          totalPrice += item.present_price * 100 * item.buy_count
        }
      })
      return totalPrice
    }
  },
  watch: {},
  methods: {
    // 提交订单
    async _submitOrder() {
      if (!this.defAddress._id) {
        this.$toast('请添加收货地址')
        return
      }
      try {
        const goodsId = this.confirmOrders.map(item => item.goodsId)
        const orderInfo = {
          goodsIds: goodsId,
          tel: this.defAddress.tel,
          address: this.defAddress.address
        }
        const res = await this.$api.users.submitOrder(orderInfo)
        if (res.code === 200) {
          this.$toast(res.msg)
          this.SET_CONFIRM_ORDER_INFO([])
          setTimeout(() => this.$router.push('/'), 2000)
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 获取默认收货地址
    async _getDefAddress() {
      try {
        const res = await this.$api.users.getDefAddress()
        if (res.code !== 200) {
          this.$toast(res.msg)
        } else {
          this.defAddress = res.defAddress
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    }
  },
  created() {
    console.log(this.confirmOrderInfo)
    this.confirmOrders = this.confirmOrderInfo
  },
  // 使用守卫导航判断是否进入到提交订单界面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._getDefAddress()
      if (!vm.confirmOrders.length) vm.$router.push({ name: 'Cart' })
    })
  }
}
</script>
<style lang='less' scoped>
.address {
  height: 64px;
  padding: 16px;
  border-bottom: 1px solid #eee;
  .addAddress {
    text-align: center;
    line-height: 64px;
    font-size: 14px;
  }
  .addressList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .address-text {
      p {
        margin: 5px 0;
        font-size: 14px;
      }
    }
  }
}
.shopList {
  position: fixed;
  left: 0;
  right: 0;
  top: 135px;
  bottom: 50px;
  .content-scroll {
    height: 100%;
    overflow: hidden;
  }
}
</style>
