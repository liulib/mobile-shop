<template>
  <div>
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">我的收藏</span>
    </Topbar>
    <!-- 收藏商品列表 -->
    <div class="collectionList">
      <BScroll class="content-scroll">
        <div class="wrapper-content">
          <van-card
            v-for="(item,index) in collectionList"
            :key="index"
            :price="item.present_price"
            :title="item.goods_name"
            :thumb="item.image_path"
            @click.stop="goGoodsDetail(item.goodsId)"
          >
            <template #footer>
              <van-button size="mini" @click.stop="_cancleCollection(item.goodsId,index)">取消</van-button>
            </template>
          </van-card>
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
    return { collectionList: [] }
  },
  computed: {},
  watch: {},
  methods: {
    //   获取收藏列表
    async _getCollectionList() {
      try {
        const res = await this.$api.users.getCollectionList()
        if (res.code === 200) {
          this.collectionList = res.collectionList
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 取消收藏
    async _cancleCollection(goodsId, index) {
      try {
        const res = await this.$api.users.collectionHandle(goodsId, 0)
        console.log(res)
        if (res.code === 200) {
          this.$toast(res.msg)
          this.collectionList.splice(index, 1)
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 跳转到商品详情页
    goGoodsDetail(goodsId) {
      this.$router.push({ name: 'GoodsDetail', query: { goodsId: goodsId } })
    }
  },
  created() {
    this._getCollectionList()
  }
}
</script>
<style lang='less' scoped>
.collectionList {
  position: fixed;
  top: 38px;
  bottom: 0;
  left: 0;
  right: 0;
  .content-scroll {
    height: 100%;
    overflow: hidden;
  }
}
</style>
