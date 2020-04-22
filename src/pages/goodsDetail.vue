<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">商品详情</span>
    </Topbar>
    <!-- 商品图片轮播 -->
    <div class="goodSwipe">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item>
          <img v-lazy="goodsInfo.image" />
        </van-swipe-item>
        <van-swipe-item>
          <img v-lazy="goodsInfo.image" />
        </van-swipe-item>
        <van-swipe-item>
          <img v-lazy="goodsInfo.image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/3</div>
        </template>
      </van-swipe>
    </div>
    <!-- 商品信息 -->
    <div class="goodInfo">
      <p>{{goodsInfo.name}}</p>
      <span>￥{{goodsInfo.present_price}}</span>
    </div>
    <!-- goodExpress 不知道起啥名字，，， -->
    <div class="goodExpress">
      <span>运费：0</span>
      <span>数量：{{goodsInfo.amount}}</span>
      <span>
        收藏：
        <van-icon :name="collectionFlag?'like':'like-o'" @click="_collectionHandle" />
      </span>
    </div>
    <!-- 商品详情和评论 -->
    <div class="goodTab">
      <div>
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div class="goodDetail" v-html="goodsInfo.detail"></div>
          </van-tab>
          <van-tab title="商品评论">
            <div class="goodComment">
              <div v-if="!commentList.length">该商品暂无评论噢~~</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 商品导航 -->
    <div class="goodAction">
      <van-goods-action>
        <van-goods-action-icon icon="wap-home-o" to="/" text="首页" />
        <van-goods-action-icon icon="cart-o" to="/cart" text="购物车" />
        <van-goods-action-button type="warning" text="加入购物车" @click="_addToCart" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import store from '../store'

export default {
  props: ['goodsId'],
  components: { Topbar },
  data() {
    return {
      current: 0,
      active: 0,
      goodsInfo: {},
      commentList: [], // 没有接口 暂时先不写了
      userToken: '',
      collectionFlag: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取商品信息
    async _getGoodsDetail() {
      try {
        const res = await this.$api.goods.getGoodsDetail(this.goodsId)
        if (res.code === 200) {
          this.goodsInfo = res.result
        }
      } catch (error) {
        this.$toast(error.message)
        console.log(error)
      }
    },
    // 添加到购物车
    async _addToCart() {
      if (this.userToken) {
        try {
          const res = await this.$api.users.addToCart(this.goodsId)
          this.$toast(res.msg)
        } catch (error) {
          this.$toast(error.message)
          console.log(error)
        }
      } else {
        this.$toast('请先登录')
        this.$router.push('login')
      }
    },
    // 查询是否收藏
    async _queryCollection() {
      try {
        const res = await this.$api.users.queryCollection(this.goodsId)
        if (res.code === 200) {
          this.collectionFlag = res.status
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 商品收藏、取消
    async _collectionHandle() {
      try {
        const res = await this.$api.users.collectionHandle(
          this.goodsId,
          Number(!this.collectionFlag)
        )
        if (res.code === 200) {
          this.$toast(res.msg)
          this.collectionFlag = !this.collectionFlag
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 自定义指示器
    onChange(index) {
      this.current = index
    }
  },
  created() {
    this._getGoodsDetail()
    this._queryCollection()
    this.userToken = store.getters.userToken
  }
}
</script>
<style lang='less' scoped>
.container {
  padding-bottom: 50px;
}
.goodSwipe {
  img {
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
.goodInfo {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
  p {
    margin: 5px 0;
  }
  span {
    color: #b532e9;
  }
}
.goodExpress {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  span {
    text-align: center;
    line-height: 1;
    .van-icon {
      color: #b532e9;
    }
  }
}
</style>
