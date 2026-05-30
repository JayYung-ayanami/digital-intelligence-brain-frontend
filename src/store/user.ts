import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  login as loginApi,
  register as registerApi,
  getUserInfo as getUserInfoApi,
} from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<Record<string, unknown> | null>(null)

  // 动作：登录操作
  const login = async (loginForm: Record<string, unknown>) => {
    const res = (await loginApi(loginForm)) as unknown as Record<string, unknown>
    token.value = res.token as string
    // 将 token 持久化到本地，防止刷新掉线
    localStorage.setItem('token', res.token as string)
    return res
  }

  // 动作：注册操作
  const register = async (registerForm: Record<string, unknown>) => {
    const res = (await registerApi(registerForm)) as unknown as Record<string, unknown>
    token.value = res.token as string
    localStorage.setItem('token', res.token as string)
    return res
  }

  // 动作：获取当前用户信息
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res as unknown as Record<string, unknown>
    return res
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    login,
    register,
    getUserInfo,
    logout,
  }
})
