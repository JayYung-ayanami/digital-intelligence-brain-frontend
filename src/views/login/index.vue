<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 模式切换：是否为注册模式
const isRegister = ref(false)

// 获取表单组件的实例引用
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 绑定的表单数据
const loginForm = reactive({
  username: '',
  password: '',
})

// 快速填充测试账号（方便测试使用）
const fillAdminAccount = () => {
  loginForm.username = 'admin'
  loginForm.password = '123456'
  isRegister.value = false
}

// 表单必填校验规则
const loginRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// 提交表单（登录或注册）
const handleSubmit = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        if (isRegister.value) {
          // 走注册逻辑
          await userStore.register(loginForm)
          ElMessage.success('注册成功，已自动登录！')
        } else {
          // 走登录逻辑
          await userStore.login(loginForm)
          ElMessage.success('登录成功！')
        }
        router.push('/')
      } catch (error) {
        console.error(isRegister.value ? '注册失败' : '登录失败', error)
      } finally {
        loading.value = false
      }
    }
  })
}

// 切换注册/登录模式
const toggleMode = () => {
  isRegister.value = !isRegister.value
  // 切换模式时清空表单内容和校验报错
  loginForm.username = ''
  loginForm.password = ''
  loginFormRef.value?.clearValidate()
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="login-header">
          <h2>{{ isRegister ? '数智大脑 - 账号注册' : '数智大脑 - 账号登录' }}</h2>
        </div>
      </template>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0"
        size="large"
      >
        <!-- 账号输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            prefix-icon="User"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleSubmit"
          />
        </el-form-item>

        <!-- 一键填充测试账号区 -->
        <div class="form-actions">
          <el-link type="primary" :underline="false" @click="fillAdminAccount">
            一键填充管理员测试账号
          </el-link>
          <el-link type="primary" :underline="false" @click="toggleMode">
            {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
          </el-link>
        </div>

        <!-- 提交按钮 -->
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleSubmit">
            {{ isRegister ? '注 册' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2b2f3a;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaXkV.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.login-card {
  width: 400px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
}

.login-header h2 {
  text-align: center;
  margin: 0;
  color: #333;
  font-size: 24px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  font-size: 16px;
  letter-spacing: 2px;
}
</style>
