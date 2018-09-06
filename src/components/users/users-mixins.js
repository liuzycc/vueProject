export default {
  data() {
    // 自定义验证邮箱规则
    const checkEmail = (rule, value, callback) => {
      if (
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
      ) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    return {
      // 查询参数对象
      queryInfo: {
        query: '', // 默认没有搜索条件
        pagenum: 1, // 默认查询第一页数据
        pagesize: 2 // 默认每页两条数据
      },
      total: 0, // 总条数
      userList: [], // 用户数据列表

      // 控制添加对话框的显示和隐藏
      addDiglogVieible: false,
      // 控制编辑对话框显示和隐藏
      editDialogVisible: false,
      // 添加表单的数据对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {},
      // 表单验证规则对象
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      },
      editRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 根据查询条件和分页，获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('查询用户列表失败')
      console.log(res.data)
      this.total = res.data.total
      this.userList = res.data.users
    },
    async stateChange(id, newState) {
      const { data: res } = await this.$http.put(`users/${id}/state/${newState}`)
      if (res.meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改成功')
    },
    // 每当pageSize发生变化 都会触发这个函数
    handleSizeChange(newSize) {
      console.log('最新的pageSize是 ' + newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 每当页码值发生变化都会触发这个函数
    handleCurrentChange(newPage) {
      console.log('最新的页码值 ' + newPage)
      // 把最新的页码值，保存到 查询对象中
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 关闭重置对话框
    resetaddForm() {
      this.$refs.addFormRef.resetFields()
      this.addDiglogVieible = false
    },
    // 添加新用户
    addUser() {
      // 1.表单校验
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.addDiglogVieible = false
        this.getUserList()
      })
    },
    // 显示或隐藏编辑对话框
    async openEdit(id) {
      // 控制显示或隐藏
      this.editDialogVisible = !this.editDialogVisible
      // 获取当前用户数据
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) return this.$message.error('查询当前用户数据信息失败')
      console.log(res.data)
      this.editForm = res.data
      // this.editForm.role_id = res.data.role_id
      // this.editForm.username = res.data.username
      // this.editForm.email = res.data.email
      // this.editForm.mobile = res.data.mobile
    },
    // 取消编辑对话框
    canleEdit() {
      this.editDialogVisible = false
      this.$refs.editRuleForm.resetFields()
    },
    // 提交edit
    editSubmit() {
      // 1.校验
      this.$refs.editRuleForm.validate(async valid => {
        if (!valid) return
        // 下面开始提交数据
        const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('编辑用户信息失败')
        this.$message.success('编辑用户成功')
        // 清空数据源
        this.editForm = {}
        // 重置表单
        this.getUserList()
        this.editDialogVisible = false

      })
    }
  }
}
