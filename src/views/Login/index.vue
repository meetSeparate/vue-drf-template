<script setup>
import {ref, reactive} from 'vue'
import {User, Lock} from "@element-plus/icons-vue";
import {useUserStore} from "@/store/moudles/user.js";
import {useRouter, useRoute} from "vue-router"
import Validation from "@/components/Validation/index.vue";
import DarkSwitch from '@/components/DarkSwitch/index.vue'
import {usePermissionStore} from "@/store/moudles/permission.js";
import TypeIt from '@/components/ReTypeit/index.js'
import Motion from '@/components/Motion/index.js'

const router = useRouter()
const route = useRoute()
// 登录或注册
const modelChange = ref(true)
// 登录仓库操作
const userStore = useUserStore()
// 登录表单收集
const loginForm = ref({
  username: 'admin',
  password: '123456',
  validation: false
})
// 注册表单
const signForm = ref({
  username: '',
  password: '',
  rePassword: '',
  validation: false
})
const loginFormRef = ref()
const signFormRef = ref()
// 登录表单验证
const validatestatus = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请拖动滑块完成验证'))
  } else {
    callback()
  }
}
const loginRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 15, message: '密码为6~15个字符', trigger: 'blur'},
  ],

  validation: [
    {validator: validatestatus, trigger: "change"}
  ]
});
// 权限仓库
const permissionStore = usePermissionStore()
// 登录事件
const toLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.onLogin(loginForm.value)
      await permissionStore.getAsyncRoute()
      ElMessage({
        type: 'success',
        message: '登录成功！',
        customClass: 'pure-message'
      })

      if (route.query.redirect) {
        // 如果有重定向
        router.push(route.query.redirect)
      } else {
        router.push({
          name: 'layout'
        })
      }
    } else {
      return false
    }
  })
}
// 注册事件
const toSign = async () => {
  if (!signFormRef.value) return
  await signFormRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.onSign(signForm.value)
      ElMessage({
        type: 'success',
        message: '注册成功！',
        customClass: 'pure-message'
      })
      modelChange.value = true
    } else {
      return false
    }
  })
}

// 滑块验证
const handleLoginSuccess = () => {
  loginForm.value.validation = true
  loginFormRef.value.validateField("validation")
}
const handleSignSuccess = () => {
  signForm.value.validation = true
  signFormRef.value.validateField("validation")
}

</script>

<template>
  <dark-switch/>
  <div class="login-container">
    <div class="img">
      <svg-icon width="500px" height="380px" name="illustration"/>
    </div>

    <div class="login-content">
      <div class="login-form">
        <svg-icon class="avatar" name="avatar"/>
        <div class="login-title">
          <Motion>
            <h2>
              <TypeIt
                :values="['EnyAdmin']"
                :cursor="false"
                :speed="150"
            />
            </h2>
          </Motion>
        </div>

        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            v-show="modelChange"
        >
          <Motion :delay="100">
            <el-form-item prop="username">
              <el-input
                  clearable
                  v-model="loginForm.username"
                  size="large"
                  placeholder="账号"
                  :prefix-icon="User"
              />
            </el-form-item>
          </Motion>
          <Motion :delay="150">
            <el-form-item
                prop="password">
              <el-input
                  clearable
                  type="password"
                  size="large"
                  v-model="loginForm.password"
                  placeholder="密码"
                  :prefix-icon="Lock"
                  show-password
              />
            </el-form-item>
          </Motion>
          <Motion :delay="200">
            <el-form-item prop="validation">
              <validation @success="handleLoginSuccess"/>
            </el-form-item>
          </Motion>
          <Motion :delay="250">
            <el-form-item style="margin-bottom: 5px">
              <el-button style="width: 100%" type="primary" @click="toLogin">登录</el-button>
            </el-form-item>
          </Motion>
          <Motion :delay="300">
            <div class="tip">
              <span @click="modelChange=false">注册帐号</span>
            </div>
          </Motion>
        </el-form>

        <el-form
            ref="signFormRef"
            :model="signForm"
            :rules="loginRules"
            v-show="!modelChange"
        >
          <el-form-item prop="username">
            <el-input
                clearable
                v-model="signForm.username"
                size="large"
                placeholder="账号"
                :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item
              prop="password">
            <el-input
                clearable
                type="password"
                size="large"
                v-model="signForm.password"
                placeholder="密码"
                :prefix-icon="Lock"
                show-password
            />
          </el-form-item>
          <el-form-item
              prop="password">
            <el-input
                clearable
                type="password"
                size="large"
                v-model="signForm.rePassword"
                placeholder="重复密码"
                :prefix-icon="Lock"
                show-password
            />
          </el-form-item>
          <el-form-item prop="validation">
            <validation @success="handleSignSuccess"/>
          </el-form-item>
          <el-form-item style="margin-bottom: 5px">
            <el-button style="width: 100%" type="primary" @click="toSign">注册</el-button>
          </el-form-item>
          <div class="tip">
            <span @click="modelChange=true">登录</span>
          </div>
        </el-form>

      </div>
    </div>

  </div>


</template>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/icons/bg.png") no-repeat;
  background-size: cover;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;

  .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-content {
    display: flex;
    align-items: center;
    text-align: center;

    .login-form {
      width: 360px;

      .avatar {
        width: 360px;
        height: 80px;
      }

      .login-title {
        transform: translateZ(0px);
        opacity: 1;

        h2 {
          text-transform: uppercase;
          margin: 15px 0;
          color: #999;
          font: bold 200% Consolas, Monaco, monospace;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
      }
    }
  }
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.switch {
  position: absolute;
  right: 20px;
  top: 10px;
}

.tip {
  text-align: left;

  span {
    font-size: 14px;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}

@media screen and (max-width: 700px){
  .login-container {
    background: none;
    grid-template-columns: 1fr;
    .img {
      display: none;
    }
    .login-content {
      justify-content: center;

      .login-form {
        width: 290px;

        .avatar {
          width: 280px;
          height: 80px;
        }
      }
    }
  }
}
</style>