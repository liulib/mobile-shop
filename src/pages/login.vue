<template>
  <div class="container">
    <div class="goBack" @click="goBack">
      <van-icon name="arrow-left" />
    </div>
    <!-- 登录表单 -->
    <div class="login" v-if="flag===1">
      <h1>登录</h1>
      <van-form @submit="login">
        <van-field
          v-model="phone"
          type="tel"
          name="手机号"
          placeholder="手机号"
          maxlength="11"
          :rules="[{ required: true,validator: isPhone, message: '请输入正确的手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="密码"
          maxlength="20"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="picCode"
          name="验证码"
          placeholder="验证码"
          maxlength="4"
          :rules="[{ required: true, message: '请填写图片验证码' }]"
        >
          <div slot="button">
            <img src ref="picCode" @click="getPicCode" />
          </div>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :loading="loading">登录</van-button>
        </div>
      </van-form>
      <a class="switch" @click="switchForm(2)">没有账号？点击注册</a>
    </div>
    <!-- 注册表单 -->
    <div class="register" v-if="flag===2">
      <h1>注册</h1>
      <van-form @submit="register">
        <van-field
          v-model="username"
          name="用户名"
          placeholder="用户名"
          maxlength="20"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="phone"
          type="tel"
          name="手机号"
          placeholder="手机号"
          maxlength="11"
          :rules="[{ required: true,validator: isPhone, message: '请输入正确的手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="密码"
          maxlength="20"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="smsCode"
          name="验证码"
          placeholder="验证码"
          maxlength="6"
          :rules="[{  message: '请填写短信验证码' }]"
        >
          <template #button>
            <van-button
              v-if="!messageText"
              native-type="button"
              size="small"
              type="primary"
              @click="getSmsCode"
            >发送验证码</van-button>
            <van-button
              v-else
              native-type="button"
              size="small"
              type="primary"
              :disabled="Boolean(messageText)"
              @click="getSmsCode"
            >{{messageText+'秒后再试'}}</van-button>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :loading="loading">注册</van-button>
        </div>
      </van-form>
      <a class="switch" @click="switchForm(1)">已有账号？去登录</a>
    </div>
  </div>
</template>

<script>
import { isPhoneNumber } from '../utils/utils'
import { mapMutations } from 'vuex'

export default {
  components: {},
  data() {
    return {
      flag: 1,
      username: '',
      phone: '',
      password: '',
      picCode: '',
      smsCode: '',
      loading: false,
      messageText: '',
      countTime: 60
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$nextTick(this.getPicCode)
  },
  methods: {
    // 检测手机号格式
    isPhone(val) {
      return isPhoneNumber(val)
    },
    // 获取图片验证码
    getPicCode() {
      this.$refs.picCode.src = this.$api.users.sendPicCode()
    },
    // 获取短信验证码
    async getSmsCode() {
      try {
        const res = await this.$api.users.sendSMSCode(this.phone)
        if (res.code === 200 || res.code === 4010) {
          this.countTime = 60
          window.alert(`你的验证码为：${res.smsCode}`)
          const timer = setInterval(() => {
            if (this.countTime <= 0) {
              clearInterval(timer)
              this.messageText = ''
              return
            }
            this.messageText = this.countTime--
          }, 1000)
        }
        this.$toast(res.msg)
      } catch (error) {
        this.$toast(error)
      }
    },
    // 切换表单
    switchForm(val) {
      this.flag = val
      if (this.flag === 1) {
        this.$nextTick(this.getPicCode)
      }
    },
    // 登录
    async login() {
      this.loading = true // 加载状态
      const { phone, password, picCode } = this.$data
      try {
        const res = await this.$api.users.login(phone, password, picCode)
        // 200表示登录成功、其他为失败
        if (res.code === 200) {
          // 将token写入到vuex
          this.SET_USER_TOKEN(res.token)
          this.$router.push('/')
        } else {
          this.$toast(res.msg)
          this.loading = false // 重置按钮状态
        }
        this.$toast(res.msg)
        console.log(res)
      } catch (error) {
        this.$toast(error.data.msg)
      }
    },
    // 注册
    async register() {
      this.loading = true // 加载状态
      const { username, phone, password, smsCode } = this.$data
      try {
        const res = await this.$api.users.register(
          username,
          password,
          phone,
          smsCode
        )
        // 200表示注册成功、其他为失败
        if (res.code === 200) {
          // 将token写入到vuex
          this.SET_USER_TOKEN(res.token)
          this.$router.push('/')
        } else {
          this.$toast(res.msg)
          this.loading = false // 重置按钮状态
        }
      } catch (error) {
        this.$toast(error)
        console.log(error)
      }
    },
    goBack() {
      this.$router.push('/')
    },
    ...mapMutations({
      SET_USER_TOKEN: 'SET_USER_TOKEN'
    })
  }
}
</script>
<style lang='less' scoped>
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .goBack {
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #fff;
    position: fixed;
    top: 10px;
    left: 10px;
  }
}
.login,
.register {
  padding: 0 16px;
  width: 80%;
  border-radius: 10px;
  background-color: #fff;
  h1 {
    font-size: 20px;
    padding-left: 15px;
  }
}

.switch {
  display: block;
  text-align: right;
  color: #1989fa;
  margin: 0 16px 16px 0;
}
</style>
