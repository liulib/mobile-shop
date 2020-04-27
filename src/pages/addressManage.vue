<template>
  <div class="container">
    <!-- 顶部导航 -->
    <Topbar hasBack>
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
      <loading :loadingStatus="loadingStatus" />
    </div>
    <!-- 没有地址 -->
    <div class="emptyAddress" v-if="!loadingStatus && !addressList.length">暂无收货地址噢~~</div>
    <!-- 没有地址时候的底部新增按钮 -->
    <div
      class="add-address"
      v-if="!loadingStatus && !addressList.length"
      @click="$router.push({ name: 'AddressEdit' })"
    >新增地址</div>
  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import { GoodsMixin } from '@/mixins/goodsMixin'

export default {
  components: { Topbar },
  mixins: [GoodsMixin],
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
          // 反转下数组，将最新的放到前面
          this.addressList = res.addressList.reverse()
          // 循环数组，为其添加id属性
          for (let i = 0; i < this.addressList.length; i++) {
            // 如果是默认地址，则给他id为0
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
        this.loadingStatus = false
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
    }
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
.add-address {
  background-color: #ee0a24;
  color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
