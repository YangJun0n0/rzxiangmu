<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">

            <!-- 放置表单 -->
            <el-form
              ref="from"
              :model="accountinfo"
              :rules="accountinfoRules"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountinfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountinfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updataEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third">

            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import JobInfo from './job-info'
import UserInfo from './user-info'
import Cookies from 'js-cookie'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      // s
      accountinfo: {},
      accountinfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 38, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountinfo = res
    },
    async updataEmployees() {
      try {
        await this.$refs.from.validate()
        await saveUserDetailById(this.accountinfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      // console.log(this.activeName)
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
