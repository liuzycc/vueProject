<template>
  <el-container class='home-container'>
    <!-- 头部区域 -->
    <el-header>
      <div class="left">
        <img src="../../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="collapse ? '65px' : '200px'">
        <!-- 切换菜单的折叠和展开 -->
        <div class="toggleBar" @click="collapse = !collapse">|||</div>
        <!-- 菜单 -->
        <el-menu default-active="2" router :collapse-transition="false" :collapse="collapse" unique-opened background-color="#333744" text-color="#fff" active-text-color="#409EFF">
          <!-- el-submenu  是一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menus" :key="item.id" :style="collapse ? 'width:65px' : 'width:200px'">
            <!-- 这个template 是一级菜单的内容模板 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 这是二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import mix from './home-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
// 最外层包裹的元素
.home-container {
  height: 100%;

  // 头部区域
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    
    .left {
      color: #fff;
      font-size: 22px;
    }
  }

  // 左侧侧边栏
  .el-aside {
    background-color: #333744;
    user-select: none;
  }

  // 右侧主体区域
  .el-main {
    background-color: #fff;
  }
}
.toggleBar {
  line-height: 25px;
  color: white;
  background-color: #4a5064;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
}
</style>


