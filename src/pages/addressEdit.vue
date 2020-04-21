<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">编辑地址</span>
    </Topbar>
    <!-- 编辑地址，使用van-address-edit组件 -->
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      show-set-default
      :is-saving="isSaving"
      :is-deleting="isDeleting"
      @save="_saveAddress"
      @delete="_delAddress"
    />
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import store from '../store'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      areaList: require('@/assets/area').default,
      searchResult: [],
      addressInfo: {},
      isSaving: false,
      isDeleting: false,
      userToken: ''
    }
  },
  components: { Topbar },
  methods: {
    // 保存修改后的地址
    async _saveAddress(content) {
      if (!this.userToken) {
        this.$router.push('Login')
      }
      console.log('我在继续执行')
      this.isSaving = true
      try {
        const data = {
          name: content.name, // 收货人姓名
          tel: content.tel, // 收货人电话
          province: content.province, // 省份
          city: content.city, // 城市
          county: content.county, // 区县
          addressDetail: content.addressDetail, // 详细地址
          areaCode: content.areaCode, // 地区编码
          isDefault: content.isDefault, // 是否为默认地址
          address:
            content.province +
            content.city +
            content.county +
            content.addressDetail,
          // 判断是新增还是修改
          // 新增的键数量和传进来的不一样
          addressId: Object.keys(this.addressInfo).length
            ? this.addressInfo._id
            : undefined
        }

        const res = await this.$api.users.editAddress(data)
        if (res.code === 200) {
          this.isSaving = false
          this.$toast(res.msg)
          setTimeout(() => {
            this.$router.back()
            // 清除地址信息
            this.DEL_ADDRESS_INFO()
          }, 1000)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$router.push({ name: 'Login' })
        }
      }
    },
    // 删除地址
    async _delAddress(content) {
      this.isDeleting = true
      try {
        const addressId = content._id
        const res = await this.$api.users.delAddress(addressId)
        if (res.code === 200) {
          this.isDeleting = false
          this.$toast(res.msg)
          this.DEL_ADDRESS_INFO()
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        }
      } catch (error) {
        this.isDeleting = false
        if (error.response && error.response.status === 401) {
          this.$router.push({ name: 'Login' })
        }
      }
    },
    ...mapMutations({
      DEL_ADDRESS_INFO: 'DEL_ADDRESS_INFO'
    })
  },
  created() {
    this.addressInfo = store.getters.addressInfo
    this.userToken = store.getters.userToken
  }
}
</script>
<style lang='less' scoped>
</style>
