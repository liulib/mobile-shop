<template>
  <div>
    <!-- 顶部导航 -->
    <Topbar hasBack>
      <span slot="title">浏览历史</span>
    </Topbar>
    <!-- 浏览历史商品 -->
    <div class="browseHistoryList">
      <BScroll class="content-scroll">
        <div class="wrapper-content">
          <van-card
            v-for="(item,index) in reverseData"
            :key="index"
            :price="item.present_price"
            :title="item.name"
            :thumb="item.image_path"
            @click.stop="goGoodsDetail(item.goodsId)"
          >
            <template #footer>
              <van-button size="mini" @click.stop="delBrowseHistory(index)">删除</van-button>
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
import { GoodsMixin } from '@/mixins/goodsMixin'

export default {
  components: { Topbar, BScroll },
  mixins: [GoodsMixin],
  data() {
    return {}
  },
  computed: {
    reverseData() {
      const tmp = this.browseHistory.slice()
      return tmp.reverse()
    }
  },
  watch: {},
  methods: {
    //  删除浏览历史
    delBrowseHistory(index) {
      const tmp = this.browseHistory.slice()
      tmp.splice(index, 1)
      this.SET_BROWSE_HISTORY(tmp)
    }
  },
  created() {}
}
</script>
<style lang='less' scoped>
.browseHistoryList {
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
