<template>
  <div class="container">
    <!-- 导航栏 -->
    <div class="navbar">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        label="地址"
        @cancel="onCancel"
        @focus="showSearch"
        :show-action="isShowSearch"
      ></van-search>
    </div>
    <!-- 主体商品内容 -->
    <div class="content">
      <!-- 轮播图 -->
      <div class="swipe">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in homeData.slides" :key="index">
            <img v-lazy="image.image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品分类 -->
      <div class="category">
        <van-grid :border="false" :column-num="5">
          <van-grid-item
            v-for="(item, index) in homeData.category"
            :key="index"
            @click="goCategory(item.mallCategoryId)"
          >
            <img :src="item.image" />
            <p>{{item.mallCategoryName}}</p>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 通知栏 -->
      <div class="notice" v-if="homeData.advertesPicture">
        <img :src="homeData.advertesPicture.PICTURE_ADDRESS" />
      </div>
      <!-- 商品推荐 recGoodsList -->
      <div class="recGoodsList">
        <h2>商品推荐</h2>
        <van-swipe :loop="false" :width="105.5" :show-indicators="false" touchable autoplay="3000">
          <van-swipe-item :key="index" v-for="(item,index) in homeData.recommend">
            <div class="recommend-item">
              <img v-lazy="item.image" @click.stop="goGoodsDetail(item.goodsId)" />
              <p class="goodName">{{item.goodsName}}</p>
              <p class="goodPrice">
                <span class="mallPrice">￥{{item.mallPrice}}</span>
                <span class="price">￥{{item.price}}</span>
              </p>
              <div class="check">
                <div class="addCart">
                  <van-icon name="cart-o" @click.stop="_addToCart(item.goodsId)" />
                </div>
                <div class="seeMore" @click.stop="goGoodsDetail(item.goodsId)">
                  <span>查看详情</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- floor 偷个懒不封装成子组件了-->
      <div v-if="homeData.floorName">
        <div class="floor" :key="index" v-for="(item, index) in Object.keys(homeData.floorName)">
          <div class="floorTitle">
            <h2>{{homeData.floorName[item]}}</h2>
          </div>
          <van-row>
            <van-col span="12">
              <div>
                <img
                  :src="homeData[item][0].image"
                  @click.stop="goGoodsDetail(homeData[item][0].goodsId)"
                />
              </div>
            </van-col>
            <van-col span="12">
              <div>
                <img
                  :src="homeData[item][1].image"
                  @click.stop="goGoodsDetail(homeData[item][1].goodsId)"
                />
              </div>
              <div>
                <img
                  :src="homeData[item][2].image"
                  @click.stop="goGoodsDetail(homeData[item][2].goodsId)"
                />
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <div>
                <img
                  :src="homeData[item][3].image"
                  @click.stop="goGoodsDetail(homeData[item][3].goodsId)"
                />
              </div>
            </van-col>
            <van-col span="12">
              <div>
                <img
                  :src="homeData[item][4].image"
                  @click.stop="goGoodsDetail(homeData[item][4].goodsId)"
                />
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="searchResult" v-if="isShowSearch">
      <div class="searchWarp" v-if="!searchResultList.length">
        <div class="searchTitle">
          <span>搜索历史</span>
          <van-icon name="delete" @click.stop="delSearchHistory" />
        </div>
        <div class="historyList">
          <span v-for="(item,index) in searchHistory" :key="index">{{item}}</span>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="searchList" v-else>
        <van-card
          v-for="(item,index) in searchResultList"
          :key="index"
          :price="item.present_price"
          :title="item.name"
          :thumb="item.image_path"
          @click.stop="goGoodsDetail(item.id)"
        ></van-card>
      </div>
    </div>
    <!-- Tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import { mapMutations } from 'vuex'
import store from '../store'
import { throttle } from '../utils/utils'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      value: '',
      homeData: {},
      isShowSearch: false,
      userToken: '',
      searchResultList: [],
      searchHistory: []
    }
  },
  computed: {},
  watch: {
    // value: function(newvalue) {
    //   if (newvalue) {
    //     throttle(this._getSearchResult(newvalue), 5000)
    //   }
    // }
  },
  methods: {
    // 获取首页数据
    async _getHome() {
      try {
        const res = await this.$api.goods.getHomeData()
        if (res.code === 200) {
          this.homeData = res.result
          // 将大分类信息存入vuex
          this.SET_CATEGORY_INFO(JSON.stringify(this.homeData.category))
        }
      } catch (error) {
        this.$toast(error.data.msg)
      }
    },
    // 添加到购物车
    async _addToCart(goodsId) {
      if (this.userToken) {
        try {
          const res = await this.$api.users.addToCart(goodsId)
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
    // 跳转到商品详情页
    goGoodsDetail(goodsId) {
      this.$router.push({ name: 'GoodsDetail', query: { goodsId: goodsId } })
    },
    // 跳转到分类页
    goCategory(mallCategoryId) {
      this.$router.push({
        name: 'Category',
        query: { mallCategoryId }
      })
    },
    // 显示搜索结果页面
    showSearch() {
      this.isShowSearch = true
    },
    // 取消显示搜索结果页面
    onCancel() {
      this.isShowSearch = false
      setTimeout(() => {
        this.value = ''
        this.searchResultList = []
        this.searchHistory = store.getters.searchHistory
      }, 300)
    },
    // 获取搜索结果
    async _getSearchResult(value) {
      try {
        const res = await this.$api.operations.search(value)
        console.log(this.searchHistory)
        if (res.code === 200) {
          this.searchResultList = res.result.goodsList
          // 添加到搜索历史中
          if (
            !this.searchHistory.some(item => {
              if (item === value) {
                return true
              }
            })
          ) {
            setTimeout(() => {
              this.SET_SEARCH_HISTORY(this.searchHistory.concat([value]))
            }, 500)
          }
        }
        this.searchHistory = store.getters.searchHistory
      } catch (error) {
        console.log(error)
      }
    },
    // 删除搜索历史
    delSearchHistory() {
      this.DEL_SEARCH_HISTORY()
      this.searchHistory = store.getters.searchHistory
    },
    ...mapMutations({
      SET_CATEGORY_INFO: 'SET_CATEGORY_INFO',
      SET_SEARCH_HISTORY: 'SET_SEARCH_HISTORY',
      DEL_SEARCH_HISTORY: 'DEL_SEARCH_HISTORY'
    })
  },
  created() {
    this._getHome()
    this.unWatch = this.$watch(
      'value',
      throttle(() => {
        if (this.value) {
          this._getSearchResult(this.value)
        }
      }, 2000)
    )
    this.userToken = store.getters.userToken
    this.searchHistory = store.getters.searchHistory
  },
  destroyed() {
    // 注销 watch
    this.unWatch()
  }
}
</script>
<style lang='less' scoped>
.container {
  background-color: #eeeeee;
  .navbar {
    .van-search {
      padding: 5px;
    }
  }
}
.content {
  &:after {
    content: '';
    display: block;
    height: 50px;
  }
  .swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .category {
    img {
      width: 35px;
      height: 35px;
    }
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  .notice {
    padding: 10px 0;
    img {
      width: 100%;
    }
  }
  .recGoodsList {
    background-color: #fff;
    h2 {
      margin: 0;
      color: #b532e9;
      font-size: 16px;
      padding: 8px 0 8px 16px;
    }
    .van-swipe-item {
      text-align: center;
    }
    .recommend-item {
      border: 1px solid #eee;
      border-collapse: collapse;
      padding: 0 5px;

      img {
        width: 95%;
      }
      p {
        margin: 0;
        font-size: 13px;
      }
      .goodName {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .goodPrice {
        .mallPrice {
          font-weight: bold;
          font-size: 14px;
        }
        .price {
          text-decoration: line-through;
          color: #999;
          margin-left: 5px;
        }
      }
      .check {
        padding: 5px 0;
        color: #fff;
        display: flex;
        justify-content: center;
        .addCart {
          background-color: #feca3a;
          padding: 4px 2px 4px 4px;
          border-radius: 5px 0 0 5px;
        }
        .seeMore {
          background-color: #b532e9;
          padding: 4px 4px 4px 2px;
          border-radius: 0 5px 5px 0;
          font-size: 14px;
        }
      }
    }
  }
  .floor {
    background-color: #fff;
    .floorTitle {
      background-color: #ededed;
      h2 {
        margin: 0;
        color: #b532e9;
        font-size: 16px;
        padding: 8px 0;
        text-align: center;
      }
    }
    img {
      width: 100%;
    }
  }
}
.searchResult {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: #fff;
  .searchWarp {
    padding: 10px;
    font-size: 14px;
    .searchTitle {
      display: flex;
      justify-content: space-between;
    }
    .historyList {
      padding: 14px 5px 0 5px;
      span {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        background-color: #eee;
        border-radius: 10px;
      }
    }
  }
}
</style>
