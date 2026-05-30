<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// 处理右上角下拉菜单的点击事件
const handleCommand = (command: string) => {
  if (command === 'logout') {
    console.log('执行清除Token的逻辑，并跳转登录页')
    // localStorage.removeItem('token')
    // router.push('/login')
  } else if (command === 'profile') {
    console.log('跳转到个人中心页')
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width="220px" class="layout-aside">
      <div class="logo">
        <span class="logo-text">数智大脑</span>
      </div>

      <!-- 动态菜单区：配合 router 使用 -->
      <!-- default-active 根据当前路由自动高亮对应的菜单 -->
      <el-menu
        :default-active="route.path"
        class="aside-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataLine /></el-icon>
          <span>销售看板</span>
        </el-menu-item>

        <el-menu-item index="/customer">
          <el-icon><User /></el-icon>
          <span>客户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区 -->
    <el-container>
      <!-- 顶部 Header -->
      <el-header class="layout-header">
        <div class="header-left">
          <!-- 面包屑或者标题占位 -->
          <span class="page-title">{{ route.meta.title || '数智大脑管理系统' }}</span>
        </div>
        <div class="header-right">
          <!-- 用户下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              <el-avatar
                :size="32"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <span class="username">管理员</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 核心的主视图区 (所有的页面都会渲染在这里) -->
      <el-main class="layout-main">
        <div class="main-content-box">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
}

.layout-aside {
  background-color: #304156;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2f3a;
}

.logo-text {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.aside-menu {
  flex: 1;
  border-right: none; /* 去除 Element Plus 菜单自带的右边框 */
}

.layout-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.page-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.layout-main {
  background-color: #f0f2f5;
  padding: 20px;
}

/* 给里面的子路由组件加一个白色的底色板 */
.main-content-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  min-height: calc(100vh - 100px);
}
</style>
