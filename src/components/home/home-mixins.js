export default {
  data() {
    return {
      menus: [],
      // 字体图标
      iconlist: [],
      collapse: false,
      itemPath: ''
    }
  },
  created() {
    this.getMenus()
    // 这里是为了刷新页面高亮点击的列表项
    this.itemPath = window.sessionStorage.getItem('path')
  },
  methods: {
    // 退出登录状态
    logOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$mesage.error('获取左侧菜单失败')
      console.log(res)
      this.menus = res.data
    },
    savePath(path) {
      window.sessionStorage.setItem('path', path)
    }
  }
}
