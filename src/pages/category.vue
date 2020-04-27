<template>
  <div>
    <!-- 主体内容 -->
    <div class="container">
      <!-- 顶部导航 -->
      <Topbar>
        <span slot="title">商品分类</span>
      </Topbar>
      <div class="content">
        <!-- 侧边导航 -->
        <div class="left">
          <van-sidebar v-model="activeKey" @change="switchSidebar">
            <van-sidebar-item
              v-for="(item, index) in categoryInfo"
              :key="index"
              :title="item.mallCategoryName"
            />
          </van-sidebar>
        </div>
        <div class="right">
          <!-- 子导航 -->
          <van-tabs v-model="active" @click="categorySubClick">
            <van-tab
              v-for="(item, index) in categorySubInfo"
              :key="index"
              :title="item.mallSubName"
            ></van-tab>
          </van-tabs>
          <!-- 商品信息 -->
          <div class="wrapper-container" v-if="goodsList.length">
            <BScroll class="content-scroll">
              <div class="wrapper-content">
                <van-card
                  v-for="(item, index) in goodsList"
                  :key="index"
                  :origin-price="item.orl_price"
                  :price="item.present_price"
                  :title="item.name"
                  :thumb="item.image"
                  @click="goGoodDetail(item.id)"
                />
              </div>
            </BScroll>
          </div>
        </div>
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
import { mapMutations } from 'vuex'
import store from '../store'

export default {
  components: {
    Tabbar,
    Topbar,
    BScroll
  },
  data() {
    return {
      activeKey: 0,
      active: 0,
      goodsList: [],
      categoryInfo: [],
      categorySubInfo: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取子分类categorySubId下的商品信息
    async getGoodsList(categorySubId) {
      try {
        const res = await this.$api.goods.getGoodsList(categorySubId)
        if (res.code === 200) {
          this.goodsList = res.result
        }
      } catch (error) {
        this.$toast(error.data.msg)
      }
    },
    // 跳转到商品详情页
    goGoodDetail(goodsId) {
      this.$router.push({ name: 'GoodsDetail', query: { goodsId: goodsId } })
    },
    // 切换侧边导航
    switchSidebar() {
      this.active = 0
      this.categorySubInfo = this.categoryInfo[this.activeKey].bxMallSubDto
      this.getGoodsList(this.categorySubInfo[0].mallSubId)
    },
    // 切换子导航
    categorySubClick() {
      this.getGoodsList(this.categorySubInfo[this.active].mallSubId)
    },
    ...mapMutations({
      SET_CATEGORY_INFO: 'SET_CATEGORY_INFO'
    })
  },
  async created() {
    // 从vuex中获取分类数据，如果没有则重新获取并加入vuex中
    this.categoryInfo = JSON.parse(store.getters.categoryInfo)
    if (!this.categoryInfo) {
      const res = await this.$api.goods.getHomeData()
      if (res.code === 200) {
        this.categoryInfo = res.result.category
        this.SET_CATEGORY_INFO(JSON.stringify(res.result.category))
      } else {
        this.$toast('服务器出错')
      }
    }
    // 如果有参数则是点击首页分类传递过来
    // 不是从首页过来的则默认取第一个分类
    const { mallCategoryId } = this.$route.query
    if (mallCategoryId) {
      this.activeKey = mallCategoryId - 1
      this.categorySubInfo = this.categoryInfo[this.activeKey].bxMallSubDto
      this.getGoodsList(this.categorySubInfo[0].mallSubId)
    } else {
      this.categorySubInfo = this.categoryInfo[0].bxMallSubDto
      this.getGoodsList(this.categorySubInfo[0].mallSubId)
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  overflow: hidden;
}
.content {
  position: fixed;
  left: 0;
  right: 0;
  top: 36.5px;
  bottom: 50px;
  display: flex;
  .right {
    flex: 1;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    .wrapper-container {
      position: relative;
      flex: 1;
      overflow: hidden;
      .content-scroll {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
}
</style>
