<template>
  <div>
    <van-nav-bar>
      <slot slot="left" name="left"></slot>
      <slot slot="title" name="title"></slot>
      <slot slot="right" name="right"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  height: 36.5px;
  line-height: 36.5px;
  border-bottom: 1px solid #ddd;
}
</style>
