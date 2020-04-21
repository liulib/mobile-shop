<template>
  <div class="loading-container" v-if="loadingStatus">
    <van-loading type="spinner" />
  </div>
</template>

<script>
export default {
  components: {},
  props: { loadingStatus: { type: Boolean, default: false } },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang='less' scoped>
.loading-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 9999;
  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
