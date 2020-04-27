<template>
  <div>
    <div class="container">
      <!-- 顶部导航 -->
      <Topbar>
        <span slot="title">购物车</span>
      </Topbar>
      <!-- 购物车主体内容 -->
      <div class="shop-cart">
        <!-- 空购物车 -->
        <div class="empty-cart" v-if="!loadingStatus && !shopCartList.length">
          <section class="cart-warpper">
            <van-icon name="cart-o" size="95" />
          </section>
          <section class="desc">{{userToken?'购物车是空的，马上shopping吧~~':'请先登录噢~~'}}</section>
          <section class="login">
            <van-button round type="info" v-if="userToken" to="/">去购物</van-button>
            <van-button round type="info" v-else to="/login">去登录</van-button>
          </section>
        </div>
        <!-- 有商品的购物车 -->
        <div class="shop-cart" v-if="!loadingStatus && shopCartList.length">
          <BScroll class="content-scroll">
            <div class="wrapper-content">
              <div class="list-cart">
                <!-- 统计信息、管理 -->
                <div class="header">
                  <p>共{{shopCartList.length}}件商品</p>
                  <p @click="showManage">{{isShowManage?'完成':'管理'}}</p>
                </div>
                <!-- 商品列表 -->
                <div class="shopList">
                  <ul>
                    <li v-for="(item, index) in shopCartList" :key="index">
                      <van-checkbox v-model="item.checked"></van-checkbox>
                      <div class="goodLeft">
                        <img :src="item.image_path" alt />
                      </div>
                      <div class="goodRight">
                        <p>{{item.goods_name}}</p>
                        <div class="wrapper">
                          <p>￥{{item.present_price}}/件</p>
                          <div class="stepper">
                            <van-stepper v-model="item.buy_count" />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </BScroll>
          <!-- 结算订单 -->
          <van-submit-bar
            v-if="!isShowManage"
            :price="totalPrice"
            button-text="去结算"
            @submit="goConfirmOrder"
          >
            <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
          </van-submit-bar>
          <!-- 删除购物车商品 -->
          <van-submit-bar v-else :price="0" label="删除" button-text="删除" @submit="_delCartGoods">
            <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
          </van-submit-bar>
        </div>
        <loading :loadingStatus="loadingStatus" />
      </div>
    </div>
    <!-- Tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import Topbar from '../components/Topbar.vue'
import BScroll from '../components/BetterScroll.vue'
import { GoodsMixin } from '@/mixins/goodsMixin'

export default {
  components: {
    Tabbar,
    Topbar,
    BScroll
  },
  mixins: [GoodsMixin],
  data() {
    return {
      result: [],
      checked: false,
      shopCartList: [],
      value: 1,
      isShowManage: false // 控制是否显示管理页面
    }
  },
  computed: {
    // 计算总价格
    totalPrice() {
      let totalPrice = 0
      this.shopCartList.forEach(item => {
        if (item.checked) {
          totalPrice += item.present_price * 100 * item.buy_count
        }
      })
      return totalPrice
    },
    // 计算选中商品数，判断是否已经全选
    totalChecked() {
      let totalChecked = 0
      this.shopCartList.forEach(item => {
        if (item.checked) {
          totalChecked += 1
        }
      })
      return totalChecked
    }
  },
  watch: {
    // 判断是否全选
    totalChecked(newValue) {
      if (newValue === this.shopCartList.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  methods: {
    // 转到结算界面
    goConfirmOrder() {
      const goods = this.getCheckGood()
      if (goods.length !== 0) {
        this.SET_CONFIRM_ORDER_INFO(goods)
        this.$router.push('ConfirmOrder')
      } else {
        this.$toast('未选中商品')
      }
    },
    // 获取已经选中的商品
    getCheckGood() {
      return this.shopCartList.filter(val => val.checked === true)
    },
    // 全选与取消逻辑，通过遍历数组实现
    checkAll() {
      const cache = !this.checked
      this.shopCartList.forEach(item => {
        item.checked = cache
      })
    },
    // 获取购物车信息
    async _getCartInfo() {
      try {
        const res = await this.$api.users.getCartInfo()
        if (res.code === 200) {
          this.shopCartList = res.shopCartList
          this.loadingStatus = false
        }
      } catch (error) {
        this.loadingStatus = false
        this.$toast(error.msg)
      }
    },
    // 删除购物车商品
    async _delCartGoods() {
      const delGoodsIds = this.getCheckGood().map(val => val.goodsId)
      try {
        const res = await this.$api.users.delCartGoods(delGoodsIds)
        if (res.code === 200) {
          this.$toast(res.msg)
          this._getCartInfo()
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 管理页面切换
    showManage() {
      this.isShowManage = !this.isShowManage
    }
  },
  created() {
    if (this.userToken) {
      this._getCartInfo()
    }
  }
}
</script>
<style lang='less' scoped>
.shop-cart {
  position: fixed;
  left: 0;
  right: 0;
  top: 38px;
  bottom: 90px;
  .content-scroll {
    height: 100%;
    overflow: hidden;
  }
}
.empty-cart {
  padding-top: 40px;
  .cart-warpper {
    position: relative;
    width: 136px;
    height: 136px;
    background-color: #eee;
    border-radius: 50%;
    margin: 0 auto;
    .van-icon-cart-o {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: red;
    }
  }
  .desc {
    margin: 30px 0;
    text-align: center;
    color: #666;
  }
  .login {
    display: flex;
    justify-content: center;
  }
}
.header {
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.shopList {
  li {
    display: flex;
    padding: 2px;
    .goodLeft {
      margin: 0 5px;
      img {
        width: 92px;
        height: 92px;
        box-shadow: 0 2px 2px #f0f1f2;
      }
    }
    .goodRight {
      width: 180px;
      margin: 0 5px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      p {
        margin: 0;
        font-size: 14px;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
      }
      .stepper {
        display: flex;
        align-items: center;
      }
    }
  }
}
.van-submit-bar {
  bottom: 50px;
  .van-submit-bar__bar {
    padding: 0 2px;
  }
}
</style>
