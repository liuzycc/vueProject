export default {
  data() {
    return {
      // 查询对象
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 所有分类数据
      cateList: [],
      // 总数据条数
      total: 0,
      // 树形表格中的属性
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'valid'
        },
        {
          label: '排序',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate'
        }
      ],
      dialogVisible: false,
      // 对话框对象
      addForm: {
        categorName: '',
        parentCategor: []
      },
      addRules: {
        categorName: { required: true, message: '请输入分类名称', trigger: 'blur' }
      },
      cateOptions: [],
      // 级联选择器配置项
      cateConfig: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateId: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 根据分页，获取分类列表数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.cateList = res.data.result
      this.total = res.data.total
      console.log(this.cateList)
    },
    showDialog() {
      this.dialogVisible = !this.dialogVisible
      this.getCascaderList()
    },
    // 加载级联数据
    async getCascaderList() {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) return this.$message.error('请求级联数据失败')
      this.cateOptions = res.data
      console.log(this.cateOptions)
    },
    handleChange(value) {
      if (value.length === 0) {
        this.selectedCateId.length = 0
      }
    },
    // 添加分类
    addCategory() {
      // 先表单验证
      this.$refs.addForm.validate(async val => {
        if (!val) return
        let level = 0
        let parentId = 0
        if (this.selectedCateId.length === 1) {
          level = 1
        }
        if (this.selectedCateId.length === 2) {
          level = 2
        }
        if (this.selectedCateId.length > 0) {
          parentId = this.selectedCateId[0]
        }
        const { data: res } = await this.$http.post('categories', {
          cat_pid: parentId,
          cat_name: this.addForm.categorName,
          cat_level: level
        })
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        this.getCateList()
        this.dialogVisible = false
      })
    }
  }
}
