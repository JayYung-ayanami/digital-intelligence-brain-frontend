// --- 真实后端接入时，请解开下方的 import ---
// import request from '@/utils/request'

// 1. 登录接口
export function login(data: Record<string, unknown>) {
  // --- 真实后端接入时，请使用以下代码 ---
  // return request({
  //   url: '/auth/login',
  //   method: 'post',
  //   data,
  // })

  // --- 当前 MVP 前端无后端模拟阶段 ---
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟账号密码校验
      if (
        (data.username === 'admin' && data.password === '123456') ||
        (data.username === 'test' && data.password === '123456') ||
        data.isRegister // 如果是走注册通道，直接放行
      ) {
        resolve({ token: `mock-token-${data.username}-123456` })
      } else {
        reject(new Error('账号或密码错误！（测试账号: admin 密码: 123456）'))
      }
    }, 500)
  })
}

// 1.5 注册接口（模拟）
export function register(data: Record<string, unknown>) {
  // --- 真实后端接入时 ---
  // return request({ url: '/auth/register', method: 'post', data })

  // --- 模拟阶段：复用登录逻辑，打个注册标记 ---
  return login({ ...data, isRegister: true })
}

// 2. 获取用户信息
export function getUserInfo() {
  // return request({
  //   url: '/auth/userInfo',
  //   method: 'get',
  // })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: '系统管理员', role: 'admin' })
    }, 500)
  })
}

// 3. 退出登录
export function logout() {
  // return request({
  //   url: '/auth/logout',
  //   method: 'post',
  // })
  return Promise.resolve()
}
