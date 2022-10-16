<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!-- <svg-icon icon-class="eye-open" /> -->
    <!-- <UploadExcel :before-upload="beforeUpload" :on-success="handleSuccess" /> -->
    <UploadImg @on-success="onSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/UploadImg'
export default {
  name: 'Dashboard',
  components: {
    UploadImg
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log('111', data) // 上传成功才能打印出data,具体Excel的内容(表头和数据)
    },
    beforeUpload(file) { // 上传文件
      console.log('222', file)
      if (file.size > 10240) { // 单位是B
        this.$message.error('文件过大')
        return false
      }
      return true
    },
    onSuccess(val) {
      console.log('123', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
