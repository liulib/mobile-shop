<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar>
      <span slot="title">地址管理</span>
    </Topbar>
    <!-- 地址列表 -->
    <div class="addressList" v-if="addressList.length">
      <van-address-list
        default-tag-text="默认"
        v-model="chosenAddressId"
        :list="addressList"
        @edit="editAddress"
        @select="selectAddress"
        @add="$router.push({ name: 'AddressEdit' })"
      />
    </div>
    <!-- 没有地址 -->
    <div class="emptyAddress" v-else>暂无收货地址噢</div>
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import { mapMutations } from 'vuex'

export default {
  components: { Topbar },
  data() {
    return {
      chosenAddressId: '',
      addressList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取地址列表
    async _getAddressList() {
      try {
        const res = await this.$api.users.getAddressList()
        if (res.code === 200) {
          let defAddress
          // 因为vant的van-address-list组件需要数组有id这个属性
          // 而我们的api返回的数据是没有的，所以做一下处理
          this.addressList = res.addressList.reverse()
          for (let i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].isDefault) {
              defAddress = this.addressList[i]
              defAddress.id = '0'
              this.addressList.splice(i, 1) // 删除它
              this.addressList.unshift(defAddress) // 将元素添加到数组的开头
            } else {
              this.addressList[i].id = String(i + 1)
            }
          }
          this.loadingStatus = false
        }
      } catch (error) {
        this.$toast(error.msg)
      }
    },
    // 设置默认地址
    async _setDefAddress(addressId) {
      try {
        const res = await this.$api.users.setDefAddress(addressId)
        if (res.code === 200) {
          this.$toast(res.msg)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$router.push({ name: 'Login' })
        }
      }
    },
    // 编辑地址
    editAddress(item, index) {
      this.SET_ADDRESS_INFO(item)
      this.$router.push('AddressEdit')
    },
    // 选中地址
    selectAddress(item) {
      this._setDefAddress(item._id)
      setTimeout(() => {
        this.$router.back()
      }, 1000)
    },
    ...mapMutations({
      SET_ADDRESS_INFO: 'SET_ADDRESS_INFO'
    })
  },
  created() {
    this._getAddressList()
  }
}
</script>
<style lang='less' scoped>
.emptyAddress {
  margin: 20px 0;
  text-align: center;
}
</style>
