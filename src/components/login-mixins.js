export default {
  data() {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 验证规则对象
      loginFormRules: {
        username: { required: true, message: '请输入用户名称', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  methods: {
    // 点击重置按钮，重置表单
    resetForm() {
      console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // 1.进行表单验证
      this.$refs.loginFormRef.validate(async valid => {
        // 如果验证失败，直接退出后续代码的执行
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 把登录成功的 token 保存到sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        // 使用编程式导航  跳转
        this.$router.push('/home')
      })
    }
  }
}
