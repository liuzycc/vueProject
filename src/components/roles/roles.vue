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
      <el-button type="primary">添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="rolesList">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 注意 scope.row是角色的数据对象 -->
            <!-- 注意 scope.row.children 是当前角色下的所有权限 -->
            <el-row class="centerRow" v-for="(item1, i1) in scope.row.children" :key="item1.id" :style="{'border-bottom':'1px solid #eee','border-top': i1 === 0 ?'1px solid #eee':''}">
              <el-col :span="5">
                <el-tag @close="removeRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 还剩余 19 列 供 二三级权限评分 -->
              <el-col :span="19">
                <el-row class="centerRow" v-for="(item2, i2) in item1.children" :key="item2.id" :style="{'border-top:' : i2 === 0? '':'1px solid #eee'}">
                  <!-- 二级 -->
                  <el-col :span="6">
                    <el-tag type="success" @close="removeRight(scope.row, item2.id)" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag type="warning" @close="removeRight(scope.row, item3.id)" closable v-for="item3 in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="310px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini">删除</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 权限分配对话框 -->
    <el-dialog title="提示" :visible.sync="setRightDialogVisible" width="30%">
      <el-tree ref="tree" :data="rightTree" :props="defaultProps" node-key="id" :default-checked-keys="defaultCheckedKeys" default-expand-all show-checkbox @node-click="handleNodeClick"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canlePanel">取 消</el-button>
        <el-button type="primary" @click="saveRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mix from './roles-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 10px 5px;
}
.centerRow {
  display: flex;
  align-items: center;
}
</style>


