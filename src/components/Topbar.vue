<template>
  <div>
    <van-nav-bar>
      <template #left v-if="hasBack">
        <van-icon name="arrow-left" size="18" @click="goBack" />
      </template>
      <slot slot="title" name="title"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
import { GoodsMixin } from '@/mixins/goodsMixin'

export default {
  components: {},
  mixins: [GoodsMixin],
  props: {
    hasBack: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.back()
    }
  },
  created() {
    console.log(this.hasBack)
  }
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  height: 36.5px;
  line-height: 36.5px;
  border-bottom: 1px solid #ddd;
}
</style>
