export default {
  data() {
    return {
      rolesList: [],
      // 权限分配对话框
      setRightDialogVisible: false,
      // 树形节点数据
      rightTree: [],
      // 树形节点属性 挂载 子节点字段 和label显示的名称
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的树形节点
      defaultCheckedKeys: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('查询角色列表失败')
      this.rolesList = res.data
      console.log(res.data)
    },
    // 根据角色Id和权限Id，删除角色下指定的权限
    async removeRight(role, rightId) {
      // 提示用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 取消删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      // 删除权限
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败！')
      this.$message.success('删除权限成功！')
      // 重新刷新角色列表，但是不要这么调用，因为 体验差，会把整个表格的数据都重新请求一遍
      // this.getRolesList()

      // res.data // 当前角色下，所有的最新的权限
      // 我们只需要，把 当前角色的 children 属性，重新赋值为 res.data 即可
      role.children = res.data
    },
    async showSetRightDialog(role) {
      // 保存id为了后面使用
      this.selectedRoleId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取树形节点数据失败')
      this.rightTree = res.data
      // 调用递归，获取所有三级节点的id
      const keys = []
      this.getLeafIds(role, keys)
      // console.log(keys)
      this.defaultCheckedKeys = keys
      this.setRightDialogVisible = !this.setRightDialogVisibleF
    },
    // 根据指定的节点和keys数组，递归获取所有三级子节点的id
    getLeafIds(node, keys) {
      if (!node.children) {
        keys.push(node.id)
      } else {
        node.children.forEach(item => this.getLeafIds(item, keys))
      }
    },
    // 取消对话框按钮
    canlePanel() {
      this.selectedRoleId = ''
      this.defaultCheckedKeys = []
      this.setRightDialogVisible = false
    },
    // 保存树形节点数据
    async saveRight() {
      const arr1 = this.$refs.tree.getHalfCheckedKeys()
      const arr2 = this.$refs.tree.getCheckedKeys()
      console.log(arr1)
      console.log(arr2)
      const arrAll = [...arr1, ...arr2].join(',')
      const { data: res } = await this.$http.post(`roles/${this.selectedRoleId}/rights`, {
        rids: arrAll
      })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.setRightDialogVisible = false
      this.getRolesList()
    },
    // 当节点被点击时回调
    handleNodeClick(data) {
      console.log('****************')
      console.log(data)
    }
  }
}
