<template>
  <div v-loading="loading" class="departments-container">
    <!-- 头部 -->
    <el-card class="tree-card">
      <!-- <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
        <el-col>
          <span>江苏传智播客教育科技股份有限公司</span> // 抽成一个组件
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-col>负责人</el-col>
            <el-col>
              <el-dropdown>
                <span>
                  操作<i class="el-icon-arrow-down" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row> -->
      <tree-tools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>

    <!-- 树形结构-->
    <!-- 使用 scoped slot 会传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools
        slot-scope="{ data }"
        :tree-node="data"
        @addDept="handleAddDept"
        @editDept="handleEditDept"
        @refreshDepts="Departments"
      />
    </el-tree>

    <!-- 子组件: 把 dialogVisible传给子组件,关闭弹窗-->
    <!-- 父亲接收到子 tree-tools组件传过来的treeNode,传给另一个儿子add-dept组件 -->
    <add-dept
      ref="addDept"
      :dialog-visible.sync="dialogVisible"
      :tree-node="currentNode"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { treeData } from '@/utils'
export default {
  name: 'Departments',
  components: { TreeTools, AddDept },
  data() {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name' // 树形结构每个节点必须是label才有效果,但可以改 重命名
      },
      dialogVisible: false, // 关闭弹窗,默认关闭
      currentNode: {}, // 当前节点的所有数据
      loading: false
    }
  },
  created() {
    this.Departments() // 调用自身的方法
  },
  methods: {
    async Departments() {
      try {
        this.loading = true
        const { depts, companyName, companyManage } = await getDepartments()
        // console.log(depts)
        this.departs = treeData(depts, '') // treeData为封装的函数,在utils-index.js

        this.company = { name: companyName, manager: companyManage, id: '' } // 不要写死,结构出来
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleAddDept(node) { // 新增部门
      this.dialogVisible = true // 点击树形结构的操作结构,显示弹窗

      this.currentNode = node // 父亲接收子 tree-tools组件传过来的treeNode,用形参node接收
    },
    handleEditDept(treeNode) { // 点击编辑部门, 弹窗显示, 回显数据
      console.log('当前节点数据', treeNode) // tree-tools组件传过来的节点数据
      this.dialogVisible = true
      this.currentNode = { ...treeNode } // node里面就有当前节点的所有数据,如果修改过,同步
      this.$refs.addDept.formData = { ...treeNode } // 数据回显, node赋值给addDept组件的formData
    }
  }
}
</script>

<style lang="scss" >
.departments-container {
  width: 900px;
  margin: 20px auto;
   .el-card__body{
      padding-right: 0px;
    }
}
</style>
