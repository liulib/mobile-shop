<template>
  <div>
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">浏览历史</span>
    </Topbar>
    <!-- 浏览历史商品 -->
    <van-card
      v-for="(item,index) in browseHistoryList"
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
</template>

<script>
import Topbar from '../components/Topbar.vue'
import store from '../store'
import { mapMutations } from 'vuex'

export default {
  components: { Topbar },
  data() {
    return { browseHistoryList: [] }
  },
  computed: {},
  watch: {},
  methods: {
    //  删除浏览历史
    delBrowseHistory(index) {
      const tmp = this.browseHistoryList.slice()
      tmp.splice(index, 1)
      this.SET_BROWSE_HISTORY(tmp)
      this.browseHistoryList = store.getters.browseHistory
    },
    ...mapMutations({
      SET_BROWSE_HISTORY: 'SET_BROWSE_HISTORY'
    })
  },
  created() {
    this.browseHistoryList = store.getters.browseHistory
  }
}
</script>
<style lang='less' scoped>
</style>
