<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="layout-aside">
      <div class="logo">数智大脑</div>
      <!-- 后续添加动态菜单 el-menu -->
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <!-- 顶部导航栏 / 个人中心等 -->
        <span>顶部导航区</span>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  background-color: #304156;
  color: white;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
}
.layout-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
}
.layout-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
