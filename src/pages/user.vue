<template>
  <div>
    <!-- 主体内容 -->
    <div class="container">
      <!-- 顶部导航 -->
      <Topbar>
        <span slot="title">个人中心</span>
      </Topbar>
      <!-- 用户信息 -->
      <div class="user-info" v-if="!userInfo">
        <img
          class="user-poster"
          src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"
          alt="用户信息"
        />
        <p @click="$router.push({ name: 'Login' })">注册/登录</p>
      </div>
      <div class="user-info" v-else>
        <img class="avatar" :src="userInfo.avatar" />
        <p class="use-name">欢迎您：{{userInfo.userName}}</p>
        <p @click="logout">退出登录</p>
      </div>
      <!-- 订单管理 -->
      <div class="order-info">
        <van-row @click="goOrderManage('0')">
          <van-col span="8">
            <span>订单管理</span>
          </van-col>
          <van-col span="12"></van-col>
          <van-col span="4">
            <van-icon class="icon" name="arrow" />
          </van-col>
        </van-row>
        <hr />
        <van-row>
          <van-col span="5">
            <van-icon
              name="pending-payment"
              size="20.8"
              :badge="orderNum[0]||''"
              @click="goOrderManage('1')"
            />
            <p>待付款</p>
          </van-col>
          <van-col span="5">
            <van-icon
              name="tosend"
              size="20.8"
              :badge="orderNum[1]||''"
              @click="goOrderManage('2')"
            />
            <p>待发货</p>
          </van-col>
          <van-col span="5">
            <van-icon
              name="logistics"
              size="20.8"
              :badge="orderNum[2]||''"
              @click="goOrderManage('3')"
            />
            <p>待收货</p>
          </van-col>
          <van-col span="5">
            <van-icon
              name="completed"
              size="20.8"
              :badge="orderNum[3]||''"
              @click="goOrderManage('4')"
            />
            <p>已完成</p>
          </van-col>
          <van-col span="4">
            <van-icon
              name="like-o"
              size="20.8"
              :badge="orderNum[4]||''"
              @click="goOrderManage('5')"
            />
            <p>评价</p>
          </van-col>
        </van-row>
      </div>
      <!-- 其他操作 -->
      <div class="other-entry">
        <van-cell-group>
          <van-cell title="收藏商品" icon="star-o" is-link to="Collection" />
          <van-cell title="地址管理" icon="location-o" is-link to="AddressManage" />
          <van-cell title="最近浏览" icon="browsing-history-o" is-link to="BrowseHistory" />
        </van-cell-group>
      </div>
    </div>

    <!-- Tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import Topbar from '../components/Topbar.vue'

import { mapMutations } from 'vuex'

export default {
  components: {
    Tabbar,
    Topbar
  },
  inject: ['reload'],
  data() {
    return {
      userInfo: null,
      orderNum: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取用户信息
    async _getUserInfo() {
      try {
        const res = await this.$api.users.getUserInfo()
        if (res.code === 200) {
          this.userInfo = res.userInfo
        } else {
          this.$toast(res.msg)
          console.log(res.msg)
        }
      } catch (error) {
        this.$toast(error.data.msg)
      }
    },
    // 获取用户订单数量信息
    async _getUserOrderNum() {
      try {
        const res = await this.$api.users.getUserOrderNum()
        if (res.code === 200) {
          this.orderNum = res.orderNum
        }
      } catch (error) {
        this.$toast(error.data.msg)
      }
    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您确定退出账号吗？',
          confirmButtonText: '确定',
          confirmButtonColor: '#b532e9'
        })
        .then(() => {
          // 删除token信息，并跳转到登录页面
          this.DEL_USER_TOKEN()
          this.$toast('已退出登录')
          this.$router.push('login')
        })
        .catch(() => {
          // on cancel
        })
    }, // 去订单管理界面
    goOrderManage(status) {
      this.$router.push({ name: 'OrderManage', query: { status } })
    },
    ...mapMutations(['DEL_USER_TOKEN'])
  },
  created() {
    this._getUserInfo()
    this._getUserOrderNum()
  },
  mounted() {}
}
</script>
<style lang='less' scoped>
.container {
  padding: 0 0 50px 0;
}
.user-info {
  width: 100%;
  background-color: #1989fa;
  text-align: center;
  padding: 10% 0 19% 0;
  img {
    width: 54.6px;
    height: 54.6px;
    border-radius: 50%;
  }
  p {
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
  }
}

.order-info {
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  box-shadow: 3px 4px 20px rgba(25, 137, 250, 0.3);
  padding: 10px 0;
  position: relative;
  bottom: 50px;
  z-index: 1000;
  background-color: #fff;
  font-size: 14px;
  .van-row:nth-child(1) {
    font-weight: bold;
  }
  .van-row:nth-child(2) {
    color: #eee;
  }
  .van-row:nth-child(3) {
    font-size: 12px;
    padding-top: 5px;
    p {
      margin: 5px 0 0 0;
    }
    // .van-icon {
    //   display: block;
    //   margin-bottom: 4px;
    //   font-size: 24px;
    // }
  }
}
</style>
