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
      <!-- 添加分类的按钮 -->
      <el-button type="primary" @click="showDialog">添加分类</el-button>
      <tree-table class="tree-table" border :data="cateList" :columns="columns" show-index index-text="#" :selection-type="false" :expand-type="false">
        <template slot="valid" slot-scope="scope">
          <i v-if="!scope.row.cat_deleted" class='el-icon-success' style="color:green"></i>
          <i v-else class='el-icon-error' style="color:red"></i>
        </template>
        <template slot="level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1" type="success" size="mini">二级</el-tag>
          <el-tag v-else type="warning" size="mini">三级</el-tag>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="addForm" :rules="addRules" :model="addForm" label-width="80px">
        <el-form-item label="分类名称" prop="categorName">
          <el-input v-model="addForm.categorName"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader :change-on-select="true" clearable expand-trigger="hover" :props="cateConfig" :options="cateOptions" v-model="selectedCateId" @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mix from './cate-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.tree-table {
  margin-top: 15px;
}
</style>


