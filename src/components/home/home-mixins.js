export default {
  data() {
    return {
      menus: [],
      // 字体图标
      iconlist: [],
      collapse: true
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    // 退出登录状态
    logOut() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenus() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$mesage.error('获取左侧菜单失败')
      console.log(res)
      this.menus = res.data
    }
  }
}
