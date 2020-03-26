<template>
  <div>
    <!-- 导航栏 -->
    <div class="navbar">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" label="地址" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in swipe_images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="category">
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="(image, index) in category_images"
          :key="index"
          icon="photo-o"
          text="文字"
        >
          <!-- <img :src="image.img" />
          <span>{{ image.name }}</span>-->
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 通知栏 -->
    <div class="notice">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">通知内容</van-notice-bar>
    </div>
    <!-- shopList -->
    <div class="shoplist">
      <van-panel title="推荐商品">
        <van-grid :border="false" :column-num="3" square>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- Tabbar -->
    <l-tabbar></l-tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'

export default {
  components: {
    'l-tabbar': Tabbar
  },
  data() {
    return {
      value: '',
      homeData: {},
      swipe_images: [
        'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg',
        'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg',
        'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'
      ],
      category_images: [
        {
          name: 'text',
          img:
            'http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png'
        },
        {
          name: 'text',
          img:
            'http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png'
        },
        {
          name: 'text',
          img:
            'http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png'
        },
        {
          name: 'text',
          img:
            'http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png'
        },
        {
          name: 'text',
          img:
            'http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    async _getHome() {
      const res = await this.$api.goods.getHomeData()
      if (res.code === 200) {
        this.homeData = res.result
        // this.loadingStatus = false
      }
    },
    onSearch: () => console.log('hhhhhhh')
  },
  created() {
    this._getHome()
  }
}
</script>
<style lang='less' scoped>
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
}
</style>
