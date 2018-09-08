<template>
  <div>
    <!-- 面包血 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 列表 -->
      <el-table :data="rightsList" border height="450">
        <!-- 索隐裂 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0" size="small">一级权限</el-tag>
            <el-tag v-else-if="scope.row.level == 1" type="success" size="small">二级权限</el-tag>
            <el-tag v-else type="info" size="small">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import mix from './rights-mixins.js'
export default {
  mixins: [mix]
}
</script>

